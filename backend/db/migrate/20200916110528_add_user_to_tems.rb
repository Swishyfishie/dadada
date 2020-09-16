class AddUserToTems < ActiveRecord::Migration[6.0]
  def change
    add_reference :tems, :user, null: false, foreign_key: true
  end
end
