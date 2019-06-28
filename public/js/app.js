const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');
const message_1 = document.getElementById('message-1');
const message_2 = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    message_1.textContent = "Loading...";
    message_2.textContent = "";
    e.preventDefault();
    const location = searchText.value;
    
    fetch(`/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            message_1.textContent = data.error;
        } else {
            message_1.textContent = data.location;
            message_2.textContent = data.forecast;
        }    
    })
})