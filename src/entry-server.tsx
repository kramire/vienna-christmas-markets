import { render as renderToString } from 'preact-render-to-string';
import { App } from './app';

export function render() {
  const html = renderToString(<App />);
  return `<!DOCTYPE html><html><body>${html}</body></html>`;
}
