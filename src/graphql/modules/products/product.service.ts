import db from "../../../models";
import { uploadImage, deleteImage } from "../../../utils/claudinary";
import { WhereOptions } from "sequelize/types";

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

    return { success: true, message: "Product created successfully", product };
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
    if (product.sellerId !== sellerId)
      throw new Error(
        "Unauthorized: You can only add images to your own products"
      );

    const normalizedFilePath = localFilePath.startsWith("file://")
      ? new URL(localFilePath).pathname
      : localFilePath;

    const { secure_url, public_id } = await uploadImage(normalizedFilePath);

    if (isPrimary) {
      await ProductImage.update({ isPrimary: false }, { where: { productId } });
    }

    const image = await ProductImage.create({
      productId,
      url: secure_url,
      publicId: public_id,
      altText,
      isPrimary,
    });

    return {
      success: true,
      message: "Product image added successfully",
      image,
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
      if (image.publicId) await deleteImage(image.publicId);

      const normalizedPath = localFilePath.startsWith("file://")
        ? new URL(localFilePath).pathname
        : localFilePath;

      const { secure_url, public_id } = await uploadImage(normalizedPath);
      image.url = secure_url;
      image.publicId = public_id;
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

    if (image.publicId) await deleteImage(image.publicId);

    await image.destroy();

    return {
      success: true,
      message: "Product image deleted successfully",
      image: null,
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
    if (product.sellerId !== sellerId)
      throw new Error("Unauthorized: You can only update your own products");

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stockQty !== undefined) product.stockQty = stockQty;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    return { success: true, message: "Product updated successfully", product };
  },

  async myProducts({
    sellerId,
    limit = 10,
    offset = 0,
  }: {
    sellerId: number;
    limit?: number;
    offset?: number;
  }) {
    const products = await Product.findAll({
      where: { sellerId },
      include: [{ model: ProductImage, as: "images", required: false }],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return products;
  },

  async getProducts({
    limit = 10,
    offset = 0,
    categoryId,
  }: {
    limit?: number;
    offset?: number;
    categoryId?: number;
  }) {
    const where: WhereOptions = { isActive: true };
    if (categoryId !== undefined) where["categoryId"] = categoryId;

    const { count, rows: products } = await db.Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [{ model: db.ProductImage, as: "images" }],
    });

    return { total: count, products };
  },

  async getProductById(productId: number) {
    const product = await db.Product.findOne({
      where: { id: productId, isActive: true },
      include: [{ model: db.ProductImage, as: "images" }],
    });

    if (!product) throw new Error("Product not found");
    return product;
  },

  async deleteProduct(productId: number, sellerId: number) {
    const product = await db.Product.findOne({
      where: { id: productId, sellerId },
    });
    if (!product)
      return { success: false, message: "Product not found or unauthorized" };

    const images = await db.ProductImage.findAll({ where: { productId } });
    for (const img of images) {
      if (img.publicId) await deleteImage(img.publicId);
    }

    await db.ProductImage.destroy({ where: { productId } });
    await Product.destroy({ where: { id: productId } });

    return { success: true, message: "Product deleted successfully" };
  },
};
