class CreateFactions < ActiveRecord::Migration
  def self.up
    create_table :factions do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :factions
  end
end
