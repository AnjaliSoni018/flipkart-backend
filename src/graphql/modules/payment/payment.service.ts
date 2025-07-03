// import db from "../../../models";
// import { razorpay } from "../../../config/razorpay";

// export const paymentService = {
//   async createRazorpayOrder(orderId: number) {
//     const order = await db.Order.findByPk(orderId);
//     if (!order) throw new Error("Order not found");

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(order.totalAmount * 100),
//       currency: "INR",
//       receipt: `order_${orderId}`,
//       payment_capture: 1,
//     });

//     await db.Payment.create({
//       orderId,
//       paymentMethod: "DIGITAL",
//       paymentStatus: "PENDING",
//       transactionId: razorpayOrder.id,
//     });

//     return {
//       success: true,
//       message: "Razorpay order created",
//       razorpayOrderId: razorpayOrder.id,
//       amount: order.totalAmount,
//       currency: "INR",
//     };
//   },

//   async updatePaymentStatus(paymentId: number, status: string) {
//     const payment = await db.Payment.findByPk(paymentId);
//     if (!payment) throw new Error("Payment not found");

//     payment.paymentStatus = status;
//     if (status === "SUCCESS") payment.paidAt = new Date();

//     await payment.save();

//     return {
//       success: true,
//       message: "Payment status updated",
//       payment,
//     };
//   },
// };
