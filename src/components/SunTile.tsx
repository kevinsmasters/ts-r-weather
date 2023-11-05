type childType = {
  children: JSX.Element
}

const SunTile = ({ children }: childType) => {
  return (
    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/70 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
      {children}{' '}
    </div>
  )
}

export default SunTile
