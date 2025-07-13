# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room # これを追加
  after_create_commit { broadcast_message }

  private

  def broadcast_message
    ActionCable.server.broadcast(
      "chat_room_#{self.chat_room_id}", # chat_room_id を使用して特定のチャットルームにブロードキャスト
      {
        message: self.content,
        user: self.user.name
      }
    )
  end
end
