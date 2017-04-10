require 'test_helper'

class NotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @note = notes(:one)
  end

  test "should get index" do
    get notes_url, as: :json
    assert_response :success
  end

  test "should create note" do
    assert_difference('Note.count') do
      post notes_url, params: { tags: @note.tags, text: @note.text, title: @note.title, user_id: @note.user_id }, as: :json
    end

    assert_response 201
  end

  test "should show note" do
    get note_url(@note), as: :json
    assert_response :success
  end

  test "should fail to update note without being logged in as that user" do
    assert_raises NoMethodError do
      patch note_url(@note), params: { note: { tags: @note.tags, text: @note.text, title: @note.title, user_id: @note.user_id } }, as: :json
    end
  end

  test "should fail to destroy note without being logged in as that user" do
    assert_raises NoMethodError do
      delete note_url(@note), as: :json
    end
  end
end
