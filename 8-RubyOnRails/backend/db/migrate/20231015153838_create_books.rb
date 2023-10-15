class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :cover
      t.string :isbn
      t.date :publication
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end
