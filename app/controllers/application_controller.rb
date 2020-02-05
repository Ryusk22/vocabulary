class ApplicationController < ActionController::Base
  devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:name, :password) }
end
