import axios from "axios";

export const startFreeTrial = async (licenseId: string) => {
  const token = localStorage.getItem("accessToken"); 

  return axios.post(
    "/api/license/start-free-trial",
    { licenseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
