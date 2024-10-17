export default function getScript() {
  var leafletScript = document.createElement('script')
  leafletScript.id = 'leafletScript'
  leafletScript.type = 'text/javascript'
  leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
  leafletScript.crossOrigin = ''
  leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  return leafletScript
}
