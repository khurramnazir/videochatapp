import axios from "axios"

const instance = axios.create({baseURL: "https://opentdb.com"})

export const fetchTrivia = () => {
    return instance
        .get("/api.php?amount=1&type=boolean")
        .then((res) => {
        return res.data;
    });
};