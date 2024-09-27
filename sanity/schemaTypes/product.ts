import type { Rule as SanityRule } from 'sanity';
import { Order } from './order';
import { Review } from './review';

interface ParentType {
    isDiscounted?: boolean;
}

export interface Product {
    image: { _type: 'image'; asset: { _ref: string } }[];
    userId: string;
    postedBy: string;
    order: Order[];
    reviews: Review[];
    name: string;
    _id: string;
    slug: { _type: 'slug'; current: string };
    price: number;
    description: string;
    details: string;
    category: string;
    stock: number;
    SKU: string;
    isNewArrival: boolean;
    isDiscounted: boolean;
    discountPrice?: number;
    rating: number;
    createdAt: string;
}

const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
        },
        {
            name: 'userId',
            title: 'UserID',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy'
        },
        {
            name: 'order',
            title: 'Order',
            type: 'array',
            of: [{ type: 'order' }]
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [{ type: 'review' }]
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: SanityRule) => Rule.required().min(2).max(100),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            },
            validation: (Rule: SanityRule) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule: SanityRule) => Rule.required().min(0),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule: SanityRule) => Rule.max(500),
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: (Rule: SanityRule) => Rule.min(0),
        },
        {
            name: 'SKU',
            title: 'SKU',
            type: 'string',
            validation: (Rule: SanityRule) => Rule.required(),
        },
        {
            name: 'isNewArrival',
            title: 'New Arrival',
            type: 'boolean',
        },
        {
            name: 'isDiscounted',
            title: 'Discounted',
            type: 'boolean',
        },
        {
            name: 'discountPrice',
            title: 'Discount Price',
            type: 'number',
            hidden: ({ parent }: { parent: ParentType }) => !parent?.isDiscounted,
            validation: (Rule: SanityRule) => Rule.min(0),
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule: SanityRule) => Rule.min(0).max(5),
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        },
    ],
};

export default productSchema;
