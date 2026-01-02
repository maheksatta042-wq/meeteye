import axios from "axios";

import API from "./AxiosInstance";

// ✅ FIXED: send amount + currency
export const createOrder = async (
  userId: string,
  licenseId: string,
  amount: number
) => {
  const res = await API.post(`/api/payment/create-order`, {
    userId,
    licenseId, // 🔑 backend expects this name
    amount,
    currency: "INR",
  });

  return res.data;
};

// Verify payment after Razorpay returns handler response
export const verifyPayment = async (details: any) => {
  const res = await API.post(`/api/payment/verify-payment`, details);
  return res.data;
};

export const getTransactionDetails = async (transactionId: string) => {
  const res = await API.get(`/api/payment/transaction/${transactionId}`);
  return res.data;
};