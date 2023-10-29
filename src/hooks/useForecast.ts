import { ChangeEvent, useEffect, useState } from "react"
import { optionType } from "../types"

const useForecast = () => {
    const [term, setTerm] = useState<string>('')
    const [options, setOptions] = useState<[]>([])
    const [city, setCity] = useState<optionType | null>(null)
    const [forecast, setForecast] = useState<null>(null)
    const getSearchTermOptions = (value: string) => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY
            }`
        )
            .then((res) => res.json())
            .then((data) => setOptions(data))
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setTerm(value)

        if (value === '') return
        getSearchTermOptions(value)
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option)
    }

    const getForecast = (city: optionType) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => setForecast(data))
    }
    const onSubmit = () => {
        if (!city) return

        getForecast(city)
    }
    useEffect(() => {
        if (city) {
            setTerm(city.name)
            setOptions([])
        }
    }, [city])

    return {
        term, options, forecast, onInputChange, onOptionSelect, onSubmit
    }
}

export default useForecast