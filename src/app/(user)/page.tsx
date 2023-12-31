import { filterDocs } from "@backend/lib";
import { Carousel } from "@components/Carousel";
import ProductCard from "@components/ProductCard";
import BetaVersionDialog from "@modules/user/home/BetaVersionDialog";
import { categories } from "@utils/constants";
import { fetchProductsImages } from "@utils/fetch-product";
import { limit, where } from "firebase/firestore";
import { ResponsiveType } from "react-multi-carousel";
import { Product } from "types/product";

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = async () => {
  let mobileProducts: Product[] = await filterDocs(
    "products",
    where("category", "==", categories[0].value),
    limit(6)
  );
  mobileProducts = await fetchProductsImages(mobileProducts);

  let electronicsProducts: Product[] = await filterDocs(
    "products",
    where("category", "==", categories[1].value),
    limit(6)
  );
  electronicsProducts = await fetchProductsImages(electronicsProducts);

  let fashionProducts: Product[] = await filterDocs(
    "products",
    where("category", "==", categories[2].value),
    limit(6)
  );
  fashionProducts = await fetchProductsImages(fashionProducts);

  return (
    <div>
      {mobileProducts.length !== 0 && (
        <div className="grid gap-2">
          <h4>Best of Mobiles & Tablets</h4>

          <Carousel responsive={responsive}>
            {mobileProducts.map((product) => (
              <ProductCard key={product.id} isDisplay {...product} />
            ))}
          </Carousel>
        </div>
      )}

      {fashionProducts.length !== 0 && (
        <div className="grid gap-2">
          <h4>Best of Fashion</h4>

          <Carousel responsive={responsive}>
            {fashionProducts.map((product) => (
              <ProductCard key={product.id} isDisplay {...product} />
            ))}
          </Carousel>
        </div>
      )}

      {electronicsProducts.length !== 0 && (
        <div className="grid gap-2">
          <h4>Best of Electronics</h4>

          <Carousel responsive={responsive}>
            {electronicsProducts.map((product) => (
              <ProductCard key={product.id} isDisplay {...product} />
            ))}
          </Carousel>
        </div>
      )}

      <BetaVersionDialog />
    </div>
  );
};

export default Home;
