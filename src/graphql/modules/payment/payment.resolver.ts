// import { paymentService } from "./payment.service";
// import { authGuard } from "../../../middlewares/auth.guard";
// import { GraphQLContext } from "../../../types/context";

// export const paymentResolvers = {
//   Mutation: {
//     createRazorpayOrder: async (
//       _: unknown,
//       args: { orderId: number },
//       context: GraphQLContext
//     ) => {
//       authGuard(context);
//       return paymentService.createRazorpayOrder(args.orderId);
//     },

//     updatePaymentStatus: async (
//       _: unknown,
//       args: { paymentId: number; status: string },
//       context: GraphQLContext
//     ) => {
//       authGuard(context);
//       return paymentService.updatePaymentStatus(args.paymentId, args.status);
//     },
//   },
// };
