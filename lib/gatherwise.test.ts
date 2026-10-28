import { describe, expect, it } from 'vitest'
import { addExpenseToFirstCategory, confirmedGuests, demoEvent, daysUntil, isOverBudget, overdueTasks, pendingGuests, planningProgress, remainingBudget, sortedTasks, totalActual, totalEstimated } from './gatherwise'

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

  it('tracks guest response counts and overdue tasks', () => {
    const event = { ...demoEvent, tasks: [
      { ...demoEvent.tasks[0], due: '2026-10-01', status: 'todo' as const },
      { ...demoEvent.tasks[1], due: '2026-11-21', status: 'todo' as const },
    ] }
    expect(confirmedGuests(event)).toBe(2)
    expect(pendingGuests(event)).toBe(1)
    expect(overdueTasks(event, new Date('2026-10-28T12:00:00'))).toHaveLength(1)
  })

  it('sorts tasks without mutating the event', () => {
    const event = { ...demoEvent, tasks: [demoEvent.tasks[1], demoEvent.tasks[0]] }
    expect(sortedTasks(event).map(task => task.id)).toEqual(['t1', 't2'])
    expect(event.tasks.map(task => task.id)).toEqual(['t2', 't1'])
  })

  it('normalizes valid expenses and flags overspending', () => {
    const updated = addExpenseToFirstCategory({ ...demoEvent, budget: 100 }, 100.105)
    expect(updated.budgets[0].actual).toBe(100.11)
    expect(isOverBudget(updated)).toBe(true)
    expect(addExpenseToFirstCategory(demoEvent, -10)).toBe(demoEvent)
  })
})
