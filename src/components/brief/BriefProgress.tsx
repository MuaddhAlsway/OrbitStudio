import { BRIEF_STEPS } from '../../data/brief'

interface BriefProgressProps {
  current: number
  onJump: (index: number) => void
}

export default function BriefProgress({ current, onJump }: BriefProgressProps) {
  const total = BRIEF_STEPS.length
  const percent = ((current + 1) / total) * 100

  return (
    <aside className="pb-progress" aria-label="Brief progress">
      <div
        className="pb-progress__track"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-valuetext={`Step ${current + 1} of ${total}: ${BRIEF_STEPS[current].label}`}
      >
        <span className="pb-progress__fill" style={{ width: `${percent}%` }} />
      </div>

      <ol className="pb-progress__list">
        {BRIEF_STEPS.map((step, index) => {
          const state = index < current ? 'done' : index === current ? 'current' : 'todo'
          return (
            <li key={step.id} className={`pb-progress__item is-${state}`}>
              <button
                type="button"
                className="pb-progress__btn"
                onClick={() => onJump(index)}
                disabled={index > current}
                aria-current={index === current ? 'step' : undefined}
              >
                <span className="pb-progress__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="pb-progress__label">{step.label}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <p className="pb-progress__count">
        Step {current + 1} of {total}
      </p>
    </aside>
  )
}
