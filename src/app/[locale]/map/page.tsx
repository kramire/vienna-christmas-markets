import { StreetLights, Market, Event } from '../../App.types'
import data from '../../data.json'
import Content from './content'

export default function MapPage() {
  const results = (data as Array<Market | Event | StreetLights>).filter(({ isActive }) => isActive)

  return <Content results={results} />
}
