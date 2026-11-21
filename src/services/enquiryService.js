
import Axios from "../utils/axiosConfig.js";

// Get all enquiries
export const getEnquiries = async () => {
    const res = await Axios.get("/enquiries");
    return res.data.enquiry;
};

export default {
    getEnquiries,
};
