import Axios from "../utils/axiosConfig.js";

// Get all products
export const getProducts = async () => {
    const res = await Axios.get("/products");
    return res.data.products;
};

// Get product by ID
export const getProductById = async (id) => {
    const res = await Axios.get(`/products/${id}`);
    return res.data.product;
};

// Update product
export const updateProduct = async ({ id, formData, images }) => {
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("material", formData.material);
    payload.append("flair", formData.flair);
    payload.append("blouse", formData.blouse);
    payload.append("dupatta", formData.dupatta);
    payload.append("featured", String(formData.featured));
    payload.append("bestseller", String(formData.bestseller));
    payload.append("active", String(formData.active));

    formData.features.forEach((feature) => {
        payload.append("features", feature);
    });

    images.forEach((image) => {
        payload.append("images", image);
    });

    const res = await Axios.patch(
        `/products/update-product/${id}`,
        payload
    );

    return res.data;
};

// Add product
export const addProduct = async ({ formData, images }) => {
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("material", formData.material);
    payload.append("flair", formData.flair);
    payload.append("blouse", formData.blouse);
    payload.append("dupatta", formData.dupatta);
    payload.append("featured", String(formData.featured));
    payload.append("bestseller", String(formData.bestseller));
    payload.append("active", String(formData.active));

    formData.features.forEach((feature) => {
        payload.append("features", feature);
    });

    images.forEach((image) => {
        payload.append("images", image);
    });

    const res = await Axios.post("/products/add-product", payload);
    return res.data;
};

export default {
    getProducts,
    getProductById,
    updateProduct,
    addProduct
};
