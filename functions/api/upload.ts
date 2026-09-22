interface Env {
  PHOTOS_BUCKET?: any; // Cloudflare R2Bucket binding
  R2_PUBLIC_DOMAIN?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;

  // Header CORS untuk kemudahan request
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'Tidak ada file gambar yang dikirim.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `photos/${timestamp}-${cleanName}`;

    // 1. Jika terikat ke Cloudflare R2 via Pages Binding
    if (env.PHOTOS_BUCKET) {
      await env.PHOTOS_BUCKET.put(filename, file.stream(), {
        httpMetadata: {
          contentType: file.type || 'image/webp',
          cacheControl: 'public, max-age=31536000, immutable',
        },
      });

      const publicDomain = env.R2_PUBLIC_DOMAIN || 'https://photos.byhuseinrosid.my.id';
      const fileUrl = `${publicDomain.replace(/\/$/, '')}/${filename}`;

      return new Response(
        JSON.stringify({
          success: true,
          url: fileUrl,
          filename,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Jika R2 belum dibind (misal saat preview lokal)
    return new Response(
      JSON.stringify({
        warning: 'PHOTOS_BUCKET belum di-bind di dashboard Cloudflare Pages. File disimpan secara simulasi.',
        filename,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Terjadi kesalahan saat upload ke Cloudflare R2' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
