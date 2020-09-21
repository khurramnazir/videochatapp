import axios from "axios";

const instance = axios.create({
  baseURL: "https://opentdb.com",
});

export const fetchTrivia = () => {
  return instance.get("/api.php?amount=1&type=boolean").then((res) => {
    if (res.data.results[0].correct_answer === "True") {
      res.data.results[0].correct_answer = true;
      console.log("here");
    }
    if (res.data.results[0].correct_answer === "False") {
      res.data.results[0].correct_answer = false;
    }
    return res.data;
  });
};
