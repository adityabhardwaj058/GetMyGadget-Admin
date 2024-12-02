import {z} from 'zod';

export const createCategorySchema = z.object({
    image: z.any().refine(file => file.length === 1, 'Image is required'),
    name: z.string().min(2, {message: "name must be atleast 2 characters long"}),
    intent: z.enum(['create', 'update'], {message: 'Intent must be either createa or update'}).optional(),
    slug: z.string().optional()
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const createCategorySchemaServer = z.object({
    imageUrl: z.string().min(1, {message: 'Image is required'}),
    name: z.string().min(2, {message: "name must be atleast 2 characters long"})
})

export type CreateCategorySchemaServer = z.infer<typeof createCategorySchemaServer>

export const updateCateogrySchema = z.object({
    imageUrl: z.string().min(1, {message: 'Image is required'}),
    name: z.string().min(2, {message: "name must be atleast 2 characters long"}),
    intent: z.enum(['create', 'update'], {message: 'Intent must be either create or update'}),
    slug: z.string().min(1, {message: 'Slug is required'})
})

export type UpdateCategorySchema = z.infer<typeof updateCateogrySchema>