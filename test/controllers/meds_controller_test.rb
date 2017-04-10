require 'test_helper'

class MedsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @med = meds(:one)
  end

  test "should get index" do
    get meds_url, as: :json
    assert_response :success
  end

  test "should create med" do
    assert_difference('Med.count') do
      post meds_url, params: { name: @med.name, user_id: @med.user_id }, as: :json
    end

    assert_response 201
  end

  test "should fail to show med without being logged in as that user" do
    assert_raises NoMethodError do
      get med_url(@med), as: :json
    end
  end

  test "should fail to update med without being logged in as that user" do
    assert_raises NoMethodError do
      patch med_url(@med), params: { name: @med.name, user_id: @med.user_id }, as: :json
    end
  end

  test "should fail to destroy med without being logged in as that user" do
  assert_raises NoMethodError do
      delete med_url(@med), as: :json
    end
  end
end
