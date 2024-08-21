/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relavent");

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((categoryList) =>
                categoryList.filter((item) => item !== e.target.value)
            );
        } else {
            setCategory((categoryList) => [...categoryList, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((subCategoryList) =>
                subCategoryList.filter((item) => item !== e.target.value)
            );
        } else {
            setSubCategory((subCategoryList) => [
                ...subCategoryList,
                e.target.value,
            ]);
        }
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter((product) =>
                category.includes(product.category)
            );
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((product) =>
                subCategory.includes(product.subCategory)
            );
        }

        setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case "low-high":
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
                break;

            case "high-low":
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
                break;

            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                >
                    FILTERS
                    <img
                        src={assets.dropdown_icon}
                        className={`h-3 sm:hidden ${
                            showFilter ? "rotate-90" : ""
                        }`}
                        alt=""
                    />
                </p>
                {/* Category Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
                        showFilter ? "" : "hidden"
                    }`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Men"}
                                onChange={toggleCategory}
                            />
                            Men
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Women"}
                                onChange={toggleCategory}
                            />
                            Women
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Kids"}
                                onChange={toggleCategory}
                            />
                            Kids
                        </p>
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div
                    className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
                        showFilter ? "" : "hidden"
                    }`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Topwear"}
                                onChange={toggleSubCategory}
                            />
                            Topwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Bottomwear"}
                                onChange={toggleSubCategory}
                            />
                            Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input
                                type="checkbox"
                                className="w-3"
                                value={"Winterwear"}
                                onChange={toggleSubCategory}
                            />
                            Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Product Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: Hight to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((product, index) => (
                        <ProductItem
                            key={index}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default collection;
