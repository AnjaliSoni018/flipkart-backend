import db from "../../../models";

export const customerService = {
  async getProfile(userId: number) {
    const user = await db.User.findByPk(userId, {
      attributes: ["id", "name", "phone", "email", "role", "createdAt"],
    });

    if (!user) throw new Error("User not found");

    return {
      success: true,
      message: "Profile fetched successfully",
      user,
    };
  },

  async updateProfile(
    userId: number,
    { name, email }: { name?: string; email?: string }
  ) {
    const user = await db.User.findByPk(userId);
    if (!user) throw new Error("User not found");

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
      user,
    };
  },

  async addAddress(
    userId: number,
    {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault = false,
    }: {
      fullName: string;
      phone: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      isDefault?: boolean;
    }
  ) {
    if (isDefault) {
      await db.Address.update({ isDefault: false }, { where: { userId } });
    }

    const address = await db.Address.create({
      userId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    return {
      success: true,
      message: "Address added successfully",
      address,
    };
  },

  async getMyAddresses(userId: number) {
    const addresses = await db.Address.findAll({
      where: { userId },
      order: [
        ["isDefault", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    return {
      success: true,
      message: "Addresses fetched successfully",
      addresses,
    };
  },

  async updateAddress(
    userId: number,
    {
      addressId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    }: {
      addressId: number;
      fullName?: string;
      phone?: string;
      addressLine1?: string;
      addressLine2?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      isDefault?: boolean;
    }
  ) {
    const address = await db.Address.findOne({
      where: { id: addressId, userId },
    });

    if (!address) throw new Error("Address not found");

    if (isDefault) {
      await db.Address.update({ isDefault: false }, { where: { userId } });
    }

    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (postalCode !== undefined) address.postalCode = postalCode;
    if (country !== undefined) address.country = country;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    return {
      success: true,
      message: "Address updated successfully",
      address,
    };
  },

  async deleteAddress(userId: number, addressId: number) {
    const address = await db.Address.findOne({
      where: { id: addressId, userId },
    });

    if (!address) throw new Error("Address not found");

    await address.destroy();

    return {
      success: true,
      message: "Address deleted successfully",
    };
  },

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await db.Product.findByPk(productId);
    if (!product || !product.isActive) throw new Error("Product not found");

    const [cartItem, created] = await db.CartItem.findOrCreate({
      where: { userId, productId },
      defaults: { userId, productId, quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return this.getMyCart(userId, "Product added to cart");
  },

  async updateCartItem(userId: number, productId: number, quantity: number) {
    const cartItem = await db.CartItem.findOne({
      where: { userId, productId },
    });

    if (!cartItem) throw new Error("Cart item not found");

    if (quantity <= 0) {
      await cartItem.destroy();
      return this.getMyCart(userId);
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return this.getMyCart(userId);
  },

  async removeCartItem(userId: number, productId: number) {
    const cartItem = await db.CartItem.findOne({
      where: { userId, productId },
    });
    if (!cartItem) throw new Error("Cart item not found");

    await cartItem.destroy();

    return this.getMyCart(userId, "Cart item removed");
  },

  async clearCart(userId: number) {
    await db.CartItem.destroy({ where: { userId } });
    return this.getMyCart(userId, "Cart cleared");
  },

  async getMyCart(userId: number, customMessage = "Cart fetched successfully") {
    const cartItems = await db.CartItem.findAll({
      where: { userId },
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["id", "name", "price"],
        },
      ],
    });

    const cart = cartItems.map((item) => ({
      productId: item.productId,
      name: item.product?.name || "",
      price: item.product?.price || 0,
      quantity: item.quantity,
      totalPrice: (item.product?.price || 0) * item.quantity,
    }));

    const totalAmount = cart.reduce((acc, item) => acc + item.totalPrice, 0);

    return {
      success: true,
      message: customMessage,
      cart,
      totalAmount,
    };
  },
};
