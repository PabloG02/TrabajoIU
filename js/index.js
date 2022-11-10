document.addEventListener('DOMContentLoaded', () => {
    if(getCookie('user') === undefined){
        window.location.replace('./login.html');
    } else {
        window.location.replace('./menu.html');
    }
});