import OrderRow from "./orderRow";

const OrderTable = ({ orders, isLoading, fetchOrdersHandler, rowHandler }) => {
  const orderSortingHandler = (sortBy) => {
    fetchOrdersHandler(sortBy);
  };

  return (
    <>
      <table className="table orders-table">
        <thead>
          <tr>
            <th onClick={() => orderSortingHandler("id")}>
              <u>Order #</u>
            </th>
            <th>Ordered at</th>
            <th onClick={() => orderSortingHandler("pick_up_at")}>
              <u>Pick up at</u>
            </th>
            <th onClick={() => orderSortingHandler("customer_name")}>
              <u>Customer Name</u>
            </th>
            <th>Item</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onClickEvent={rowHandler}
              />
            ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default OrderTable;
