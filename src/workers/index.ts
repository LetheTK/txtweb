import splitHandler from './split';
import mergeHandler from './merge';
import dedupHandler from './dedup';

export interface Env {
  R2: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/api/split':
        return splitHandler(request, env);
      case '/api/merge':
        return mergeHandler(request, env);
      case '/api/dedup':
        return dedupHandler(request, env);
      default:
        return new Response('Not Found', { status: 404 });
    }
  }
}; 