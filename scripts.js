
// Hero section
document.addEventListener("DOMContentLoaded", function () {
    const talkButton = document.getElementById("talk-button");
    const hireButton = document.getElementById("hire-button");
    const amaButton = document.getElementById("ama-button");
    const textContainer = document.getElementById("text-container");
    const chatSection = document.getElementById("chat-section");

    // Hide the chat section initially
    chatSection.style.display = "none";

    talkButton.addEventListener("click", function () {
        // Show the chat section and hide the text and "Hire Me" button
        chatSection.style.display = "block";
        textContainer.style.display = "none";
        hireButton.style.display = "none";
    });

    amaButton.addEventListener("click", function () {
        // Show the chat section and hide only the text
        chatSection.style.display = "block";
        textContainer.style.display = "none";
    });
});

// Bot script
document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatLog = document.getElementById("chat-log");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Initialize a conversation
    let conversation = [];

    // Replace 'YOUR_OPENAI_API_KEY' with your actual API key
    const apiKey = 'xxxx';
    
    sendButton.addEventListener("click", sendMessage);

function sendMessage() {
    const message = userInput.value;
    if (message.trim() === "") return;

    // Add user message to conversation
    conversation.push({ role: "user", content: message });
    renderMessages();

    // Clear user input
    userInput.value = "";

    // Call the OpenAI API
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: conversation
        })
    })
    .then(response => response.json())
    .then(data => {
        // Add AI reply to conversation
        const aiReply = data.choices[0].message.content;
        conversation.push({ role: "assistant", content: aiReply });
        renderMessages();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

    function renderMessages() {
        chatLog.innerHTML = conversation
            .map(msg => `<div class="message ${msg.role}">${msg.content}</div>`)
            .join("");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});

// Get the interactive buttons and the chat elements
const amaButton = document.getElementById('ama-button');
const ozgurButton = document.getElementById('ozgur-button');
const introText = document.getElementById('intro-text');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Event listener for the AMA button
amaButton.addEventListener('click', () => {
    // Display the AMA text
    introText.textContent = "That's a good choice! I use ChatGPT to talk, so you can ask me anything. I got you!";
    
    // Hide the buttons
    amaButton.style.display = 'none';
    ozgurButton.style.display = 'none';

    // Show the chat box
    chatBox.style.display = 'block';

    // Initialize the chat conversation
    addBotMessage("Hello! How can I help you?");
});


// Function to add a message from the bot to the chat
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}

// Function to add a message from the user to the chat
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}
// Function to add a message to the chat
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Event listener for the AMA button
amaButton.addEventListener('click', () => {
    // Display the chat box
    chatBox.style.display = 'block';
    
    // Hide the buttons
    amaButton.style.display = 'none';
    ozgurButton.style.display = 'none';

    // Show initial bot message
    addMessage("OzJr", "Hello! How can I assist you?");
});

// Event listener for sending user messages
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        // Display the user's message before simulating bot response
        addUserMessage(userMessage);
        // Simulate bot response
        simulateBotResponse(userMessage);
        userInput.value = ""; // Clear input
    }
});


// Simulate bot response based on user message
function simulateBotResponse(userMessage) {
    // You should remove the old simulateBotResponse function and replace it with this one
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: conversation
        })
    })
    .then(response => response.json())
    .then(data => {
        // Add user's message to conversation
        conversation.push({ role: "user", content: userMessage });
        renderMessages();
        
        // Add AI reply to conversation
        const aiReply = data.choices[0].message.content;
        conversation.push({ role: "assistant", content: aiReply });
        renderMessages();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Function to render messages in the chat log
function renderMessages() {
    chatLog.innerHTML = conversation
        .map(msg => `<div class="message ${msg.role}-message">${msg.content}</div>`)
        .join("");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
