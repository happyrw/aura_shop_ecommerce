import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2020-08-27',
});


export async function POST(req: Request) {
    console.log('POST', req.body);

    try {
        // Parse the body of the request
        const body = await req.json();

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1Q29pwJ7pigO8uu5kqEyOjeR' },
                { shipping_rate: 'shr_1Q29u5J7pigO8uu5woWCTjmh' }
            ],
            // eslint-disable-next-line
            line_items: body.map((item: any) => {
                const imgRef = item.image[0]?.asset?._ref;

                if (!imgRef) {
                    console.error("Image reference not found");
                }

                const newImage = imgRef
                    ? imgRef.replace('image-', 'https://cdn.sanity.io/images/gjxzlxtr/production/')
                        .replace('-jpg', '.jpg')
                        .replace('-webp', '.webp')
                    : '';

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}/canceled`,
        };

        // Create a checkout session
        //@ts-expect-error ${}
        const session = await stripe.checkout.sessions.create(params);

        // Redirect to the session URL
        return NextResponse.json(session);

    } catch (err) {
        console.error('Error:', err);
        // eslint-disable-next-line
        return NextResponse.json({ message: (err as any).message }, { status: (err as any).statusCode || 500 });
    }

}
