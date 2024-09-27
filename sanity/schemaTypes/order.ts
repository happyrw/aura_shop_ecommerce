export interface Order {
    _id: string;
    name: 'order';
    title: 'Order';
    type: 'document';
    fields: {
        postedBy: {
            _type: 'postedBy';
        };
        userId: string;
    };
}

const orderSchema = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy',
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string',
        },
    ]
}

export default orderSchema;