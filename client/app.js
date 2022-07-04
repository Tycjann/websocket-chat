// Page elements
// ? Greg: Czy nie lepiej tu użyć getElementById? Będzie różnica wydajnościowa?
const loginForm = document.querySelector("#welcome-form");
const messagesSection = document.querySelector("#messages-section");
const messagesList = document.querySelector("#messages-list");
const addMessageForm = document.querySelector("#add-messages-form");
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector("#message-content");

// Global 
let userName = '';