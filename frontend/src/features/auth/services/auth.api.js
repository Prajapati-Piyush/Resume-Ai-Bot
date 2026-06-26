import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function register({ username, email, password }) {
    try {
        const { data } = await api.post("/register", {
            username,
            email,
            password,
        });

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const { data } = await api.post("/login", {
            email,
            password,
        });

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function logout() {
    try {
        const { data } = await api.get("/logout");

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getMe() {
    try {
        const { data } = await api.get("/get-me");

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}