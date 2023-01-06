createHeader('headerRecoverPassword', undefined, './login.html');

const dniField = document.getElementById("dni");
const passwordField = document.getElementById("password");
dniField.addEventListener("blur", checkDNI);
passwordField.addEventListener("blur", checkPassword);

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    if(checkDNI() & checkPassword())
        sendAuthChangePasswordRequestAjax();
});