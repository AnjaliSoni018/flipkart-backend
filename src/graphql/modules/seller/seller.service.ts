import db from "../../../models";
const { User } = db;

export const sellerService = {
  async applyForSeller(userId: number, gstin: string) {
    const user = await User.findByPk(userId);

    if (!user) throw new Error("User not found");
    if (user.role === "SELLER") throw new Error("Already a seller");
    if (user.isApproved) throw new Error("Seller already approved");

    user.gstin = gstin;
    user.role = "SELLER";
    user.isApproved = false;
    await user.save();

    return {
      success: true,
      message: "Seller application submitted. Await admin approval.",
      user,
    };
  },
};
