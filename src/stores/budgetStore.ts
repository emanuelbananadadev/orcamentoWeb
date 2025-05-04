import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { BudgetData, Material } from '../interfaces'
import { budgetRules } from '../validations/budgetRules'
import { storageService } from '../services/storage'

export const useBudgetStore = defineStore('budget', () => {
  const budgets = ref<BudgetData[]>([])

  const currentBudget = ref<BudgetData>({
    id: 0,
    status: 'Pendente',
    client: {
      id: 0,
      name: '',
      company: '',
      whatsapp: '',
    },
    materials: [],
    total: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const nextProposalNumber = computed(() => {
    const lastBudget = budgets.value[budgets.value.length - 1]
    if (!lastBudget) return '0001'

    const lastNumber = parseInt(lastBudget.id.toString())
    return String(lastNumber + 1).padStart(4, '0')
  })

  const validateBudget = (budget: BudgetData): string[] => {
    return budgetRules.budget.validate(budget)
  }

  const addBudget = async (budget: BudgetData) => {
    try {
      const newBudget = await storageService.saveBudget(budget)
      budgets.value.push(newBudget)
      return newBudget;
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
      throw error;
    }
  }

  const updateBudget = async (id: string, updates: Partial<BudgetData>) => {
    try {
      const budgetToUpdate = budgets.value.find(b => b.id === parseInt(id))

      if (!budgetToUpdate) {
        throw new Error('Orçamento não encontrado')
      }

      const updatedBudget = {
        ...budgetToUpdate,
        ...updates,
        updatedAt: new Date().toISOString()
      }

      const errors = validateBudget(updatedBudget)
      if (errors.length > 0) {
        throw new Error(errors.join('\n'))
      }

      await storageService.updateBudget(updatedBudget)
      const index = budgets.value.findIndex(b => b.id === parseInt(id))
      if (index !== -1) {
        budgets.value[index] = updatedBudget
      }
      return updatedBudget
    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error)
      throw error
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      await storageService.deleteBudget(parseInt(id))
      budgets.value = budgets.value.filter(b => b.id !== parseInt(id))
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error)
      throw error
    }
  }

  const loadBudgets = async () => {
    try {
      budgets.value = await storageService.getBudgets()
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error)
      throw error
    }
  }

  const addMaterial = async (material: Material) => {
    try {
      currentBudget.value.materials.push(material)
    } catch (error) {
      console.error('Erro ao adicionar material:', error)
      throw error
    }
  }

  const updateMaterial = async (id: string, updates: Partial<Material>) => {
    try {
      const index = currentBudget.value.materials.findIndex(m => m.id === parseInt(id))
      if (index !== -1) {
        currentBudget.value.materials[index] = { ...currentBudget.value.materials[index], ...updates }
      }
      return currentBudget.value.materials[index]
    } catch (error) {
      console.error('Erro ao atualizar material:', error)
      throw error
    }
  }

  const deleteMaterial = async (id: string) => {
    try {
      currentBudget.value.materials = currentBudget.value.materials.filter(m => m.id !== parseInt(id))
    } catch (error) {
      console.error('Erro ao deletar material:', error)
      throw error
    }
  }

  const resetCurrentBudget = () => {
    currentBudget.value = {
      id: 0,
      status: 'Pendente',
      client: {
        id: 0,
        name: '',
        company: '',
        whatsapp: '',
      },
      materials: [],
      total: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  return {
    budgets,
    currentBudget,
    nextProposalNumber,
    validateBudget,
    addBudget,
    updateBudget,
    deleteBudget,
    loadBudgets,
    resetCurrentBudget,

    addMaterial,
    updateMaterial,
    deleteMaterial
  }
})
