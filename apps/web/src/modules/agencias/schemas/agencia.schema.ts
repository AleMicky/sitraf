import { z } from 'zod'

export const agenciaSchema = z.object({
  codigo: z.string().trim().min(1, 'El código es obligatorio').max(30, 'Máximo 30 caracteres'),
  nombre: z.string().trim().min(1, 'El nombre es obligatorio').max(150, 'Máximo 150 caracteres'),
  direccion: z.string().trim().max(250, 'Máximo 250 caracteres').nullable().optional(),
  telefono: z.string().trim().max(30, 'Máximo 30 caracteres').nullable().optional(),
  activo: z.boolean().default(true),
})

export type AgenciaFormValues = z.infer<typeof agenciaSchema>
