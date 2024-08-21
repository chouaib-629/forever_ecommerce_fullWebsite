/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");

    const fetchProductData = async () => {
        products.map((product) => {
            if (product._id === productId) {
                setProductData(product);
                setImage(product.image[0]);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [products]);

    return productData ? (
        <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* Product Data */}
            <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex w-full overflow-x-auto justify-between sm:flex-col sm:justify-normal sm:w-[18.7%] sm:overflow-y-scroll">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))}
                    </div>

                    <div className="w-full sm:w-[80%]">
                        <img src={image} className="w-full h-auto" alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className=" font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img className="w-3 5" src={assets.star_icon} alt="" />
                        <img className="w-3 5" src={assets.star_icon} alt="" />
                        <img className="w-3 5" src={assets.star_icon} alt="" />
                        <img className="w-3 5" src={assets.star_icon} alt="" />
                        <img
                            className="w-3 5"
                            src={assets.star_dull_icon}
                            alt=""
                        />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 ${
                                        item === size ? "border-orange-500" : ""
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={()=>addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:w-4/5" />
                    <div className=" text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original Product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description and Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nesciunt cumque sapiente eos iure aliquam dolorum quas,
                        dolores iste amet mollitia recusandae eius dolore earum
                        ipsum suscipit molestiae! Animi, molestias? Inventore
                        cumque cupiditate maiores incidunt provident ex nostrum
                        iste eaque maxime minima temporibus perspiciatis, iusto
                        aliquid error facere. Magni totam deleniti quas error
                        velit nam voluptates impedit facilis cumque eos at non
                        eveniet, provident quo et blanditiis tempore corrupti
                        corporis debitis quidem repellendus? Veniam non aperiam
                        nesciunt dolorem quasi ipsam itaque!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Reiciendis aspernatur nobis, dicta sunt libero
                        nam, neque placeat, vel odio dolor temporibus
                        repellendus laboriosam facere molestias aut aliquam
                        optio mollitia. Consequatur perferendis debitis modi
                        nostrum laudantium autem blanditiis mollitia quod non
                        commodi. Porro, ex nesciunt quae consectetur nobis sed
                        veritatis ea esse placeat! Aut fuga quasi sit illo at
                        perferendis eligendi.
                    </p>
                </div>
            </div>

            {/* Display Related Products */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    ) : (
        <div className=" opacity-0"></div>
    );
};

export default product;
