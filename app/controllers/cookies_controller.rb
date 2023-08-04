class CookiesController < ApplicationController
  before_action :authenticate_user!

  def new
    @oven = current_user.ovens.find_by!(id: params[:oven_id])
    if @oven.cookies.present?
      redirect_to @oven, alert: 'Cookies batch is already in the oven!'
    else
      @cookie = @oven.cookies.build
      @cookie.batch_size = 1
    end
  end

  def create
    @cookies = []
    @oven = current_user.ovens.find_by!(id: params[:oven_id])
    ActiveRecord::Base.transaction do
      cookie_params[:batch_size].to_i.times do
        @cookies << @oven.cookies.create!(cookie_params.slice(:fillings))
      end
    end
    redirect_to oven_path(@oven)
  end

  private

  def cookie_params
    params.require(:cookie).permit(:fillings, :batch_size)
  end
end
