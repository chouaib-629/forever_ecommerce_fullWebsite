import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    
    return (
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
            <div className=" overflow-hidden">
                <img
                    src={image[0]}
                    className=" hover:scale-110 transition ease-in-out"
                    alt=""
                />
            </div>
            <p className="pt-3 pb-1 text-sm"> {name} </p>
            <p className=" text-sm font-medium">
                {currency}
                {price}{" "}
            </p>
        </Link>
    );
};

export default ProductItem;
