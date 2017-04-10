require 'test_helper'

class EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event = events(:one)
    current_user = users(:one)
    # session[:user_id] = users(:one).id
  end

  test "should get index" do
    get events_url, as: :json
    assert_response :success
  end

  test "should create event" do
    assert_difference('Event.count') do
      post events_url, params: { completed: @event.completed, from: @event.from, frequency: @event.frequency, title: @event.title, user_id: @event.user_id }, as: :json
    end

    assert_response 201
  end

  test "should fail to show event without being logged in as that user" do
    assert_raises NoMethodError do
      get event_url(@event), as: :json
    end
  end

  test "should fail to update event without being logged in as that user" do
    assert_raises NoMethodError do
      patch event_url(@event), params: { event: { completed: @event.completed, from: @event.from, frequency: @event.frequency, title: @event.title, user_id: @event.user_id } }, as: :json
    end
  end

  test "should fail to destroy event without being logged in as that user" do
    assert_raises NoMethodError do
      delete event_url(@event), as: :json
    end
  end
end
