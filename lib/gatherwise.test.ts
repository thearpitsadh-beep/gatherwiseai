import { describe, expect, it } from 'vitest'
import { demoEvent, daysUntil, planningProgress, remainingBudget, totalActual, totalEstimated } from './gatherwise'

describe('gatherwise domain calculations', () => {
  it('totals estimated and actual budget values', () => {
    const event = { ...demoEvent, budgets: [
      { id: '1', category: 'Venue', label: 'Venue', estimated: 1250, actual: 900 },
      { id: '2', category: 'Food', label: 'Food', estimated: 750, actual: 500 },
    ] }

    expect(totalEstimated(event)).toBe(2000)
    expect(totalActual(event)).toBe(1400)
    expect(remainingBudget({ ...event, budget: 2500 })).toBe(1100)
  })

  it('calculates task progress and handles an empty timeline', () => {
    expect(planningProgress({ ...demoEvent, tasks: [
      { ...demoEvent.tasks[0], status: 'done' },
      { ...demoEvent.tasks[1], status: 'todo' },
      { ...demoEvent.tasks[2], status: 'done' },
    ] })).toBe(67)
    expect(planningProgress({ ...demoEvent, tasks: [] })).toBe(0)
  })

  it('calculates date boundaries from a supplied day', () => {
    const today = new Date('2026-10-28T15:00:00')
    expect(daysUntil('2026-10-28', today)).toBe(0)
    expect(daysUntil('2026-11-08', today)).toBe(11)
    expect(daysUntil('not-a-date', today)).toBe(0)
  })
})
