let leafletPromise: Promise<void> | null = null

export default function getScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Leaflet requires a browser'))
  }

  if ((window as any).L) {
    return Promise.resolve()
  }

  if (leafletPromise) {
    return leafletPromise
  }

  leafletPromise = new Promise((resolve, reject) => {
    let script = document.getElementById('leafletScript') as HTMLScriptElement | null

    if (!script) {
      script = document.createElement('script')
      script.id = 'leafletScript'
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.async = true
      document.head.appendChild(script)
    }

    script.addEventListener('load', () => resolve(), {
      once: true,
    })

    script.addEventListener(
      'error',
      () => {
        leafletPromise = null
        reject(new Error('Failed to load Leaflet'))
      },
      { once: true },
    )
  })

  return leafletPromise
}
