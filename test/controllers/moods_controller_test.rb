require 'test_helper'

class MoodsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mood = moods(:one)
  end

  test "should get index" do
    get moods_url, as: :json
    assert_response :success
  end

  test "should create mood" do
    assert_difference('Mood.count') do
      post moods_url, params: { mood: @mood.mood, user_id: @mood.user_id }, as: :json
    end

    assert_response 201
  end

  test "should fail to show mood without being logged in as that user" do
    assert_raises NoMethodError do
      get mood_url(@mood), as: :json
    end
  end

  test "should fail to update mood without being logged in as that user" do
    assert_raises NoMethodError do
      patch mood_url(@mood), params: { mood: @mood.mood, user_id: @mood.user_id }, as: :json
    end
  end

  test "should fail to destroy mood without being logged in as that user" do
    assert_raises NoMethodError do
      delete mood_url(@mood), as: :json
    end
  end
end
