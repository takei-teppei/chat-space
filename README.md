## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|image|string|
|text|text|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|nickname|string|null: false|
|password|string|null: false|

### Association
- has_many   :messages
- has_many   :groups_users
- has_many   :groups,through: :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many   :messages
- has_many   :groups_users
- has_many   :users,through: :groups_users