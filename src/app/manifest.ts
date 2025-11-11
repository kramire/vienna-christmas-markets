import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vienna Christmas Markets',
    short_name: 'ViennaChristmas',
    description: "A list of this year's Christmas festivities in Vienna, Austria.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#092e0b',
    icons: [
      {
        src: '/mistletoe.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
