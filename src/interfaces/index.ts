export type BudgetStatus = 'Pendente' | 'Aprovado' | 'Rejeitado' | 'Concluido'

export interface Client {
  id: number
  name: string
  company: string
  whatsapp: string
}

export interface Material {
  id: number
  name: string
  brand: string
  quantity: number
  unit: string
  price: number
  total: number
}

export interface BudgetData {
  id: number
  client: Client
  materials: Material[]
  total: number
  status: BudgetStatus
  createdAt: string
  updatedAt: string
}


export interface User {
  email: string
  lastLogin: string
}



