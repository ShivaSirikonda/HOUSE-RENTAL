const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message,className) =>{
    // created a chat <Li> with passaed message and className 
    const chatLi = document.createElement("Li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="chat material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponce = (incomingChatLi) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p"); 
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{role:"user",content : userMessage}] 
        })
    }

    // sent request to api and get responce
    fetch(API_URL,requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
    }).catch((error) =>{
        console.log(error);
    })
}

const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Appended the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(()=>{
        // lets Display "Thinking...0" message while waiting for the responce
        const incomingChatLi = createChatLi("Thinking...","incoming");
        chatbox.appendChild(incomingChatLi);
        generateResponce(incomingChatLi);
    },600);
}

sendChatbtn.addEventListener("click",handleChat);

