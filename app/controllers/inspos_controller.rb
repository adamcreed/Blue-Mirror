class InsposController < ApplicationController
  include ApplicationHelper
  # GET /inspos
  # GET /inspos.json
  def index
    render json: featured('db/data/inspos.seed')
  end
end
