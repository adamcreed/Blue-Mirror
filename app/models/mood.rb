class Mood < ApplicationRecord
  ApplicationController.helpers.mood_list

  belongs_to :user
  validates :mood, inclusion: { in: (1..mood_list.length) }
end
