class NotesController < ApplicationController
  include ApplicationHelper
  # GET /notes
  # GET /notes.json
  def index
    @notes = Note.where('user_id = ?', current_user).order('created_at')
    render json: @notes
  end

  # GET /notes/1
  # GET /notes/1.json
  def show
    set_note
    render json: @note
  end

  # POST /notes
  # POST /notes.json
  def create
    params['user_id'] = current_user.id
    @note = Note.new(note_params)

    if @note.save
      render json: { status: :created, location: @note }
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

  # Use callbacks to share common setup or constraints between actions.
  def set_note
    @note = Note.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def note_params
      params.permit(:title, :text, :tags, :user_id)
    end
end
