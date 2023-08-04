import { useEffect, useState } from "react";
import Table from "./table";

const fetchOrders = async (sortBy) => {
  const params = new URLSearchParams();
  params.append("sort_by", sortBy);
  const url = `/api/orders.json?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateOrderStatusToFullFill = async (orderId) => {
  const url = `/api/orders/${orderId}/fulfill.json?`;
  const response = await fetch(url, { method: "PUT" });
  const data = await response.json();
  return data;
};

export default () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOrdersHandler(sortBy = "") {
    try {
      setIsLoading(true);
      const orders = await fetchOrders(sortBy);
      setOrders(orders);
      setIsLoading(false);
    } catch (er) {
      alert(`uh oh! ${er}`);
    }
  }

  async function updateOrderStatusToFullFillhandler(orderId) {
    try {
      const updatedOrder = await updateOrderStatusToFullFill(orderId);
      const ordersList = orders.map((order) => {
        let newOrder;
        if (order.id == orderId) {
          newOrder = updatedOrder;
        } else {
          newOrder = order;
        }
        return newOrder;
      });
      setOrders(ordersList);
    } catch (er) {
      alert(`uh oh! ${er}`);
    }
  }

  useEffect(() => {
    fetchOrdersHandler();
  }, []);

  return (
    <>
      <Table
        orders={orders}
        isLoading={isLoading}
        fetchOrdersHandler={fetchOrdersHandler}
        rowHandler={updateOrderStatusToFullFillhandler}
      />
    </>
  );
};
