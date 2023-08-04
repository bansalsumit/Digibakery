class Oven < ActiveRecord::Base
  belongs_to :user
  has_many :cookies, as: :storage, class_name: "Cookie", dependent: :destroy

  validates :user, presence: true
end
