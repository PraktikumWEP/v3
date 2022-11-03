let COLLECTION_ID;
let TOM_TOKEN; // initialize empty for global scope
let JERRY_TOKEN;

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
    loadMessages(TOM_TOKEN);
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
        })
        .catch(err => {
            console.error(err);    
        });
        
    showMessages(messages);
}

function showMessages(messages) {
    for(let i = 0; i < messages.lenght; i++) {
        addMessage(messages[i]);
    }
}

function addMessage(msg) {
    let sender = msg.from;
    let content = msg.msg;
    let time = msg.time;
}