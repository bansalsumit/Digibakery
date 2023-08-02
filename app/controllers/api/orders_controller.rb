class Api::OrdersController < Api::BaseController
  def index
    sleep 1 unless Rails.env.test? # simulate delay in loading
    @orders = Order.all
    if params['sort_by'].present?
      @orders.order!("#{params['sort_by']} asc")
    else
      @orders.order!(created_at: :desc)
    end
  end

  def fulfill
    @order = Order.find(params[:id])
    @order.fulfilled = true
    @order.save!
  end
end
