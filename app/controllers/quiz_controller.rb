class QuizController < ApplicationController

  def show

    @questions  = Question.order("RANDOM()").sample(10)
    # @question = Question.discription.order("RANDOM()").limit(3)
    # session[:score] = nil
  end

  def index
    @questions  = Question.all.limit(10)
    @wrong_question = Question.all
  end

  def create
    # if params[:answer] == params[:orig]
    #   session[:score] += 1
    # end
  end

end
