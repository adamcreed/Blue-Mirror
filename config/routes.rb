Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create', as: 'signin'
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'auth/failure', to: redirect('/')
  get 'auth/current', to: 'sessions#current'
  get 'todos/featured', to: 'todos#featured'
  get 'inspos', to: 'inspos#index'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]

  resources :users
  resources :todos, only: [:index, :show, :create, :destroy]
  resources :moods, only: [:index, :show, :create, :update]
  resources :moods, only: [:update, :destroy]
  resources :notes
  resources :events
  resources :meds

  patch '/mood_lists', to: 'mood_lists#update'
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
