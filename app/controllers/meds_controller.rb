class MedsController < ApplicationController
  # GET /meds
  # GET /meds.json
  def index
    @meds = Med.where('user_id = ?', current_user)

    render json: @meds
  end

  # GET /meds/1
  # GET /meds/1.json
  def show
    @med = set_med
    render json: @med
  end

  # POST /meds
  # POST /meds.json
  def create
    params['user_id'] = current_user.id if current_user
    @med = Med.new(med_params)

    if @med.save
      render json: { location: @med }, status: :created
    else
      render json: @med.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meds/1
  # PATCH/PUT /meds/1.json
  def update
    set_med
    if @med.update(med_params)
      render json: { status: :ok, location: @med }
    else
      render json: @med.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meds/1
  # DELETE /meds/1.json
  def destroy
    set_med
    @med.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_med
    @med = Med.find_by_id(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def med_params
      params.permit(:name, :user_id)
    end
end
