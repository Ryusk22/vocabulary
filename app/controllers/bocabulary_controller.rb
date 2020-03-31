class BocabularyController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def index
  end

  def show
    @question = Question.new
    2.times { @question.question_similars.build}
    @question.question_similars.build
    @q = Question.ransack(params[:q])
    @questions = @q.result(distinct: true).old
    @question_similars = QuestionSimilar.all
  end

  def create
    binding.pry
    Question.create(create_params)
    redirect_to "/bocabulary/:#{current_user.id}"
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(params[:id])
    @question.update(update_params)
    redirect_to "/bocabulary/#{current_user.id}"
  end

  def destroy
    question = Question.find(params[:id])
    question.destroy
    redirect_to "/bocabulary/:#{current_user.id}"
  end

  private

  def create_params
    params.require(:question).permit(:question, :discription, question_similars_attributes:[:similar_word])
  end

  def update_params
    params.require(:question).permit(:question, :discription)
  end

end
