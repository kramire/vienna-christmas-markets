import { ResultType, StreetLights } from '../../App.types'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import data from '../../data.json'
import Content from './content'

export default function LightsPage() {
  const results = (data as Array<StreetLights>)
    .filter((result) => result.isActive && result.type === ResultType.STREET_LIGHTS)
    .sort(sortResultsByDistrict)

  return <Content results={results} />
}
