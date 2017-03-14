require "pry-byebug"

module Seed
  extend ActiveSupport::Concern

  module ClassMethods
    def seed_todos(user_id)
      # binding.pry

      File.readlines('db/data/todos.seed', quote_char: "\x00").each do |row|
        Todo.create(
          todo: row.strip,
          user_id: user_id
        )
      end
    end
  end
end
