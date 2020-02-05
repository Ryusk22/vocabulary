Rails.application.routes.draw do
  root 'bocabulary#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 
  # devise_scope :user do
  #   get "sign_up", :to => "users/registrations#new"
  #   get "sign_in", :to => "users/sessions#new"
  # end

end
