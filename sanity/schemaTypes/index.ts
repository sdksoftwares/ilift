import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import resource from './resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, resource],
}