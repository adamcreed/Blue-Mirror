class NotesController < ApplicationController
  # GET /notes
  # GET /notes.json
  def index
    page = params.fetch 'page', 1
    per = params.fetch 'per_page', 10
    @notes = Note.where('user_id = ?', current_user).order('created_at')
                 .page(page).per(per)
    formatted_notes = @notes.map { |note| format_note note }
    render json: formatted_notes
  end

  # GET /notes/1
  # GET /notes/1.json
  def show
    @note = format_mood set_note
    render json: @note
  end

  # POST /notes
  # POST /notes.json
  def create
    params['user_id'] = current_user.id
    @note = Note.new(note_params)

    if @note.save
      render json: { status: :created, location: format_note(@note) }
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  # PATCH/PUT /notes/1.json
  def update
    set_note
    if @note.update(note_params)
      render json: { status: :ok, location: format_note(@note) }
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    set_note
    @note.destroy
  end

  private

  def format_note(note)
    {
      id: note.id,
      title: note.title,
      text: note.text,
      tags: note.tags,
      day: get_day(note.created_at + Time.now.utc_offset),
      time: get_time(note.created_at + Time.now.utc_offset)
    }
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_note
    @note = Note.find_by_id(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def note_params
      params.permit(:title, :text, :tags, :user_id)
    end
end
