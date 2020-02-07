class CreateQuestionSimilars < ActiveRecord::Migration[6.0]
  def change
    create_table :question_similars do |t|
      t.integer :question_id
      t.string :similar_word
      t.timestamps
    end
  end
end
