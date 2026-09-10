import { z } from 'zod'

export const agenciaSchema = z.object({
    codigo: z
        .string()
        .min(1, 'El código es obligatorio')
        .max(20, 'El código no puede superar 20 caracteres'),

    nombre: z
        .string()
        .min(1, 'El nombre es obligatorio')
        .max(100, 'El nombre no puede superar 100 caracteres'),

    direccion: z
        .string()
        .max(200, 'La dirección no puede superar 200 caracteres')
        .optional()
        .or(z.literal('')),

    telefono: z
        .string()
        .max(30, 'El teléfono no puede superar 30 caracteres')
        .optional()
        .or(z.literal('')),
})

export type AgenciaFormValues = z.infer<typeof agenciaSchema>