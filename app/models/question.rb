class Question < ApplicationRecord
  has_many :question_similars, dependent: :destroy
  scope :old, -> { order(created_at: :asc) }
  accepts_nested_attributes_for :question_similars
end
