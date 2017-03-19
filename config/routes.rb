Rails.application.routes.draw do
  resources :events
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'auth/current', to: 'sessions#current'
  get 'signout', to: 'sessions#destroy', as: 'signout'
  get 'todos/featured', to: 'todos#featured'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]

  resources :users
  resources :todos, only: [:index, :show, :create, :destroy]
  resources :moods, only: [:index, :show, :create, :update]


  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
