import db from "../../../models";

export const orderService = {
  async getMyOrders(userId: number) {
    const orders = await db.Order.findAll({
      where: { userId },
      order: [["placedAt", "DESC"]],
    });

    return {
      success: true,
      message: "Orders fetched successfully",
      orders,
    };
  },

  async getOrderDetails(userId: number, orderId: number) {
    const order = await db.Order.findOne({
      where: { id: orderId, userId },
    });
    if (!order) throw new Error("Order not found");

    const items = await db.OrderItem.findAll({ where: { orderId } });
    const payment = await db.Payment.findOne({ where: { orderId } });

    return {
      success: true,
      message: "Order details fetched",
      order,
      items,
      payment,
    };
  },

  async placeOrder(userId: number, addressId: number) {
    const cartItems = await db.CartItem.findAll({ where: { userId } });

    if (!cartItems.length) throw new Error("Cart is empty");
    const productIds = cartItems.map((item) => item.productId);

    const products = await db.Product.findAll({
      where: { id: productIds },
    });

    const productMap = new Map();
    products.forEach((p) => productMap.set(p.id, p.price));

    const totalAmount = cartItems.reduce((sum, item) => {
      const price = productMap.get(item.productId) || 0;
      return sum + item.quantity * price;
    }, 0);

    const transaction = await db.sequelize.transaction();

    try {
      const order = await db.Order.create(
        {
          userId,
          addressId,
          totalAmount,
          status: "PENDING",
          placedAt: new Date(),
        },
        { transaction }
      );

      for (const item of cartItems) {
        const price = productMap.get(item.productId) || 0;

        await db.OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtOrder: price,
          },
          { transaction }
        );
      }

      await db.CartItem.destroy({ where: { userId }, transaction });

      await transaction.commit();

      return {
        success: true,
        message: "Order placed successfully",
        order,
      };
    } catch {
      await transaction.rollback();
      throw new Error("Order placement failed");
    }
  },

  async cancelOrder(userId: number, orderId: number) {
    const order = await db.Order.findOne({
      where: { id: orderId, userId },
    });
    if (!order) throw new Error("Order not found");

    if (order.status === "CANCELLED")
      throw new Error("Order already cancelled");

    order.status = "CANCELLED";
    await order.save();

    return {
      success: true,
      message: "Order cancelled",
      order,
    };
  },
};
