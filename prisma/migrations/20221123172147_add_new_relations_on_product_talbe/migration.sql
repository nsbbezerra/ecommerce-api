-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sale_options_category_fkey" FOREIGN KEY ("sale_options_category") REFERENCES "partition_sale_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_adictional_items_id_fkey" FOREIGN KEY ("adictional_items_id") REFERENCES "addictional_items_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
