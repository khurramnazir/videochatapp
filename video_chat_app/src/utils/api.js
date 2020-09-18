// Method 1 - axios request

import axios from "axios"

const instance = axios.create({baseURL: "https://opentdb.com"})

export const fetchTrivia = () => {
    return instance
        .get("/api.php?amount=1&type=boolean")
        .then((res) => {
        return res.data;
    });
};


// Method 2 - fetch request

// export const fetchRiddle = () => {
//     fetch("https://riddles.p.rapidapi.com/riddle/random", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "riddles.p.rapidapi.com",
//             "x-rapidapi-key": "494c5ca5fbmshe3a9caa4708d8adp15a465jsn0257e24da521"
//         }
//     })
//     .then(response => {
//         console.log(response, "<<<< response");
//     })
//     .catch(err => {
//         console.log(err, "<<<< error");
//     });
// }

// Method 3 - scraping

// let fetch = require('node-fetch');
// let JSSoup = require('jssoup').default;

// export const fetchRiddle = () => {
//     let pages = 5;
//     let page = (Math.floor(Math.random() * pages) + 1).toString();
//     console.log(page)

//     return fetch(`https://riddles.fyi/page/${page}`, {timeout: 10000})
//         .then(res => {
//             console.log(res)
//             res.text()})
//         .then(body => {
//           let soup = new JSSoup(body);
  
//           let posts = soup.findAll("article");
//           let post = posts[Math.floor(Math.random() * posts.length)]
          
//           soup = new JSSoup(post);
  
//           let question = soup.find("h2", "entry-title").text;
//           let answer = soup.find("div", "su-spoiler-content").text;

//           console.log(question, answer)
//           return { question, answer }
//         })
// }

// Method 4 - joke api

// export const fetchRiddle = () => {
//     fetch("https://dad-jokes.p.rapidapi.com/random/jokes", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
//             "x-rapidapi-key": "494c5ca5fbmshe3a9caa4708d8adp15a465jsn0257e24da521"
//         }
//     })
//     .then(response => {
//         console.log(response.body);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }