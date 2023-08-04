class Oven < ActiveRecord::Base
  belongs_to :user
  has_many :cookies, as: :storage, class_name: "Cookie", dependent: :destroy

  validates :user, presence: true

  def self.start_cooking(oven_id, current_user_id)
    CookingWorker.perform_in(2.minutes, oven_id, current_user_id)
  end
end
