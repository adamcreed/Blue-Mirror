require 'test_helper'
require_relative '../helpers/capybara_test_helper'

class CapybaraTest < ActionDispatch::IntegrationTest
  include Capybara::Screenshot::MiniTestPlugin
  include CapybaraTestHelper

  test 'should get login' do
    visit root_path
    assert page.has_css? '.login'
  end

  test 'should log in' do
    login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
    assert page.has_content? 'Blue Mirror'
  end

  # test 'should customize mood' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #
  #   assert page.has_css? 'option[label="Neutral"]'
  #
  #   click_on 'Customize your moods'
  #   find(:css, 'ul:nth-child(3)').set('Okay')
  #   click_button 'Submit'
  #
  #   assert page.has_css? 'option[label="Okay"]'
  #
  #   click_on 'Customize your moods'
  #   find(:css, 'li + li + li').set('Neutral')
  #   # fill_in 'li + li + li', with: 'Neutral'
  #   click_button 'Submit'
  #
  #   assert page.has_css? 'option[label="Neutral"]'
  #   assert page.has_content? '<option label="Neutral" value="number:3">Neutral</option>'
  # end
end
