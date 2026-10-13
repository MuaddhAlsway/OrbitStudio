import type { ProcessVisual as ProcessVisualKind } from '../../data/process'

export default function ProcessVisual({ kind }: { kind: ProcessVisualKind }) {
  if (kind === 'discovery') {
    return (
      <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
        <circle className="prc-dg__dim" cx="180" cy="130" r="104" />
        <circle className="prc-dg__dim" cx="180" cy="130" r="72" />
        <circle className="prc-dg__stroke" cx="180" cy="130" r="40" />
        <line className="prc-dg__dim" x1="76" y1="130" x2="284" y2="130" />
        <line className="prc-dg__dim" x1="180" y1="26" x2="180" y2="234" />
        <line className="prc-dg__path" x1="180" y1="130" x2="266" y2="72" />
        <line className="prc-dg__accent" x1="180" y1="130" x2="120" y2="196" />
        <circle className="prc-dg__dot prc-dg__dot--accent" cx="180" cy="130" r="4.5" />
        <circle className="prc-dg__node" cx="266" cy="72" r="5" />
        <circle className="prc-dg__node" cx="120" cy="196" r="5" />
        <circle className="prc-dg__node" cx="132" cy="70" r="5" />
        <circle className="prc-dg__node" cx="262" cy="192" r="5" />
        <line className="prc-dg__dim" x1="132" y1="70" x2="180" y2="130" />
        <line className="prc-dg__dim" x1="262" y1="192" x2="180" y2="130" />
      </svg>
    )
  }

  if (kind === 'requirements') {
    return (
      <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
        <rect className="prc-dg__stroke" x="92" y="40" width="176" height="184" rx="3" />
        <line className="prc-dg__dim" x1="92" y1="72" x2="268" y2="72" />
        <line className="prc-dg__stroke" x1="112" y1="56" x2="152" y2="56" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              className={i < 2 ? 'prc-dg__accent-fill' : 'prc-dg__stroke'}
              x="112"
              y={94 + i * 32}
              width="16"
              height="16"
              rx="2"
            />
            <line
              className="prc-dg__dim"
              x1="142"
              y1={102 + i * 32}
              x2={i % 2 === 0 ? 240 : 216}
              y2={102 + i * 32}
            />
            {i < 2 && (
              <path
                className="prc-dg__accent"
                d={`M115 ${102 + i * 32} l4 4 l7 -8`}
                fill="none"
              />
            )}
          </g>
        ))}
      </svg>
    )
  }

  if (kind === 'architecture') {
    return (
      <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            className={i === 1 ? 'prc-dg__accent' : 'prc-dg__stroke'}
            x="96"
            y={44 + i * 46}
            width="168"
            height="34"
            rx="3"
          />
        ))}
        <line className="prc-dg__dim" x1="180" y1="78" x2="180" y2="90" />
        <line className="prc-dg__dim" x1="180" y1="124" x2="180" y2="136" />
        <line className="prc-dg__dim" x1="180" y1="170" x2="180" y2="182" />
        <line className="prc-dg__dim" x1="96" y1="61" x2="72" y2="61" />
        <line className="prc-dg__dim" x1="96" y1="107" x2="72" y2="107" />
        <line className="prc-dg__dim" x1="96" y1="199" x2="72" y2="199" />
        <circle className="prc-dg__dot prc-dg__dot--accent" cx="264" cy="107" r="4" />
        <line className="prc-dg__dim" x1="264" y1="107" x2="296" y2="107" />
      </svg>
    )
  }

  if (kind === 'development') {
    return (
      <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
        <rect className="prc-dg__stroke" x="64" y="42" width="232" height="150" rx="3" />
        <line className="prc-dg__dim" x1="64" y1="68" x2="296" y2="68" />
        <circle className="prc-dg__dot" cx="80" cy="55" r="3" />
        <circle className="prc-dg__dot" cx="92" cy="55" r="3" />
        <circle className="prc-dg__dot--accent" cx="104" cy="55" r="3" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line className="prc-dg__dim" x1="88" y1={88 + i * 20} x2="100" y2={88 + i * 20} />
            <line
              className={i === 1 ? 'prc-dg__accent' : 'prc-dg__dim'}
              x1="112"
              y1={88 + i * 20}
              x2={i === 1 ? 236 : i % 2 === 0 ? 208 : 176}
              y2={88 + i * 20}
            />
          </g>
        ))}
        <rect className="prc-dg__stroke" x="196" y="176" width="120" height="52" rx="3" />
        <line className="prc-dg__accent" x1="212" y1="194" x2="240" y2="194" />
        <line className="prc-dg__dim" x1="212" y1="208" x2="300" y2="208" />
        <line className="prc-dg__dim" x1="212" y1="216" x2="272" y2="216" />
      </svg>
    )
  }

  if (kind === 'testing') {
    const cells = Array.from({ length: 12 }, (_, i) => ({
      x: 104 + (i % 4) * 42,
      y: 70 + Math.floor(i / 4) * 42,
      ok: i === 1 || i === 6 || i === 9 || i === 11,
    }))
    return (
      <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
        <rect className="prc-dg__stroke" x="88" y="54" width="184" height="140" rx="3" />
        {cells.map((cell) => (
          <rect
            key={`${cell.x}-${cell.y}`}
            className={cell.ok ? 'prc-dg__accent-fill' : 'prc-dg__stroke'}
            x={cell.x}
            y={cell.y}
            width="26"
            height="26"
            rx="3"
          />
        ))}
        <line className="prc-dg__dim" x1="88" y1="214" x2="272" y2="214" />
        <line className="prc-dg__accent" x1="88" y1="214" x2="212" y2="214" />
        <circle className="prc-dg__dot prc-dg__dot--accent" cx="212" cy="214" r="4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
      <rect className="prc-dg__stroke" x="52" y="104" width="66" height="52" rx="3" />
      <line className="prc-dg__dim" x1="66" y1="122" x2="104" y2="122" />
      <line className="prc-dg__dim" x1="66" y1="138" x2="94" y2="138" />
      <line className="prc-dg__path" x1="118" y1="130" x2="146" y2="130" />
      <path className="prc-dg__path" d="M140 124 l6 6 l-6 6" fill="none" />
      <rect className="prc-dg__stroke" x="152" y="104" width="66" height="52" rx="3" />
      <line className="prc-dg__dim" x1="166" y1="122" x2="204" y2="122" />
      <line className="prc-dg__dim" x1="166" y1="138" x2="194" y2="138" />
      <line className="prc-dg__path" x1="218" y1="130" x2="246" y2="130" />
      <path className="prc-dg__path" d="M240 124 l6 6 l-6 6" fill="none" />
      <path
        className="prc-dg__accent"
        d="M292 150 a34 34 0 0 1 0 -40 a34 34 0 0 1 0 40 z"
        fill="none"
      />
      <path className="prc-dg__stroke" d="M262 146 a30 30 0 0 1 60 0 z" fill="none" />
      <circle className="prc-dg__dot prc-dg__dot--accent" cx="292" cy="122" r="4" />
      <line className="prc-dg__dim" x1="52" y1="180" x2="308" y2="180" />
    </svg>
  )
}
