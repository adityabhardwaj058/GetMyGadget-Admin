import React from "react";
import { getCategoriesWithProducts } from "@/actions/categories";
import { ProductPageComponent } from "@/app/admin/products/page-component";
import { getProductsWithCategories } from "@/actions/products";

const Products = async () => {
  const categories = await getCategoriesWithProducts();
  const productsWithCategories = await getProductsWithCategories();
  return (
    <ProductPageComponent
      categories={categories}
      productsWithCategories={productsWithCategories}
    ></ProductPageComponent>
  );
};

export default Products;
