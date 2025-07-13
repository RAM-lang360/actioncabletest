// app/javascript/channels/chat_room_channel.js
import consumer from "channels/consumer"

console.log("chat_room_channel.js がロードされました。"); // 追加

document.addEventListener('turbo:load', () => {
  console.log("turbo:load イベントが発火しました。"); // 追加

  const chatroomIdElement = document.getElementById('chat-room-id');

  if (chatroomIdElement) {
    const id = chatroomIdElement.dataset.chatroomId;
    console.log("ChatRoom ID を取得しました:", id); // 追加

    consumer.subscriptions.create({ channel: "ChatRoomChannel", room_id: id }, {
      connected() {
        console.log(`Connected to chat room ${id}!`); // 既存
      },

      disconnected() {
        console.log(`Disconnected from chat room ${id}!`); // 既存
      },

      received(data) {
        console.log("Received data:", data); // 既存
        const messagesDiv = document.getElementById('messages');
        if (messagesDiv) {
          messagesDiv.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
        }
      }
    });
  } else {
    console.log("id='chat-room-id' の要素が見つかりませんでした。"); // 追加
  }

  const messageForm = document.getElementById('new-message-form');
  if (messageForm) {
    console.log("メッセージフォームが見つかりました。"); // 追加
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageInput = document.getElementById('message-input');
      const message = messageInput.value;

      // consumer.subscriptions.subscriptions[0] が存在するか確認
      if (consumer.subscriptions.subscriptions.length > 0) {
        console.log("メッセージ送信: ", message); // 追加
        consumer.subscriptions.subscriptions[0].send({ message: message });
      } else {
        console.log("エラー: Action Cableのサブスクリプションが見つかりません。"); // 追加
      }
      messageInput.value = '';
    });
  } else {
    console.log("id='new-message-form' の要素が見つかりませんでした。"); // 追加
  }
});