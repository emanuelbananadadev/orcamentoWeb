import type { BudgetData } from './index'

export interface PrintLayoutProps {
  budget: BudgetData
}

export interface PrintLayoutInstance {
  printRef: () => HTMLElement | null
}

export interface PrintLayoutExpose {
  printRef: () => HTMLElement | null
}
