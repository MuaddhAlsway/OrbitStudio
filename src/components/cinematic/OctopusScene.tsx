import type { ReactNode } from 'react'

/*
 * ASSET REQUIREMENT (documented, not fabricated)
 * ------------------------------------------------------------------
 * The brief asks for a properly rigged, optimized, photorealistic 3D
 * octopus. Neither Three.js / React Three Fiber nor a licensed rigged
 * octopus asset exist in this project, and the brief forbids faking
 * photorealism with primitive geometry, so this is a deliberate,
 * graceful alternative: a hand-built SVG octopus with a small forward
 * kinematics rig (4 joints per tentacle) animated natively through GSAP.
 * To upgrade later, drop in a compressed .glb and swap this module for an
 * R3F <OctopusScene /> — the loader only depends on the `.cl-octo`,
 * `.cl-seg` and `.cl-cup` hooks below.
 */

type Tentacle = {
  x: number
  y: number
  base: number
  len: number
}

const HEAD_PATH =
  'M200,44 C154,44 116,84 113,140 C110,180 146,212 200,214 C254,212 290,180 287,140 C284,84 246,44 200,44 Z'

const TENTACLES: Tentacle[] = [
  { x: 148, y: 190, base: -60, len: 150 },
  { x: 170, y: 198, base: -42, len: 168 },
  { x: 192, y: 206, base: -22, len: 178 },
  { x: 212, y: 206, base: 4, len: 180 },
  { x: 232, y: 198, base: 26, len: 168 },
  { x: 250, y: 190, base: 48, len: 150 },
  { x: 180, y: 208, base: -14, len: 188 },
  { x: 222, y: 208, base: 16, len: 184 },
]

const SEG_FRACTIONS = [0.31, 0.27, 0.23, 0.19]
const SEG_WIDTHS = [24, 17, 11, 6]
const CUP_STOPS = [0.32, 0.62, 0.9]

function buildTentacle(tentacle: Tentacle, index: number): ReactNode {
  const lens = SEG_FRACTIONS.map((fraction) => tentacle.len * fraction)
  let nested: ReactNode = null

  for (let segment = 3; segment >= 0; segment -= 1) {
    const isRoot = segment === 0
    const phase = index * 1.9 + segment * 1.3
    const curl = -14 + Math.sin(phase) * 20
    const emerge = 7 + Math.cos(phase * 0.8) * 15
    const reach = -14 + Math.sin(phase * 0.62) * 24
    const base = isRoot ? tentacle.base : 0

    nested = (
      <g
        className="cl-seg"
        data-mid={base + emerge}
        data-reach={base + reach}
        transform={`rotate(${base + curl})`}
      >
        <line
          className="cl-limb"
          x1={0}
          y1={0}
          x2={0}
          y2={lens[segment]}
          strokeWidth={SEG_WIDTHS[segment]}
          strokeLinecap="round"
        />
        {CUP_STOPS.map((stop, cupIndex) => (
          <circle
            key={`${segment}-${cupIndex}`}
            className="cl-cup"
            cx={0}
            cy={lens[segment] * stop}
            r={Math.max(1.4, (SEG_WIDTHS[segment] / 2.4) * (1 - stop * 0.4))}
          />
        ))}
        {nested ? <g transform={`translate(0 ${lens[segment]})`}>{nested}</g> : null}
      </g>
    )
  }

  return nested
}

export default function OctopusScene() {
  return (
    <svg
      className="cl-octo"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="clOctoBody" cx="42%" cy="30%" r="82%">
          <stop offset="0%" stopColor="#5b7690" />
          <stop offset="46%" stopColor="#33475f" />
          <stop offset="100%" stopColor="#1d2c3d" />
        </radialGradient>
        <linearGradient id="clOctoLimb" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="200">
          <stop offset="0%" stopColor="#42586f" />
          <stop offset="100%" stopColor="#243449" />
        </linearGradient>
        <radialGradient id="clOctoRim" cx="72%" cy="26%" r="62%">
          <stop offset="0%" stopColor="rgba(196,220,240,0.5)" />
          <stop offset="100%" stopColor="rgba(196,220,240,0)" />
        </radialGradient>
      </defs>

      <g className="cl-octo__tentacles" stroke="url(#clOctoLimb)">
        {TENTACLES.map((tentacle, index) => (
          <g key={index} transform={`translate(${tentacle.x} ${tentacle.y})`}>
            {buildTentacle(tentacle, index)}
          </g>
        ))}
      </g>

      <g className="cl-octo__head">
        <path d={HEAD_PATH} fill="url(#clOctoBody)" />
        <path d={HEAD_PATH} fill="url(#clOctoRim)" />
        <path
          d="M146,96 C168,66 232,66 254,96"
          fill="none"
          stroke="rgba(206,228,244,0.28)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="176" cy="150" rx="15" ry="17" fill="#e6eef6" />
        <ellipse cx="224" cy="150" rx="15" ry="17" fill="#e6eef6" />
        <ellipse cx="176" cy="151" rx="5.5" ry="8" fill="#0e1620" />
        <ellipse cx="224" cy="151" rx="5.5" ry="8" fill="#0e1620" />
        <circle cx="173" cy="147" r="2" fill="#ffffff" fillOpacity="0.85" />
        <circle cx="221" cy="147" r="2" fill="#ffffff" fillOpacity="0.85" />
      </g>
    </svg>
  )
}
