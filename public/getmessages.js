"use strict";

function getMessages() {
    let messageRequest = new XMLHttpRequest();
    messageRequest.onreadystatechange = () => {
        if (messageRequest.readyState == 4 && messageRequest.status == 200) {
            let messages = JSON.parse(messageRequest.responseText);
            messages = messages.map((val, index, arr) => val.message);
            console.log(messages);

            let messageList = document.createElement("ul");
            for (let message of messages) {
                let messageListItem = document.createElement("li");
                messageListItem.textContent = message;
                messageList.appendChild(messageListItem);
            }

            let messagesDiv = document.getElementById("messages");
            removeAllChildren(messagesDiv);
            messagesDiv.appendChild(messageList);
        }
    }
    messageRequest.open("GET", "messages", true);
    messageRequest.send();  
}

function removeAllChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}
