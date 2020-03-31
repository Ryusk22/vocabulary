class QuizController < ApplicationController

  def show

    @questions  = Question.order("RANDOM()").sample(10)
    # @question = Question.discription.order("RANDOM()").limit(3)
    # session[:score] = nil
  end

  def index
    @questions  = Question.order("RANDOM()").sample(10)
    @wrong_question1 = Question.order("RANDOM()").sample(10)
    @wrong_question2 = Question.order("RANDOM()").sample(10)
    # render json: { data: @questions }
  end

  def create
    binding.pry
    # if params[:answer] == params[:orig]
    #   session[:score] += 1
    # end
  end

end
