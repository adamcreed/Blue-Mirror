class Mood < ApplicationRecord
  belongs_to :user
  validates :mood, inclusion: { in: (1..20) }
end
