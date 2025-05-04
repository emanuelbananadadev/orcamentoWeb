import type { BudgetData, Client, Material } from '../interfaces'

export class IdGenerator {
  private static getNextId<T extends { id: number }>(items: T[]): number {
    if (items.length === 0) return 1
    const maxId = Math.max(...items.map(item => item.id))
    return maxId + 1
  }

  static getNextClientId(clients: Client[]): number {
    return this.getNextId(clients)
  }

  static getNextBudgetId(budgets: BudgetData[]): number {
    return this.getNextId(budgets)
  }

  static getNextMaterialId(materials: Material[]): number {
    return this.getNextId(materials)
  }
}
