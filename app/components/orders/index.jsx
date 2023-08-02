import { useEffect, useState } from "react";
import Table from "./table";

const fetchOrders = async () => {
  const response = await fetch("/api/orders.json");
  const data = await response.json();
  return data;
};

export default () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders);
        setIsLoading(false);
      } catch (er) {
        alert(`uh oh! ${er}`);
      }
    };
    go();
  }, []);

  return (
    <>
      {!isLoading && <Table orders={orders} />}
      {isLoading && <p>Loading...</p>}
    </>
  );
};
