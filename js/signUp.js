createHeader('headerSignUp', undefined, 'login.html');

setMaxDate(document.getElementById('birthDate'));



const errorDiv = document.getElementById("error-messages");
const dniField = document.getElementById("dni");
const nameField = document.getElementById("name");
const surnameField = document.getElementById("surname");
const birthDateField = document.getElementById("birthDate");
const addressField = document.getElementById("address");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const photoField = document.getElementById("photo");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const submitButton = document.getElementById("submitImage");

dniField.addEventListener("blur", checkDNI);
nameField.addEventListener("blur", checkName);
surnameField.addEventListener("blur", checkSurname);
birthDateField.addEventListener("blur", checkBirthDate);
addressField.addEventListener("blur", checkAddress);
emailField.addEventListener("blur", checkEmail)
phoneField.addEventListener("blur", checkPhone);
photoField.addEventListener("change", checkPhoto);
usernameField.addEventListener("blur", checkUsername);
passwordField.addEventListener("blur", checkPassword);
submitButton.addEventListener("click", checkFormSignUp);

function checkFormSignUp(e){
    if(checkFormPerson(e) & checkFormUser(e)){
        sendAuthSignUpRequestAjax();
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}