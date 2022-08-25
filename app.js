const socket = io('http://localhost:3000')

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

function disableButton(button) {
    button.disabled = true;
    let question;
    if(button == button1){
        question = 'q1';
    }else if(button == button2){
        question = 'q2';
    }else {
        question = 'q3';
    }
    let data = document.querySelector(`input[name='${question}']:checked`).value;
    socket.emit('voted', data);
}

socket.on('updateVote', function(vote) {
    for(let i = 0; i < vote.length; i++) {
        document.getElementById(`${i}`).innerHTML = vote[i];
    }
})