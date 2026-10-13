const BACK_WAVE =
  'M0,64 C120,20 240,20 360,60 C480,100 600,100 720,60 C840,20 960,20 1080,60 C1200,100 1320,100 1440,60 L1440,90 L0,90 Z'

const FRONT_WAVE =
  'M0,66 C140,34 240,84 360,64 C500,40 600,86 720,64 C860,36 980,96 1090,66 C1220,32 1330,64 1440,52 L1440,90 L0,90 Z'

export default function WaterBackground() {
  return (
    <div className="cl-water cl-rise">
      <div className="cl-water__depth" />
      <svg
        className="cl-water__crest"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path className="cl-water__wave cl-water__wave--back" d={BACK_WAVE} />
        <path className="cl-water__wave cl-water__wave--front" d={FRONT_WAVE} />
      </svg>
    </div>
  )
}
