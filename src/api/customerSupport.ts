import AxiosInstance from "./AxiosInstance";

// ✅ FIX: Updated type to match what frontend actually sends
export const createCustomerSupport = async (payload: {
  fullName: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  inquiryType: string;
  message: string;
  source: {
    product: "CALLIFO" | "WORKEYE" | "TALLY" | "MEETHUB" | "GEOTRACK" | "OTHER"; // Changed to uppercase
     website?: string;  // ✅ ADD THIS
    page?: string;  
  };
}) => {
  const response = await AxiosInstance.post(
    "api/customer-support",
    payload
  );
  return response.data;
};