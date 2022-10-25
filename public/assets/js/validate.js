// env variables (will move to backend)
const COLLECTION_ID = 'f286aee2-128a-4e99-a839-4e07d87550eb';

// get elements
const form = document.forms.registerForm;
const username = form.username;
const password1 = form.password1;
const password2 = form.password2;
const submit = form.submit;

// event listener submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrorMessage();
    checkInputs();
    checkSuccess();
})

// functions
function checkInputs() {
    // settings
    const minPasswordLength = 8;
    const minUsernameLength = 3;

    // trim
    const usernameValue = username.value.trim();
    const pw1Value = password1.value.trim();
    const pw2Value = password2.value.trim();

    // name check
    if(usernameValue.length < minUsernameLength) {
        let message = "Username must be at least " + minUsernameLength + " characters";
        setErrorFor(username, message);
    }
    else if(checkNameAvailability(usernameValue) != true) {
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
function checkNameAvailability(name) {
    // vars
    let userreq = new XMLHttpRequest();
    let uri = "https://online-lectures-cs.thi.de/chat/" + COLLECTION_ID + "/user/" + name;
    
    // request
    try { // synchronous
        userreq.open("GET", uri, false);
        userreq.send();
    }
    catch(e) {
        // swallow 404
    }
    finally {
        if (userreq.status == 204) { // already exists
            return false;
        }
        else if (userreq.status == 404) { // available
            return true;
        }
        else { // throw any other status to console
            console.log('error ' + userreq.status);
        }
    }
}