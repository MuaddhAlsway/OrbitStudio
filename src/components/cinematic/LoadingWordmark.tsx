const WORDMARK = 'ORBIT STUDIO'

export default function LoadingWordmark() {
  return (
    <div className="cl-wordmark">
      <span className="cl-wordmark__mask" aria-hidden="true">
        {Array.from('ORBIT STUDIO').map((char, index) => (
          <span key={index} className="cl-wordmark__char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span className="cl-wordmark__rule" aria-hidden="true" />
      <span className="cl-wordmark__tag" aria-hidden="true">
        ENGINEERING WHAT&rsquo;S NEXT.
      </span>
      <span className="cl-sr-only">ORBIT STUDIO — Engineering what&rsquo;s next.</span>
    </div>
  )
}
