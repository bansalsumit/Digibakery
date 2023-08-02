import { useEffect, useState } from "react";
import Table from "./table";

const fetchOrders = async (sortBy) => {
  const params = new URLSearchParams();
  params.append('sort_by', sortBy);
  const url = `/api/orders.json?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchOrdersHandler(sortBy='') {
    try {
      setIsLoading(true);
      const orders = await fetchOrders(sortBy);
      setOrders(orders);
      setIsLoading(false);
    } catch (er) {
      alert(`uh oh! ${er}`);
    }
  }

  useEffect(() => {
    fetchOrdersHandler();
  }, []);

  return (
    <>
      <Table orders={orders} isLoading={isLoading} fetchOrdersHandler={fetchOrdersHandler}/>
    </>
  );
};
