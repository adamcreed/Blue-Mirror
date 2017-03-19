class Event < ApplicationRecord
  belongs_to :user
  validates :title, :date, :frequency, presence: true
end
