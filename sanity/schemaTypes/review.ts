import type { Rule as SanityRule } from 'sanity';

export interface Review {
    postedBy: {
        _type: 'postedBy';
        _ref: string;
    };
    review: string;
    rating: number;
}

const reviewSchema = {
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy',
        },
        {
            name: 'review',
            title: 'Review',
            type: 'string',
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule: SanityRule) => Rule.min(1).max(5), // Rating scale of 1 to 5
        },
    ]
}

export default reviewSchema;