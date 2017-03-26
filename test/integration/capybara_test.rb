require 'test_helper'
require_relative '../helpers/capybara_test_helper'

class CapybaraTest < ActionDispatch::IntegrationTest
  include Capybara::Screenshot::MiniTestPlugin
  include CapybaraTestHelper
  test 'all the things' do
    # test 'should get login' do
      visit root_path
      assert page.has_css? '.login'
    # end

    # test 'should log in' do
      login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      assert page.has_content? 'Blue Mirror'
    # end

    # test 'should customize mood' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']

      click_on 'Update Mood'
      assert page.has_css? 'option[label="Terrible"]'

      click_on 'Customize your moods'
      find(:css, '.ui-sortable li:first-child input').set('Meow')
      click_button 'Submit'

      click_on 'Update Mood'
      refute page.has_css? 'option[label="Terrible"]'
      assert page.has_css? 'option[label="Meow"]'

      click_on 'Customize your moods'
      find(:css, '.ui-sortable li:first-child input').set('Terrible')
      click_button 'Submit'

      click_on 'Update Mood'
      refute page.has_css? 'option[label="Meow"]'
      assert page.has_css? 'option[label="Terrible"]'
    # end

    # test 'should get mood chart' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Mood Chart'

      assert page.has_css? '.chart'
    # end

    # test 'should submit mood' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Home'
      click_on 'Update Mood'
      click_button 'Submit'
      refute page.has_content? 'Mood Updated!'

      select 'Good', from: 'mood-selections'
      click_button 'Submit'
      assert page.has_content? 'Mood Updated!'
    # end

    # test 'should find counselors' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Home'
      click_on 'Local Counselors'
      refute page.has_css? '#map-canvas'
      assert page.has_css? '.loading'

      sleep 10
      refute page.has_css? '.loading'
      assert page.has_css? '#map-canvas'
      assert page.has_css? '.map-results'

      assert_equal page.current_host, 'http://localhost'
      find('li:first-of-type .result-website').click
      refute_equal page.current_host, 'http://localhost'
    # end

    # test 'should get crisis helplines' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      page.driver.go_back
      click_on 'Home'
      click_on 'Crisis helplines'
      assert page.has_content? 'Suicide Prevention Lifeline'
    # end

    # test 'should get motivations' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Home'
      click_on 'get motivated'
      assert page.has_css? '.todo-list'
      refute page.has_content? 'Please enter a task'
      refute page.has_content? 'Horse-Dagger'

      click_on 'Add New Task'
      assert page.has_content? 'Please enter a task'

      fill_in placeholder: 'Enter Task', with: 'Horse-Dagger'
      click_on 'Add New Task'
      assert page.has_content? 'Horse-Dagger'

      find('li:last-of-type input').click
      click_on 'Remove Selected'
      refute page.has_content? 'Horse-Dagger'
    # end

    refute page.has_css? '.other-todos ul li'
    find('.todo-wrapper a').click
    assert page.has_css? '.other-todos ul li'
    find('.other-todos a[ng-click="clearOthers();show=false"]').click
    refute page.has_css? '.other-todos ul li'

    # test 'should write a journal entry' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Journal'
      assert page.has_content? 'Past Entries'
      refute page.has_content? 'Horse-Title'
      refute page.has_css? '.web-entries'

      fill_in placeholder: 'your title', with: 'Horse-Title'
      fill_in placeholder: 'start typing!', with: 'Horse-Dagger Horse-Dagger Horse-Dagger Horse-Dagger Horse-Dagger'
      fill_in placeholder: 'tags here', with: 'Horses, Daggers'
      find('a.button').click
      assert page.has_content? 'Horse-Title'
      assert page.has_css? '.web-entries'

      find('li:last-of-type h3').click
      find('.delete-journals').click
      refute page.has_css? '.web-entries'
      refute page.has_content? 'Horse-Title'
    # end

    # test 'should view and add events' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Meds'
      refute page.has_content? 'took meds ✅'
      refute page.has_css? '.disableButton'

      click_on 'I took my medication today'
      assert page.has_content? 'took meds ✅'
      assert page.has_css? '.disableButton'

      find('a[tooltip="took meds ✅"] .closeon').click
      refute page.has_content? 'took meds ✅'
      refute page.has_css? '.disableButton'

      refute page.has_content? 'Horse-Dagger'
      fill_in 'dateFrom', with: Date.today
      fill_in 'dateTitle', with: 'Horse-Dagger'
      click_on 'Create Event'
      assert page.has_content? 'Horse-Dagger'
    # end
    #
    # test 'should view and add meds' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      click_on 'Meds'
      refute page.has_content? 'Horse tranquilizers'

      fill_in placeholder: 'Enter Medication', with: 'Horse tranquilizers'
      click_on 'Add Medication'
      assert page.has_content? 'Horse tranquilizers'

      find('li:last-of-type input').click
      click_on 'Remove Selected'
      refute page.has_content? 'Horse tranquilizers'
    # end

    # test 'should log out' do
      # login username: ENV['TEST_USER'], password: ENV['TEST_PASSWORD']
      assert page.has_content? 'Blue Mirror'

      click_on 'sign out'
      assert page.has_css? '.login'
    # end
  end
end
