import { render as renderToString } from 'preact-render-to-string';
import { App } from './app';

export function render(context?: any) {
  const html = renderToString(<App />, context);
  return `<!DOCTYPE html><html><body>${html}</body></html>`;
}
