// get Elems
const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const submit = document.getElementById('submit');

// wait for submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
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
    if(usernameValue.length() < minUsernameLength) {
        let message = "Username must be at least " + minUsernameLength + " characters";
        setErrorFor(username, message);
    }
    else {
        setSuccessFor(username);
    }

    // password check
    if(pw1Value.length() < minPasswordLength) {
        let message = "Password must be at least " + minPasswordLength + " characters";
        setErrorFor(password1, message);
    }
    else {
        setSuccessFor(password1);
    }

    // password repeat check
    if(!pw1Value === pw2Value) {
        let message = "Passwords do not match";
        setErrorFor(password2, message);
    }
    else {
        setSuccessFor(password2);
    }
}

function setErrorFor(input, message) {
    // WIP
}