import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Digite um email válido')
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    )
})

export type LoginFormData = z.infer<typeof loginSchema>
