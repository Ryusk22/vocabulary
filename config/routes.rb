Rails.application.routes.draw do

  root 'bocabulary#index'
  resources :quiz
  resources :bocabulary

  namespace :api, format: 'json' do
    namespace :v1  do
      resources :quiz
    end
  end

  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 
  # devise_scope :user do
  #   post "sign_up", :to => "users/registrations#create"
  # #   get "sign_in", :to => "users/sessions#new"
  # end

end
