import db from "../../../models";
import { uploadImage } from "../../../utils/claudinary";
const { Product, Category, ProductImage } = db;

export const productService = {
  async createProduct({
    sellerId,
    categoryId,
    name,
    description,
    price,
    stockQty,
  }: {
    sellerId: number;
    categoryId: number;
    name: string;
    description?: string;
    price: number;
    stockQty: number;
  }) {
    const category = await Category.findByPk(categoryId);
    if (!category) throw new Error("Category not found");

    const product = await Product.create({
      sellerId,
      categoryId,
      name,
      description,
      price,
      stockQty,
    });

    return {
      success: true,
      message: "Product created successfully",
      product,
    };
  },

  async addProductImage({
    sellerId,
    productId,
    localFilePath,
    altText,
    isPrimary = false,
  }: {
    sellerId: number;
    productId: number;
    localFilePath: string;
    altText?: string;
    isPrimary?: boolean;
  }) {
    const product = await Product.findByPk(productId);

    if (!product) throw new Error("Product not found");
    if (product.sellerId !== sellerId) {
      throw new Error(
        "Unauthorized: You can only add images to your own products"
      );
    }

    const normalizedFilePath = localFilePath.startsWith("file://")
      ? new URL(localFilePath).pathname
      : localFilePath;

    const imageUrl = await uploadImage(normalizedFilePath);
    console.log(imageUrl);

    if (isPrimary) {
      await ProductImage.update({ isPrimary: false }, { where: { productId } });
    }

    const image = await ProductImage.create({
      productId,
      url: imageUrl,
      altText,
      isPrimary,
    });

    return {
      success: true,
      message: "Product image added successfully",
      image,
    };
  },
  async updateProduct({
    sellerId,
    productId,
    name,
    description,
    price,
    stockQty,
    isActive,
  }: {
    sellerId: number;
    productId: number;
    name?: string;
    description?: string;
    price?: number;
    stockQty?: number;
    isActive?: boolean;
  }) {
    const product = await Product.findByPk(productId);

    if (!product) throw new Error("Product not found");
    if (product.sellerId !== sellerId) {
      throw new Error("Unauthorized: You can only update your own products");
    }
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stockQty !== undefined) product.stockQty = stockQty;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    return {
      success: true,
      message: "Product updated successfully",
      product,
    };
  },
  async updateProductImage({
    imageId,
    localFilePath,
    altText,
    isPrimary = false,
    sellerId,
  }: {
    imageId: number;
    localFilePath?: string;
    altText?: string;
    isPrimary?: boolean;
    sellerId: number;
  }) {
    const image = await db.ProductImage.findByPk(imageId);
    if (!image) throw new Error("Product image not found");

    const product = await db.Product.findByPk(image.productId);
    if (!product) throw new Error("Product not found");
    if (product.sellerId !== sellerId)
      throw new Error(
        "Unauthorized: You can only update your own product images"
      );

    if (localFilePath) {
      const normalizedPath = localFilePath.startsWith("file://")
        ? new URL(localFilePath).pathname
        : localFilePath;

      const newImageUrl = await uploadImage(normalizedPath);
      image.url = newImageUrl;
    }
    if (isPrimary) {
      await db.ProductImage.update(
        { isPrimary: false },
        { where: { productId: product.id } }
      );
      image.isPrimary = true;
    }
    if (altText !== undefined) {
      image.altText = altText;
    }

    await image.save();

    return {
      success: true,
      message: "Product image updated successfully",
      image,
    };
  },
  async deleteProductImage({
    imageId,
    sellerId,
  }: {
    imageId: number;
    sellerId: number;
  }) {
    const image = await db.ProductImage.findByPk(imageId);
    if (!image) throw new Error("Product image not found");

    const product = await db.Product.findByPk(image.productId);
    if (!product) throw new Error("Product not found");

    if (product.sellerId !== sellerId)
      throw new Error(
        "Unauthorized: You can only delete your own product images"
      );

    await image.destroy();

    return {
      success: true,
      message: "Product image deleted successfully",
      image: null,
    };
  },
};
