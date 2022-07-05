// Page elements
// ? Greg: Czy nie lepiej tu użyć getElementById? Będzie różnica wydajnościowa?
const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

// Global 
const socket = io();
let userName = '';

// WebSocket - application listener
// 0. socket('event-name', func-to-call)
// 1. socket.on('message', addMessage);
// 2. socket.on('message', (event) => addMessage(event.author, event.content));
socket.on('message', ({ author, content }) => addMessage(author, content));

// Login
const login = (e) => {
  e.preventDefault();
  const userNameValue = userNameInput.value;

  if (!userNameValue.length) {
    alert('Error: Empty login!');
  }
  else {
    socket.emit('join', userNameValue);
    userName = userNameValue;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

// Messages
const sendMessage = (e) => {
  e.preventDefault();
  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('Error: You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    //  WebSocket - emitter
    // 0 - socket.emit('event-name', possible-data);
    socket.emit('message', { author: userName, content: messageContent });
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
};

// Listener
loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);