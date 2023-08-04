class CookingWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, queue: 'default'

  def perform(oven_id, current_user_id)
    oven = Oven.find_by!(id: oven_id)
    current_user = User.find_by!(id: current_user_id)
    oven.cookies.update_all(storage_id: current_user.id, storage_type: current_user.class) if oven.cookies.present?
  end
end
