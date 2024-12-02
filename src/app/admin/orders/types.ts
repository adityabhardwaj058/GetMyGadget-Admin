import { createClient } from "@/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = await createClient()

const ordersWithProductsQuery = supabase
.from('order')
.select('*, order_items:order_item(*, products:product(*)), user(*)')
.order('created_at', {ascending: false})

console.log(ordersWithProductsQuery)
export type OrdersWithProducts = QueryData<typeof ordersWithProductsQuery>