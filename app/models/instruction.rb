class Instruction < ApplicationRecord
  validates :step, presence: true
  belongs_to :recipe
end
