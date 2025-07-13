# app/controllers/chat_rooms_controller.rb
class ChatRoomsController < ApplicationController
  def show
    @chat_room = ChatRoom.find(params[:id]) # ChatRoomモデルが別途必要
    @messages = @chat_room.messages.includes(:user).order(created_at: :asc)
  end
end
