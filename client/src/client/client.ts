import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const clientUser = axios.create({
    baseURL: "http://localhost:5000/api/user",
    headers: {
        "Content-Type": "application/json",
    },
});

export const clientAuth = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

export const clientTask = axios.create({
    baseURL: "http://localhost:5000/api/task",
    headers: {
        "Content-Type": "application/json",
    },
});