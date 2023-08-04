class Cookie < ActiveRecord::Base
  attr_accessor :batch_size
  belongs_to :storage, polymorphic: :true
  
  validates :storage, presence: true

  def ready?
    !(self.storage_type == Oven.to_s)
  end
end
