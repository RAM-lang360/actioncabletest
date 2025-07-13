class ChatRoom < ApplicationRecord
  has_many :messages, dependent: :destroy # 必要に応じて追加：チャットルームが削除されたら関連するメッセージも削除
end
