export type Section = 'overview' | 'plan' | 'budget' | 'guests' | 'vendors'
export type RSVP = 'Pending' | 'Confirmed' | 'Declined'
export type TaskStatus = 'todo' | 'done'

export type BudgetItem = { id: string; category: string; label: string; estimated: number; actual: number }
export type Task = { id: string; title: string; due: string; status: TaskStatus; priority: 'High' | 'Medium' | 'Low' }
export type Guest = { id: string; name: string; party: number; rsvp: RSVP; note?: string }
export type Vendor = { id: string; category: string; name: string; quote: number; status: 'Researching' | 'Shortlisted' | 'Booked' }
export type Event = { id: string; name: string; type: string; date: string; city: string; guests: number; budget: number; currency: string; style: string; budgets: BudgetItem[]; tasks: Task[]; guestsList: Guest[]; vendors: Vendor[]; generated: boolean }

export const demoEvent: Event = {
  id: 'demo-wedding', name: 'Mira & Arjun’s Wedding', type: 'Wedding', date: '2027-02-14', city: 'Jaipur, Rajasthan', guests: 150, budget: 500000, currency: 'INR', style: 'Modern heritage', generated: true,
  budgets: [
    { id: 'b1', category: 'Venue', label: 'Courtyard venue & setup', estimated: 125000, actual: 0 }, { id: 'b2', category: 'Food', label: 'Catering for 150 guests', estimated: 110000, actual: 0 }, { id: 'b3', category: 'Decoration', label: 'Florals & lighting', estimated: 65000, actual: 0 }, { id: 'b4', category: 'Photography', label: 'Photo + film', estimated: 45000, actual: 0 }, { id: 'b5', category: 'Attire', label: 'Wedding outfits', estimated: 55000, actual: 0 }, { id: 'b6', category: 'Contingency', label: 'A little breathing room', estimated: 50000, actual: 0 }
  ],
  tasks: [
    { id: 't1', title: 'Shortlist venues', due: '2026-11-08', status: 'done', priority: 'High' }, { id: 't2', title: 'Lock the caterer', due: '2026-11-21', status: 'todo', priority: 'High' }, { id: 't3', title: 'Send save-the-dates', due: '2026-12-01', status: 'todo', priority: 'Medium' }, { id: 't4', title: 'Finalise ceremony details', due: '2027-01-10', status: 'todo', priority: 'Medium' }
  ], guestsList: [{ id: 'g1', name: 'Rhea Kapoor', party: 2, rsvp: 'Confirmed' }, { id: 'g2', name: 'Kabir Mehta', party: 1, rsvp: 'Pending' }, { id: 'g3', name: 'Sana & Dev', party: 2, rsvp: 'Confirmed' }],
  vendors: [{ id: 'v1', category: 'Venue', name: 'The Courtyard House', quote: 125000, status: 'Shortlisted' }, { id: 'v2', category: 'Photography', name: 'Add a photographer', quote: 0, status: 'Researching' }]
}

export const money = (value: number, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
export const daysUntil = (date: string, today = new Date()) => {
  const target = new Date(`${date}T00:00:00`)
  const start = new Date(today)
  start.setHours(0, 0, 0, 0)
  return Number.isNaN(target.getTime()) ? 0 : Math.ceil((target.getTime() - start.getTime()) / 86400000)
}
export const totalEstimated = (event: Event) => event.budgets.reduce((sum, item) => sum + item.estimated, 0)
export const totalActual = (event: Event) => event.budgets.reduce((sum, item) => sum + item.actual, 0)
export const remainingBudget = (event: Event) => event.budget - totalActual(event)
export const planningProgress = (event: Event) => {
  if (event.tasks.length === 0) return 0
  return Math.round((event.tasks.filter(task => task.status === 'done').length / event.tasks.length) * 100)
}

export const pendingGuests = (event: Event) => event.guestsList.filter(guest => guest.rsvp === 'Pending').length
export const confirmedGuests = (event: Event) => event.guestsList.filter(guest => guest.rsvp === 'Confirmed').length
export const overdueTasks = (event: Event, today = new Date()) => event.tasks.filter(task => task.status !== 'done' && daysUntil(task.due, today) < 0)
export const sortedTasks = (event: Event) => [...event.tasks].sort((a, b) => a.due.localeCompare(b.due))
export const isOverBudget = (event: Event) => totalActual(event) > event.budget
export const normalizeExpense = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100
export const addExpenseToFirstCategory = (event: Event, amount: number) => {
  if (!Number.isFinite(amount) || amount <= 0) return event
  const budgets = event.budgets.map((item, index) => index === 0 ? { ...item, actual: normalizeExpense(item.actual + amount) } : item)
  return { ...event, budgets }
}
