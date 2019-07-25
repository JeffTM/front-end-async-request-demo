"use strict";

function getMessages() {
    let messagePromise = fetch("messages");
    messagePromise
        .then(response => response.json()) //Need to handle HTTP errors as they don't result in a rejection
        .then(jsonArray => jsonArray.map(x => x.message))
        .then(displayMessages)
        .catch(error => displayMessageLoadError());
}

function displayMessages(messages) {
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

function displayMessageLoadError() {
    document.getElementById("messages").textContent = "Failed to load messages";
}

function removeAllChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}
