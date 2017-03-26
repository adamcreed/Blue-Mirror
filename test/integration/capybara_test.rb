require 'test_helper'
require_relative '../helpers/capybara_test_helper'

class CapybaraTest < ActionDispatch::IntegrationTest
  include Capybara::Screenshot::MiniTestPlugin
  include CapybaraTestHelper

  # test 'should get login' do
  #   visit root_path
  #   assert page.has_css? '.login'
  # end
  #
  # test 'should log in' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #   assert page.has_content? 'Blue Mirror'
  # end
  #
  # test 'should customize mood' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #
  #   click_on 'Update Mood'
  #   assert page.has_css? 'option[label="Terrible"]'
  #
  #   click_on 'Customize your moods'
  #   find(:css, '.ui-sortable li:first-child input').set('Meow')
  #   click_button 'Submit'
  #
  #   click_on 'Update Mood'
  #   refute page.has_css? 'option[label="Terrible"]'
  #   assert page.has_css? 'option[label="Meow"]'
  #
  #   click_on 'Customize your moods'
  #   find(:css, '.ui-sortable li:first-child input').set('Terrible')
  #   click_button 'Submit'
  #
  #   click_on 'Update Mood'
  #   refute page.has_css? 'option[label="Meow"]'
  #   assert page.has_css? 'option[label="Terrible"]'
  # end
  #
  #
  # test 'should get mood chart' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #   click_on 'Mood Chart'
  #
  #   assert page.has_css? '.chart'
  # end
  #
  # test 'should submit mood' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #   click_on 'Update Mood'
  #   click_button 'Submit'
  #   refute page.has_content? 'Mood Updated!'
  #
  #   select 'Good', from: 'mood-selections'
  #   click_button 'Submit'
  #   assert page.has_content? 'Mood Updated!'
  # end
  #
  # test 'should log out' do
  #   login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
  #   assert page.has_content? 'Blue Mirror'
  #
  #   click_on 'sign out'
  #   assert page.has_css? '.login'
  # end
end
