import consumer from "./consumer"

document.addEventListener('turbo:load', () => {
  const chatroomId = document.getElementById('chat-room-id'); // HTMLからルームIDを取得

  if (chatroomId) {
    const id = chatroomId.dataset.chatroomId;

    consumer.subscriptions.create({ channel: "ChatRoomChannel", room_id: id }, {
      connected() {
        console.log(`Connected to chat room ${id}`);
      },

      disconnected() {
        console.log(`Disconnected from chat room ${id}`);
      },

      received(data) {
        const messagesDiv = document.getElementById('messages');
        if (messagesDiv) {
          messagesDiv.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
        }
      }
    });
  }

  // メッセージ送信フォームの例
  const messageForm = document.getElementById('new-message-form');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value;

      // サーバーにメッセージを送信 (receiveメソッドを呼び出す)
      consumer.subscriptions.subscriptions[0].send({ message: message }); // 購読している最初のチャネルに送信
      messageInput.value = '';
    });
  }
});