export default function loadStyles() {
  var leafletCSS = document.createElement('link')
  leafletCSS.rel = 'stylesheet'
  leafletCSS.type = 'text/css'
  leafletCSS.media = 'screen'
  leafletCSS.integrity = '"sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="'
  leafletCSS.crossOrigin = ''
  leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.getElementsByTagName('head')[0].appendChild(leafletCSS)
}
