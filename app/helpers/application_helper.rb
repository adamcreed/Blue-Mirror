module ApplicationHelper
  include SMSEasyHelper

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def get_featured(file)
    items = []
    File.readlines(file, quote_char: "\x00").each do |row|
      items << row.strip
    end
    # items << Todo.where('featured = ?', true).pluck('todo')
    # @todos.flatten.uniq
  end

  def mood_list(user)
    if not user
      return default_list.to_json
    elsif not MoodList.find_by(user_id: user.id)
      create_mood_list user
    end

    list = MoodList.find_by(user_id: user.id).moods.split(',').map do |mood|
      { text: mood.strip }
    end

    list.to_json
  end

  def default_list
    %w(Terrible Bad Neutral Good Great).map { |mood| { text: mood } }
  end

  def create_mood_list(user)
    MoodList.create(
      user: user,
      moods: 'Terrible, Bad, Neutral, Good, Great'
    )
  end

  def get_day(datetime)
    datetime.rfc2822.gsub(/ \d{2}:\d{2}:\d{2} \+\d{4}$/, '')
  end

  def get_time(datetime)
    datetime.time.strftime('%l:%M %P')
  end
end
