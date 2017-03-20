class MoodsController < ApplicationController
  # GET /moods
  # GET /moods.json
  def index
    days = params.fetch(:days, 7).to_i
    @moods = Mood.where('user_id = ? AND created_at > ?',
                        current_user, (DateTime.now - days)).order('created_at')

    formatted_moods = @moods.map { |mood| format_mood mood }

    render json: formatted_moods
  end

  # GET /moods/1
  # GET /moods/1.json
  def show
    @mood = format_mood(set_mood)
    render json: @mood
  end

  # POST /moods
  # POST /moods.json
  def create
    max_mood = mood_list(current_user).length
    params['user_id'] = current_user.id
    params['mood'] = max_mood if params['mood'] > max_mood
    @mood = Mood.new(mood_params)

    if @mood.save
      render json: { status: :created, location: format_mood(@mood) }
    else
      render json: @mood.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /moods/1
  # PATCH/PUT /moods/1.json
  def update
    set_mood
    max_mood = mood_list(current_user).length
    params['mood'] = max_mood if params['mood'] > max_mood

    if @mood.update(mood_params)
      render json: { status: :ok, location: format_mood(@mood) }
    else
      render json: @mood.errors, status: :unprocessable_entity
    end
  end

  # DELETE /moods/1
  # DELETE /moods/1.json
  def destroy
    set_mood
    @mood.destroy
  end

  private

  def format_mood(mood)
    {
      id: mood.id,
      mood: mood.mood,
      reason: mood.reason,
      day: get_day(mood.created_at),
      time: get_time(mood.created_at)
    }
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_mood
    @mood = Mood.find_by_id(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def mood_params
    params.permit(:mood, :reason, :user_id)
  end
end
