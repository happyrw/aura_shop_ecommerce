import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import Product from "@/components/Product";
import { ProductProduct } from "@/components/ProductDetailComponent";

import { client } from "@/lib/client";

const Home = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product: ProductProduct) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export default Home;
