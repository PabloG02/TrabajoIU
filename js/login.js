createHeader('headerLogin');

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
usernameField.addEventListener("blur", checkUsername);
passwordField.addEventListener("blur", checkPassword);

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    if(checkUsername() & checkPassword())
        sendAuthLoginRequestAjax();
});