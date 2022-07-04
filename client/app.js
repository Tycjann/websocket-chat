// Page elements
// ? Greg: Czy nie lepiej tu użyć getElementById? Będzie różnica wydajnościowa?
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// Global 
let userName = '';

// Login
const login = (e) => {
  e.preventDefault();

  if (!userNameInput.value) {
    alert('Error: Empty login!');
  }
  else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const sendMessage = (e) => {
  e.preventDefault();

  if (!messageContentInput.value) {
    alert('Error: No message!');
  }
  else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {

  let authorName = author;
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
    authorName = 'You';
  }

  message.innerHTML = ` <h1 class="message__author">${authorName}</h1>
                        <div class="message__content">${content}</div>
                      `;

  messagesList.appendChild(message);

  // console.log('author:', author);
  // console.log('content:', content);
};

// Listener
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);