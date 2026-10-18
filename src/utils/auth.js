const TOKEN_KEY = "token";

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isTokenValid = () => {
    const token = getToken();

    if (!token) return false;

    try {
        const payload = token.split(".")[1];

        if (!payload) return false;

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const decoded = JSON.parse(
            atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))
        );

        // JWT exp is measured in seconds.
        if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
            localStorage.removeItem(TOKEN_KEY);
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem(TOKEN_KEY);
        return false;
    }
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
};