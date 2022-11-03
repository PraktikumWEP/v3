let COLLECTION_ID;
let TOM_TOKEN; // initialize empty for global scope
let JERRY_TOKEN;
const chat = document.getElementById("chat"); // global
console.log("Im loaded");

// fetch config data
await fetch('./cfg.json')
.then(response => response.json()) // get object from response
.then(data => {
    COLLECTION_ID = data.COLLECTION_ID;
    TOM_TOKEN = data.tom.token;
    JERRY_TOKEN = data.jerry.token;
})
.catch(err => { 
    console.error(err);
});

// initial load
loadMessages();

// refresh
window.setInterval(e => {
    loadMessages(JERRY_TOKEN);
}, 1000);

function loadMessages(token) {
    // vars for request
    let uri = "https://online-lectures-cs.thi.de/chat/" + COLLECTION_ID + "/message/" + token;

    // vars for data
    let messages = [];
    
    // request
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            messages = data;
            showMessages(messages);
        })
        .catch(err => {
            console.error(err);    
        });
    console.log(messages);
}

function showMessages(messages) {
    for(let i = 0; i < messages.lenght; i++) {
        addMessage(messages[i]);
    }
}

function addMessage(msg) {
    // get data from msg
    let sender = msg.from;
    let content = msg.msg;
    let time = msg.time;
    // create Elements for new Chat Message
    let chat_message = document.createElement("div");
    let chat_helper_div = document.createElement("div");
    let chat_message_user = document.createElement("span");
    let chat_message_text = document.createElement("span");
    let time_div = document.createElement("div");
    // add CSS classes
    chat_message.className = "chat-message mElement";
    chat_helper_div.className = "chat-helper-div";
    chat_message_user.className = "chat-message-user";
    chat_message_text.className = "chat-message-text";
    time_div.className = "time chat-helper-div";
    // structure
    chat.appendChild(chat_helper_div);
    chat.appendChild(time_div);
    chat_helper_div.appendChild(chat_message_user);
    chat_helper_div.appendChild(chat_message_text);
    // inner HTML
    time_div.innerHTML = time;
    chat_message_user.innerHTML = sender;
    chat_message_text.innerHTML = content;
}