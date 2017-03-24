class TodosController < ApplicationController
  # GET /todos
  # GET /todos.json
  def index
    @todos = Todo.where('user_id = ?', current_user)
    render json: @todos
  end

  def featured
    render json: featured('db/data/todos.seed')
  end

  # GET /todos/1
  # GET /todos/1.json
  def show
    @todo = Todo.find_by_id(params['id'])
    render json: @todo
  end

  # POST /todos
  # POST /todos.json
  def create
    params['user_id'] = current_user.id if current_user
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: { location: @todo }, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    set_todo
    @todo.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_todo
    @todo = Todo.find_by_id(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def todo_params
    params.permit(:todo, :user_id)
  end
end
