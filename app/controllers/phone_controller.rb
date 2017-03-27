def update
  @user = User.find_by_id(current_user.id)

  if @user.update(phone_params)
    render json: { location: @user }
  else
    render json: @user.errors, status: :unprocessable_entity
  end
end

def phone_params
  params[:phone] = encrypt(params[:phone].gsub(/\D/, ''))
  params.permit(:phone, :phone_provider, :sms_frequency, :user_id)
end
