class MoodsController < ApplicationController
  # GET /moods
  # GET /moods.json
  def index
    @moods = Mood.where('user_id = ?', current_user).order('created_at')

    formatted_moods = @moods.map do |mood|
      format_mood mood
    end

    render json: formatted_moods
  end

  # GET /moods/1
  # GET /moods/1.json
  def show
    @mood = format_mood(Mood.find_by_id(params['id']))
    render json: @mood
  end

  # POST /moods
  # POST /moods.json
  def create
    params['user_id'] = current_user.id
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
    if @mood.update(mood_params)
      render json: { status: :ok, location: format_mood(@mood) }
    else
      render json: @mood.errors, status: :unprocessable_entity
    end
  end

  # DELETE /moods/1
  # DELETE /moods/1.json
  def destroy
    @mood.destroy
  end

  private

  def format_mood(mood)
    {
      id: mood.id,
      mood: mood.mood,
      reason: mood.reason,
      day: mood.created_at.rfc2822.gsub(/ \d{2}:\d{2}:\d{2} \+\d{4}$/, ''),
      time: mood.created_at.time.to_s(:time)
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
