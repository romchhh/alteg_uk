import { Metadata } from "next";
import OrdersList from "./OrdersList";

export const metadata: Metadata = {
  title: "Orders | Admin ALTEG",
  description: "Order management",
};

export default function OrdersPage() {
  return <OrdersList />;
}
