import { createContext, useContext } from 'react'

/**
 * Coordinates the cinematic intro with every mount-time entrance animation.
 *
 * While the octopus intro is on screen the underlying route is marked
 * `active`; route-level entrance timelines wait for `ready` so they play
 * as a continuation of the reveal instead of silently running behind the
 * overlay. When no intro plays (return visit, reduced motion, deep link
 * after it already ran) the value is `ready` from the very first render and
 * nothing is delayed.
 */
export type IntroPhase = 'active' | 'ready'

const IntroContext = createContext<IntroPhase>('ready')

export const IntroProvider = IntroContext.Provider

export function useIntroPhase(): IntroPhase {
  return useContext(IntroContext)
}

export function useIntroReady(): boolean {
  return useContext(IntroContext) === 'ready'
}
