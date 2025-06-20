const otpStore = new Map<string, number>();

export const generateOTP = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const setOTP = (phone: string, otp: number): void => {
  otpStore.set(phone, otp);
  setTimeout(() => otpStore.delete(phone), 5 * 60 * 1000); // expire in 5 mins
};

export const validateOTP = (phone: string, otp: number): boolean => {
  return otpStore.get(phone) === otp;
};
