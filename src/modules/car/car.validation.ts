import { z } from 'zod';

const createCarValidationSchema = z.object({
  body: z.object({
    brand: z.string({ required_error: 'Brand is required' }),
    model: z.string({ required_error: 'Model is required' }),
    year: z.number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    }).min(1994, {message: 'Year must be 1994 or later'}),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    }).min(0, {message: 'Price must be 0 or greater'}),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
      required_error: 'Category is required',
    }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string({ required_error: 'Image is required' }),
    quantity: z.number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    }).min(0, {message: 'Quantity must be 0 or greater'}),
    inStock: z.boolean({ required_error: 'In stock is required' }),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z
      .number({
        invalid_type_error: 'Year must be a number',
      })
      .min(1994, {message: 'Year must be 1994 or later'})
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .min(0, {message: 'Price must be 0 or greater'})
      .optional(),
    category: z
      .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
      .optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, {message: 'Quantity must be 0 or greater'})
      .optional(),
    inStock: z.boolean().optional(),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};