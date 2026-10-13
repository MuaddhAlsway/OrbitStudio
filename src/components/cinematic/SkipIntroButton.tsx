import { forwardRef } from 'react'

type Props = {
  onClick: () => void
}

const SkipIntroButton = forwardRef<HTMLButtonElement, Props>(function SkipIntroButton(
  { onClick },
  ref,
) {
  return (
    <button ref={ref} type="button" className="cl-skip" onClick={onClick}>
      <span>Skip Intro</span>
      <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
        <path
          d="M3 9h11M9.5 4l5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
})

export default SkipIntroButton
