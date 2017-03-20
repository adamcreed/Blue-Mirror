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

  def mood_list(user)
    if not user
      return %w(Terrible Bad Neutral Good Great)
    elsif not MoodList.find_by(user_id: user.id)
      MoodList.create(
        user: user,
        moods: 'Terrible, Bad, Neutral, Good, Great'
      )
    end
    MoodList.find_by(user_id: user.id).moods.split(',').map &:strip
  end

  def get_day(datetime)
    datetime.rfc2822.gsub(/ \d{2}:\d{2}:\d{2} \+\d{4}$/, '')
  end

  def get_time(datetime)
    datetime.time.to_s(:time)
  end
end
