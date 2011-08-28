class CreateMapdata < ActiveRecord::Migration
  def self.up
    create_table :mapdata do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :mapdata
  end
end
