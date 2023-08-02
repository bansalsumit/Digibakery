const OrderTable = ({ orders, fetchOrdersHandler }) => {
  const orderSortingHandler = (sortBy) => {
    fetchOrdersHandler(sortBy);
  };

  return (
    <table className="table orders-table">
      <thead>
        <tr>
          <th onClick={() => orderSortingHandler('id')}><u>Order #</u></th>
          <th>Ordered at</th>
          <th onClick={() => orderSortingHandler('pick_up_at')}><u>Pick up at</u></th>
          <th onClick={() => orderSortingHandler('customer_name')}><u>Customer Name</u></th>
          <th>Item</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

const OrderRow = ({ order }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{formatDate(order.created_at)}</td>
      <td>{formatDate(order.pick_up_at)}</td>
      <td>{order.customer_name}</td>
      <td>{order.item}</td>
      <td>{order.quantity}</td>
      <td>{order.fulfilled ? `Fulfilled` : `In progress`}</td>
      <td></td>
    </tr>
  );
};

const formatDate = (dateString) => {
  let date = new Date(dateString);
  return date.toLocaleDateString();
};

export default OrderTable;
