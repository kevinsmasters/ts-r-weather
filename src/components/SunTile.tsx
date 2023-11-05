type childType = {
  innerHtml: JSX.Element
}

const SunTile = ({ innerHtml }: childType) => {
  return <div>{innerHtml} </div>
}

export default SunTile
