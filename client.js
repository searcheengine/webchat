const socket = io('http://localhost:8080');

const from = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

const name = prompt("Enter your name to join");