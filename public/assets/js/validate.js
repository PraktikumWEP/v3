// get data from config
let COLLECTION_ID; // initialize empty for global scope
fetch('./cfg.json')
.then(response => response.json()) // get object from response
.then(data => {
    COLLECTION_ID = data.COLLECTION_ID; // get ID
})
.catch(err => { 
    console.error(err);
});
    
// get elements
const form = document.forms.registerForm;
const username = form.username;
const password1 = form.password1;
const password2 = form.password2;
const submit = form.submit;

// settings
const minPasswordLength = 8;
const minUsernameLength = 3;

// event listener submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrorMessage();
    checkInputs();
    checkSuccess();
});

// functions
async function checkInputs() {

    // trim
    const usernameValue = username.value.trim();
    const pw1Value = password1.value.trim();
    const pw2Value = password2.value.trim();

    // name check
    if(usernameValue.length < minUsernameLength) {
        let message = "Username must be at least " + minUsernameLength + " characters";
        setErrorFor(username, message);
    }
    else if(!(await checkNameAvailability(usernameValue))) {
        let message = "Username " + usernameValue + " is already taken";
        setErrorFor(username, message);
    }
    else {
        setSuccessFor(username);
    }

    // password check
    if(pw1Value.length < minPasswordLength) {
        let message = "Password must be at least " + minPasswordLength + " characters";
        setErrorFor(password1, message);
    }
    else {
        setSuccessFor(password1);
    }

    // password repeat check
    if(pw1Value.length < minPasswordLength) {
        let message = "";
        setErrorFor(password2, message);
    }
    else if(pw1Value !== pw2Value) {
        let message = "Passwords do not match";
        setErrorFor(password2, message);
    }
    else {
        setSuccessFor(password2);
    }
}

function setErrorFor(input, message) {
    setErrorMessage(input, message);
    input.className = 'input input-error';
}

function setErrorMessage(input, message) {
    const formSection = input.parentElement.parentElement;
    const small = formSection.querySelector('div.hasSmall').querySelector('small');
    small.innerText = message; // set error message
}

function setSuccessFor(input) {
    input.className = 'input input-success';
}

function checkSuccess() {
    // guard clauses
    if(!username.classList.contains('input-success')) {
        return;
    }
    if(!password1.classList.contains('input-success')) {
        return;
    }
    if(!password2.classList.contains('input-success')) {
        return;
    }
    // submit
    form.submit();
}

function resetErrorMessage() {
    setErrorMessage(username, '');
    setErrorMessage(password1, '');
    setErrorMessage(password2, '');
}

// AJAX
async function checkNameAvailability(name) {
    let uri = "https://online-lectures-cs.thi.de/chat/" + COLLECTION_ID + "/user/" + name;
    let response = await fetch(uri);

    if (response.status == 204) { // already exists
        return false;
    }
    else if (response.status == 404) { // available
        return true;
    }
    else {
        console.error('error ' + response.status);
        return false;
    }
}