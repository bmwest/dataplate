class RenameUserProfiles < ActiveRecord::Migration[5.0]
  def change
    rename_table :user_profiles, :profiles
  end
end
