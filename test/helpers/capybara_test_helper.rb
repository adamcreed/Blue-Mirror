module CapybaraTestHelper
  def login(username:, password:)
    visit root_path
    click_button 'Sign in with Google'

    fill_in 'Email', with: username
    click_on 'next'

    fill_in 'Passwd', with: password
    click_on 'signIn'
    sleep 3
    click_on 'submit_approve_access'
  end
end
