class EventsController < ApplicationController
  include ApplicationHelper
  # GET /events
  # GET /events.json
  def index
    @events = Event.where('user_id = ?', current_user)
    render json: @events
  end

  # GET /events/1
  # GET /events/1.json
  def show
    @event = Event.find_by_id(params['id'])
    render json: @event
  end

  # POST /events
  # POST /events.json
  def create
    params['user_id'] = current_user.id
    @event = Event.new(event_params)

    if @event.save
      render json: { status: :created, location: @event }
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    set_event
    if @event.update(event_params)
      render json: { status: :ok, location: format_event(@event) }
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    set_event
    @event.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.permit(:title, :date, :frequency, :completed, :user_id)
  end
end
