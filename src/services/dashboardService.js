
import Axios from "../utils/axiosConfig.js";

// Get dashboard statistics
export const getDashboardStats = async () => {
    const res = await Axios.get("/dashboard/stats");
    return res.data.stats;
};

// Get enquiry analytics
export const getEnquiryAnalytics = async (period = "7days") => {
    const res = await Axios.get(
        `/dashboard/enquiry-analytics?period=${period}`
    );

    return res.data.analytics;
};

// Get recent products and enquiries
export const getRecentActivities = async () => {
    const res = await Axios.get("/dashboard/recent-activities");
    return res.data;
};

export default {
    getDashboardStats,
    getEnquiryAnalytics,
    getRecentActivities,
};
