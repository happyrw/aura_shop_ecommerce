import ProductDetailComponent from "@/components/ProductDetailComponent";
import { client } from "@/lib/client";

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const query = `*[_type == "product" && _id == $slug][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query, { slug });
    const products = await client.fetch(productsQuery);

    if (!product) {
        return <div>Loading...</div>;
    }
    const { image, name, details, price } = product;
    return (
        <div>
            <ProductDetailComponent
                name={name}
                details={details}
                price={price}
                products={products}
                product={product}
                image={image}
            />
        </div>
    );
};

export default ProductDetails;
