"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerChangePassword', getCookie('user'), './menu.html');

const dniField = document.getElementById("dni");
const oldPasswordField = document.getElementById("oldPassword");
const newPasswordField = document.getElementById("newPassword");
dniField.addEventListener("blur", checkDNI);
oldPasswordField.addEventListener("blur", () => checkPasswordCustom('oldPassword'));
newPasswordField.addEventListener("blur", () => checkPasswordCustom('newPassword'));

let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    if(checkDNI() & checkPasswordCustom('oldPassword') & checkPasswordCustom('newPassword')){
        let oldPassword = oldPasswordField.value;
        // Check that the user is modifying its own password by checkin if the database has a record with the same DNI and username.
        customRequestAjaxPromise('usuario', 'SEARCH', `${dniField.name}=${dniField.value}&usuario=${getCookie('user')}`).then((res1) => {
            // If it exists, the array will not be empty.
            if(res1.resource.length > 0){
                // Check if the old password is valid
                customRequestAjaxPromise('AUTH', 'LOGIN', `usuario=${getCookie('user')}&contrasena=${hex_md5(oldPassword)}`).then((res2) => {
                    // If it is, change password.
                    if(res2.code === 'LOGIN_OK'){
                        sendAuthChangePasswordRequestAjax();
                    }    
                }).catch((res) => {
                    console.log(res.code);
                    addErrorMessage(res.code, 'request-error');
                });
            } else {
                addErrorMessage('error_dni&username_do_not_match', 'request-error');
            }
        })
        .catch((res) => {
			console.log(res.code);
            addErrorMessage(res.code, 'request-error');
		});
    }
});