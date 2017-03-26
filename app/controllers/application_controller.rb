# :nodoc
class ApplicationController < ActionController::Base
  include ApplicationHelper

  def cipher
    OpenSSL::Cipher::Cipher.new('aes-256-cbc')  # ('aes-256-cbc')
  end

  def decrypt(value)
    c = cipher.decrypt
    c.key = Digest::SHA256.digest(ENV['PHONE_SALT'])
    c.update(Base64.decode64(value.to_s)) + c.final
  end

  def encrypt(value)
    c = cipher.encrypt
    c.key = Digest::SHA256.digest(ENV['PHONE_SALT'])
    Base64.encode64(c.update(value.to_s) + c.final)
  end
end
