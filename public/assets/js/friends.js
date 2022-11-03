// get data from config
let COLLECTION_ID; // initialize empty for global scope
let TOM_TOKEN;
await fetch('./cfg.json')
    .then(response => response.json()) // get object from response
    .then(data => {
        COLLECTION_ID = data.COLLECTION_ID; // get ID
        TOM_TOKEN = data.tom.token;
    })
    .catch(err => { 
        console.error(err);
    });

async function getFriends() {
    let uri = "https://online-lectures-cs.thi.de/chat/" + COLLECTION_ID + "/user";
    let response = await fetch(uri, {
        headers: {
            'Authorization': "Bearer " + TOM_TOKEN
        }
    });
    if(response.ok) {
        let result = await response.json();
        return result;
    }
    else {
        console.error('error ' + response.status);
        return
    }
}

let list = document.getElementsByClassName("suggested-friends")[0];
let input = document.getElementsByClassName("input")[0];
let card = document.getElementsByClassName("card")[0];

async function refreshList() {
    let friends = await getFriends();
    let value = input.value;
    let filter = friends.filter(friend => {
        if(input.value.length > 0) {
            if(friend.includes(value)) {
                return friend;
            }
        }
    })

    if(filter.length > 0) {
        list.style.display = "block";
        let new_list = document.createElement("div");

        filter.forEach(friend => {
            let element = document.createElement("div");
            element.classList.add("mElement");
            element.classList.add("suggested-friends-entry"); 

            element.innerHTML = friend;
            new_list.appendChild(element);
        });
    
        list.innerHTML = new_list.innerHTML;
    }
    else {
        list.style.display = "none";
        list.innerHTML = "";
    }
}

input.addEventListener("input", (e) => {
    refreshList(e);
})

await getFriends();