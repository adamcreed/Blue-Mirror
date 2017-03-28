class SMSMessages
  include Delayed::RecurringJob
  run_every 1.day
  run_at '12:30pm'
  timezone 'US/Eastern'
  queue 'slow-jobs'
  def perform
    easy = SMSEasy::Client.new
    message = 'This is a looped scheduled task!'


    User.all.each do |user|
      if user.phone and user.phone_provider and user.sms_frequency == 'Daily'
        easy.deliver(decrypt(user.phone), user.phone_provider, message)
      end
    end
  end
end
