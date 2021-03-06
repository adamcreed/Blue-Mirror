module CapybaraTestHelper
  def login(username:, password:)
    visit root_path
    return if page.has_css? '.fa-sign-out'

    click_button 'Sign in with Google'
    return unless page.has_css? '#Email'

    fill_in 'Email', with: username
    click_on 'next'

    fill_in 'Passwd', with: password
    click_on 'signIn'
    sleep 3
    click_on 'submit_approve_access'
  end

  def scroll_to(element)
    script = <<-JS
      arguments[0].scrollIntoView(false);
    JS
    Capybara.current_session.driver.browser.execute_script(script, element.native)
  end
end
