const textInput = document.getElementById('textInput');
const botonsend = document.getElementById('btnsend');
const chat = document.getElementById('contenidochat');

let context = {};
/*
const templateChatMessage = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;*/
const templateChatMessage = (message, from, img) => `<li class="${from}">
      <img src="http://emilcarlsson.se/assets/${img}" alt="">
      <p>${message}</p>
    </li>`;

// Crate a Element and append to chat
const InsertTemplateInTheChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  chat.appendChild(div);
};

// Calling server and get the watson output
const getWatsonMessageAndInsertTemplate = async (text = '') => {
  const uri = 'http://localhost:3000/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.context;

  var watson = {
      css : 'replies',
      img : 'harveyspecter.png'
  }

  const template = templateChatMessage(response.output.text, watson.css, watson.img);

  InsertTemplateInTheChat(template);
};


botonsend.addEventListener('click', (event) => {
  getWatsonMessageAndInsertTemplate(textInput.value);

  var usuario = {
      css : 'sent',
      img : 'mikeross.png'
  }

  const template = templateChatMessage(textInput.value, usuario.css, usuario.img);
  InsertTemplateInTheChat(template);

  // Clear input box for further messages
  textInput.value = '';
});

textInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && textInput.value) {
    // Send the user message
    getWatsonMessageAndInsertTemplate(textInput.value);

    var usuario = {
        css : 'sent',
        img : 'mikeross.png'
    }

    const template = templateChatMessage(textInput.value, usuario.css, usuario.img);
    InsertTemplateInTheChat(template);

    // Clear input box for further messages
    textInput.value = '';
  }
});


getWatsonMessageAndInsertTemplate();
