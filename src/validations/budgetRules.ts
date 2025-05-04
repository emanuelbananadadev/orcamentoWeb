import { z } from 'zod'
import type { BudgetData, Material, Client } from '../interfaces'

const clientSchema = z.object({
  name: z.string().min(1, 'Nome do cliente é obrigatório').trim(),
  company: z.string().min(1, 'Empresa do cliente é obrigatória').trim(),
  whatsapp: z
    .string()
    .min(1, 'WhatsApp é obrigatório')
    .transform((val) => val.replace(/\D/g, ''))
    .refine(
      (val) => /^(\+55|55)?(\d{2})(\d{5})(\d{4})$/.test(val),
      'Número de WhatsApp inválido'
    )
    .transform((val) => val.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'))
})

const materialSchema = z.object({
  name: z.string().min(1, 'Produto é obrigatório').trim(),
  brand: z.string().min(1, 'Marca é obrigatória').trim(),
  quantity: z.number().min(0.01, 'Quantidade deve ser maior que zero'),
  unit: z.string().min(1, 'Unidade de medida é obrigatória').trim(),
  price: z.number().min(0.01, 'Valor total deve ser maior que zero')
}).transform((material) => ({
  ...material,
  totalPrice: material.price * material.quantity
}))

const budgetSchema = z.object({
  client: clientSchema,
  materials: z
    .array(materialSchema)
    .min(1, 'Adicione pelo menos um material')
}).transform((budget) => ({
  ...budget,
  total: budget.materials.reduce((acc, material) => acc + material.totalPrice, 0)
}))

export const budgetRules = {
  client: {
    validate: (client: Client) => {
      const result = clientSchema.safeParse(client)
      return result.success ? [] : result.error.errors.map(err => err.message)
    }
  },

  material: {
    validate: (material: Material) => {
      const result = materialSchema.safeParse(material)
      return result.success ? [] : result.error.errors.map(err => err.message)
    }
  },

  budget: {
    validate: (budget: BudgetData) => {
      const result = budgetSchema.safeParse(budget)
      return result.success ? [] : result.error.errors.map(err => err.message)
    }
  },

  format: {
    currency: (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    }
  }
}
