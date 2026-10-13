import type { ServiceVisual as ServiceVisualKind } from '../../data/services'

/* ==================================================================
   Distinct technical illustrations — one composition per service.
   Pure SVG linework, no stock imagery, scoped to `.svc-vis`.
   ================================================================== */

function Web() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      <rect className="svc-vis__fill" x="34" y="40" width="252" height="160" rx="3" />
      <rect className="svc-vis__stroke" x="34" y="40" width="252" height="160" rx="3" />
      <line className="svc-vis__dim" x1="34" y1="66" x2="286" y2="66" />
      <circle className="svc-vis__dot" cx="50" cy="53" r="3" />
      <circle className="svc-vis__dot" cx="62" cy="53" r="3" />
      <circle className="svc-vis__dot" cx="74" cy="53" r="3" />
      <rect className="svc-vis__stroke" x="50" y="82" width="130" height="46" rx="2" />
      <rect className="svc-vis__dim" x="50" y="140" width="60" height="46" rx="2" />
      <rect className="svc-vis__dim" x="120" y="140" width="60" height="46" rx="2" />
      <rect className="svc-vis__accent-fill" x="196" y="82" width="74" height="18" rx="2" />
      <rect className="svc-vis__dim" x="196" y="112" width="74" height="74" rx="2" />
      <line className="svc-vis__accent" x1="208" y1="152" x2="258" y2="152" />
    </svg>
  )
}

function Commerce() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      <rect className="svc-vis__stroke" x="28" y="48" width="86" height="144" rx="2" />
      <rect className="svc-vis__dim" x="40" y="62" width="62" height="52" rx="2" />
      <line className="svc-vis__dim" x1="40" y1="128" x2="102" y2="128" />
      <line className="svc-vis__dim" x1="40" y1="144" x2="88" y2="144" />
      <rect className="svc-vis__accent-fill" x="40" y="162" width="34" height="10" rx="2" />
      <rect className="svc-vis__stroke" x="128" y="48" width="62" height="144" rx="2" />
      <line className="svc-vis__dim" x1="128" y1="82" x2="190" y2="82" />
      <line className="svc-vis__dim" x1="128" y1="122" x2="190" y2="122" />
      <line className="svc-vis__dim" x1="128" y1="160" x2="190" y2="160" />
      <rect className="svc-vis__accent" x="140" y="70" width="38" height="10" rx="2" />
      <rect className="svc-vis__stroke" x="204" y="48" width="88" height="144" rx="2" />
      <rect className="svc-vis__dim" x="216" y="66" width="64" height="14" rx="2" />
      <rect className="svc-vis__dim" x="216" y="90" width="64" height="14" rx="2" />
      <rect className="svc-vis__accent-fill" x="216" y="118" width="64" height="22" rx="2" />
      <circle className="svc-vis__dot svc-vis__dot--accent" cx="248" cy="166" r="4" />
      <line className="svc-vis__dim" x1="114" y1="120" x2="128" y2="120" />
      <line className="svc-vis__dim" x1="190" y1="120" x2="204" y2="120" />
    </svg>
  )
}

function Software() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      <rect className="svc-vis__stroke" x="30" y="40" width="260" height="160" rx="3" />
      <rect className="svc-vis__dim" x="30" y="40" width="70" height="160" rx="3" />
      <line className="svc-vis__dim" x1="100" y1="40" x2="100" y2="200" />
      <line className="svc-vis__dim" x1="44" y1="64" x2="86" y2="64" />
      <line className="svc-vis__accent" x1="44" y1="86" x2="86" y2="86" />
      <line className="svc-vis__dim" x1="44" y1="108" x2="86" y2="108" />
      <rect className="svc-vis__dim" x="116" y="58" width="52" height="34" rx="2" />
      <rect className="svc-vis__accent-fill" x="178" y="58" width="52" height="34" rx="2" />
      <rect className="svc-vis__dim" x="240" y="58" width="40" height="34" rx="2" />
      <rect className="svc-vis__stroke" x="116" y="104" width="60" height="76" rx="2" />
      <rect className="svc-vis__dim" x="186" y="104" width="94" height="76" rx="2" />
      <polyline
        className="svc-vis__accent"
        points="196,164 214,140 232,150 250,120 268,128"
        fill="none"
      />
      <line className="svc-vis__dim" x1="116" y1="164" x2="176" y2="164" />
    </svg>
  )
}

function Backend() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            className={i === 1 ? 'svc-vis__accent-fill' : 'svc-vis__dim'}
            x="72"
            y={52 + i * 42}
            width="176"
            height="30"
            rx="2"
          />
          <circle
            className={i === 1 ? 'svc-vis__dot svc-vis__dot--accent' : 'svc-vis__dot'}
            cx="90"
            cy={67 + i * 42}
            r="4"
          />
        </g>
      ))}
      <line className="svc-vis__dim" x1="160" y1="82" x2="160" y2="94" />
      <line className="svc-vis__dim" x1="160" y1="124" x2="160" y2="136" />
      <line className="svc-vis__dim" x1="160" y1="166" x2="160" y2="178" />
    </svg>
  )
}

function UiUx() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      <rect className="svc-vis__stroke" x="40" y="44" width="150" height="104" rx="3" />
      <line className="svc-vis__dim" x1="40" y1="66" x2="190" y2="66" />
      <circle className="svc-vis__dot" cx="54" cy="55" r="3" />
      <rect className="svc-vis__dim" x="56" y="80" width="118" height="10" rx="2" />
      <rect className="svc-vis__dim" x="56" y="98" width="86" height="10" rx="2" />
      <rect className="svc-vis__accent-fill" x="56" y="120" width="46" height="12" rx="2" />
      <rect className="svc-vis__stroke" x="146" y="112" width="134" height="88" rx="3" />
      <line className="svc-vis__dim" x1="146" y1="134" x2="280" y2="134" />
      <rect className="svc-vis__dim" x="162" y="148" width="102" height="8" rx="2" />
      <rect className="svc-vis__stroke" x="162" y="164" width="46" height="20" rx="2" />
      <rect className="svc-vis__accent" x="216" y="164" width="48" height="20" rx="2" />
      <circle className="svc-vis__dot svc-vis__dot--accent" cx="106" cy="126" r="4" />
      <path className="svc-vis__dim" d="M190 96 h14 a4 4 0 0 1 4 4 v20" fill="none" />
    </svg>
  )
}

function Cloud() {
  return (
    <svg className="svc-vis" viewBox="0 0 320 240" role="img" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            className={i === 2 ? 'svc-vis__accent' : 'svc-vis__stroke'}
            x={30 + i * 68}
            y="96"
            width="52"
            height="48"
            rx="3"
          />
          {i < 3 && <line className="svc-vis__dim" x1={82 + i * 68} y1="120" x2={98 + i * 68} y2="120" />}
        </g>
      ))}
      <path
        className="svc-vis__dim"
        d="M150 60 a18 18 0 0 1 34 -4 a14 14 0 0 1 24 8 a13 13 0 0 1 0 26 h-58 a15 15 0 0 1 0 -30 z"
        fill="none"
      />
      <circle className="svc-vis__dot svc-vis__dot--accent" cx="230" cy="76" r="4" />
      <line className="svc-vis__dim" x1="120" y1="180" x2="200" y2="180" />
      <circle className="svc-vis__dot" cx="120" cy="180" r="3.5" />
      <circle className="svc-vis__dot" cx="200" cy="180" r="3.5" />
    </svg>
  )
}

export default function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  switch (kind) {
    case 'web':
      return <Web />
    case 'commerce':
      return <Commerce />
    case 'software':
      return <Software />
    case 'backend':
      return <Backend />
    case 'uiux':
      return <UiUx />
    case 'cloud':
      return <Cloud />
    default:
      return <Web />
  }
}
