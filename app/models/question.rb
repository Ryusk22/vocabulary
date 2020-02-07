class Question < ApplicationRecord
  has_many :question_similars, dependent: :destroy
end
