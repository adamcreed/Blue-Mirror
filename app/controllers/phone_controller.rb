class PhoneController < ApplicationController
    def update
      @user = User.find_by_id(current_user.id)

      if @user.update(phone_params)
        render json: { location: @user }
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    private

    def phone_params
      unless params[:phone].blank?
        params[:phone] = encrypt(params[:phone].gsub(/\D/, ''))
      end

      params.permit(:phone, :phone_provider, :sms_frequency, :user_id)
    end
end
