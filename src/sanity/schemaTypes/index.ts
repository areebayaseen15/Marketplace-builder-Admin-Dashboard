import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'

import Car from './car'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType,  postType, authorType, Car],
}
