import type { BudgetData, Client } from '.'

export interface IStorageService {
  // Clientes
  saveClient(client: Client): Promise<Client>
  getClients(): Promise<Client[]>
  getClientByName(name: string): Promise<Client | null>
  updateClient(client: Client): Promise<Client>
  deleteClient(clientId: number): Promise<void>

  // Orçamentos
  saveBudget(budget: BudgetData): Promise<BudgetData>
  saveBudgets(budgets: BudgetData[]): Promise<void>
  getBudgets(): Promise<BudgetData[]>
  updateBudget(budget: BudgetData): Promise<BudgetData>
  deleteBudget(budgetId: number): Promise<void>
}
