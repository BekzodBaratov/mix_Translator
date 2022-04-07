"use Strict";

const inpBig = document.querySelector(".inpBig");
const inpBig2 = document.querySelector(".inpBig2");
const selQues = document.querySelector("#selQues");
const selAns = document.querySelector("#selAns");
const textareaQues = document.querySelector(".textareaQues");
const textareaAns = document.querySelector(".textareaAns");

const options = {
  method: "GET",
  headers: {
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    "X-RapidAPI-Key": "df325b40b8msh325da01bafafc19p14a279jsn019357daa3be",
  },
};

fetch(
  "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
  options
)
  .then((response) => response.json())
  .then((response) => {
    for (let key of response.data.languages) {
      let html = `<option value="${key.language}">${key.language}</option>`;
      selQues.insertAdjacentHTML("afterbegin", html);
      selAns.insertAdjacentHTML("afterbegin", html);
    }
  });
document.querySelector(".btn").addEventListener("click", () => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", textareaQues.value);
  encodedParams.append("target", selAns.value);
  encodedParams.append("source", selQues.value);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      "X-RapidAPI-Key": "df325b40b8msh325da01bafafc19p14a279jsn019357daa3be",
    },
    body: encodedParams,
  };

  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      textareaAns.value = response.data.translations[0].translatedText;
    })
    .catch((err) => console.error(err));
});
