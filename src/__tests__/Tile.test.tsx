import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Tile from '../components/Tile'
import Humidity from '../components/Icons/Humidity'

const testTile = (
  <Tile title="humidity" info="" icon="humidity" description="" />
)
test('it renders a title', () => {
  render(testTile)
  const titleHeading = screen.getByRole('heading', { level: 4 })
  expect(titleHeading).toBeInTheDocument()
  expect(titleHeading).toHaveTextContent('humidity')
})

test('it renders an icon', () => {
  render(testTile)
  const humidityIcon = screen.getByTestId('humidity')
  expect(humidityIcon).toBeInTheDocument()
})
