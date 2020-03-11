class QuestionSimilar < ApplicationRecord
  belongs_to :question, inverse_of: :question_similars
end
