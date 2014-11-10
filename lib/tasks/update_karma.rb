namespace :deeds do

  task :recalculate_karma => :environment do

    Deed.where(karma_event_type: "Product").each do |d|
      product = Product.find_by(id: d.karma_event_id)
      newvalue = Karma::Kalculate.new.karma_from_product_founding(product)
      d.update!({karma_value: newvalue})
    end

  end
end
