module ApplicationHelper
  def featured_todos
    @todos = []
    File.readlines('db/data/todos.seed', quote_char: "\x00").each do |row|
      @todos << row.strip
    end
    @todos << Todo.where('featured = ?', true).pluck('todo')
    @todos.flatten.uniq
  end
end
