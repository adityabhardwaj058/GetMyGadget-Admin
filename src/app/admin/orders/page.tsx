import { getOrdersWithProducts } from "@/actions/orders";
import OrdersPageComponent from "@/app/admin/orders/page-component";

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts) {
    return (
      <div className="text-center font-bold text-2xl">No Orders Found</div>
    );
  }

  return <OrdersPageComponent ordersWithProducts={ordersWithProducts} />;
};
export default Orders;
