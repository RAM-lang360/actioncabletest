class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_#{params[:room_id]}" # 特定のチャットルームにストリーム
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # クライアントからメッセージを受け取り、保存してブロードキャスト
    puts data["message"] # デバッグ用に受け取ったメッセージを出力
    message = Message.new(content: data["message"], user_id: 1, chat_room_id: 1)
    if message.save!
      ActionCable.server.broadcast("chat_room_#{params[:room_id]}", message: message.content)
    else
      puts "メッセージの保存に失敗しました: #{message.errors.full_messages.join(', ')}"
    end
  end
end
