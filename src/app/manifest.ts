import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vienna Christmas Markets',
    short_name: 'Vienna 🎄',
    description: "A list of this year's Christmas festivities in Vienna, Austria.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#092e0b',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
