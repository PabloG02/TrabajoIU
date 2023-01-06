"use strict";

if(getCookie('theme') === undefined){
    setCookie('theme', 'dark-mode');
}
const themeToggle = createThemeToggle(getCookie('theme'));

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    //Change button label
    if(document.body.className === 'light-mode'){
        setCookie('theme', 'light-mode');
        themeToggle.textContent = '🌙';
    } else {
        setCookie('theme', 'dark-mode');
        themeToggle.textContent = '☀️';
    }
});

function createThemeToggle(theme){
    let themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.id = 'themeToggle';
    if(theme === 'dark-mode'){
        themeToggle.innerText = '☀️';
    } else if (theme === 'light-mode'){
        themeToggle.innerText = '🌙';
    }

    document.body.className = theme;
    
    document.body.appendChild(themeToggle);
    return themeToggle; 
}