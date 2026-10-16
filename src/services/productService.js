import Axios from "../utils/axiosConfig.js"

// Get all products
export const getProducts = async () => {
    const res = await Axios.get('/products');
    const data = res.data;

    return data.products;
}

export default {
    getProducts
}