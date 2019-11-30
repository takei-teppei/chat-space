# @message
json.content @message.content
json.image @message.image
json.group_id @message.group_id
json.user_id @message.user_id
json.id @message.id
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.updated_at @message.updated_at
json.name @message.user.name