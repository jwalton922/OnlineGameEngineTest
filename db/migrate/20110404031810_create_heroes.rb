class CreateHeroes < ActiveRecord::Migration
  def self.up
    create_table :heroes do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :heroes
  end
end
