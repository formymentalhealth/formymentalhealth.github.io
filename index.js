const listInput = document.querySelector('#list');
const cleanListButton = document.querySelector('#clean-list');


cleanListButton.addEventListener('click', () => {
    listInput.value = correct(listInput.value);
    listInput.focus();
    listInput.select();
    document.execCommand('copy');
}, false);
