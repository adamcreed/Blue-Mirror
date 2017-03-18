module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def featured_todos
    @todos = []
    File.readlines('db/data/todos.seed', quote_char: "\x00").each do |row|
      @todos << row.strip
    end
    @todos << Todo.where('featured = ?', true).pluck('todo')
    @todos.flatten.uniq
  end

  def mood_list
    %w(Terrible Bad Neutral Good Great)
  end
end
