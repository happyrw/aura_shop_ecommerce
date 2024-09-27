import { type SchemaTypeDefinition } from 'sanity'
import bannerSchema from './banner'
import productSchema from './product'
import userSchema from './user'
import reviewSchema from './review'
import PostedBySchema from './postedBy'
import orderSchema from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bannerSchema,
    productSchema,
    userSchema,
    reviewSchema,
    PostedBySchema,
    orderSchema,
  ],
}
