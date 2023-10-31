import { forecastType } from '../types'

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
        </section>
      </div>
    </div>
  )
}

export default Forecast
