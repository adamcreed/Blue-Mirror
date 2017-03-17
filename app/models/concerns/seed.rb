include ApplicationHelper

module Seed
  extend ActiveSupport::Concern

  module ClassMethods
    def seed_todos(user_id)
      featured_todos.sample(5).each do |row|
        Todo.create(
          todo: row.strip,
          user_id: user_id
        )
      end
    end
  end
end
