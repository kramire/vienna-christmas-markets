import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  let vite;

  if (isTest) {
    vite = await (
      await import('vite')
    ).createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      logLevel: isTest ? 'error' : 'info',
    });

    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(express.static('dist/client'));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      const pathToHtml = isTest ? 'index.html' : 'dist/client/index.html';
      let template = fs.readFileSync(
        path.resolve(__dirname, pathToHtml),
        'utf-8'
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { renderTest } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const { renderProd } = await import('./dist/server/entry-server.js');
      const render = isTest ? renderTest : renderProd;

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const context = {};
      // we only have one route, so we don't need other urls for now
      const appHtml = await render(context);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      if (isTest) {
        vite.ssrFixStacktrace(e);
        next(e);
      } else {
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173');
    })
  );
}
