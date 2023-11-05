import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../types'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import SunTile from './SunTile'
import Tile from './Tile'

type Props = {
  data: forecastType
}
const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}&deg;</span>
)
const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0]
  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin"> {data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p>
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>
        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              key={i}
              className="inline-block text-center w-[50px] flex-shrink-0"
            >
              <p className="text-small">
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
                <img
                  alt={`weather-icon-${item.weather[0].description}`}
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
              </p>
              <p className="text-small font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between text-zinc-700">
          <SunTile>
            <>
              <Sunrise />{' '}
              <span className="mt-2">{getSunTime(data.sunrise)}</span>
            </>
          </SunTile>
          <SunTile>
            <>
              <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
            </>
          </SunTile>
          {/* wind */}
          <Tile
            icon="wind"
            title="wind"
            info={`${Math.round(today.wind.speed)} mph`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} mph`}
          />
          {/* feels like */}
          <Tile
            title="feels like"
            icon="feels"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
          {/* humidity */}
          <Tile
            icon="humidity"
            title="humidity"
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          {/* pop */}
          <Tile
            icon="pop"
            title="precipitation"
            info={`${Math.round(today.pop * 1000)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          {/* pressure */}
          <Tile
            icon="pressure"
            title="pressure"
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          {/* visibility */}
          <Tile
            icon="visibility"
            title="visibility"
            info={`${(today.visibility / 1000).toFixed()} miles`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  )
}

export default Forecast
