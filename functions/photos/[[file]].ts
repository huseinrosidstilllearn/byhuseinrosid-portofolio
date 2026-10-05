interface Env {
  PHOTOS_BUCKET?: any;
}

export async function onRequest(context: {
  request: Request;
  params: { file: string | string[] };
  env: Env;
}) {
  const { request, env, params } = context;

  // Handle CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!env.PHOTOS_BUCKET) {
    return new Response('PHOTOS_BUCKET binding is missing in Cloudflare Pages.', { status: 500 });
  }

  const rawFile = Array.isArray(params.file) ? params.file.join('/') : params.file;
  if (!rawFile) {
    return new Response('File name not provided', { status: 400 });
  }

  // Coba cari dengan key 'photos/...' dan juga tanpa prefix
  let object = await env.PHOTOS_BUCKET.get(`photos/${rawFile}`);
  if (!object) {
    object = await env.PHOTOS_BUCKET.get(rawFile);
  }

  if (!object) {
    return new Response('Photo not found in storage', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  if (!headers.get('content-type')) {
    headers.set('content-type', 'image/webp');
  }

  if (request.method === 'HEAD') {
    return new Response(null, { headers });
  }

  return new Response(object.body, { headers });
}
