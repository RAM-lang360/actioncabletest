class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_#{params[:room_id]}" # 特定のチャットルームにストリーム
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # クライアントからメッセージを受け取り、保存してブロードキャスト
    message = Message.create!(content: data["message"], user_id: current_user.id)
    ActionCable.server.broadcast("chat_room_#{params[:room_id]}", message: message.content, user: message.user.name)
  end
end
