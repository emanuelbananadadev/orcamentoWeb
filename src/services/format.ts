export const formatService = {
  currency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  },

  date(value: string | Date): string {
    return new Date(value).toLocaleDateString('pt-BR')
  },

  id(value: number): string {
    return value.toString().padStart(4, '0')
  }
}
