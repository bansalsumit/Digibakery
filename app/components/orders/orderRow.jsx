import { useState } from "react";

const OrderRow = ({ order, onClickEvent }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const fulfillOrderHandler = async (orderId) => {
    setButtonDisabled(true);
    onClickEvent(orderId);
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>{formatDate(order.created_at)}</td>
      <td>{formatDate(order.pick_up_at)}</td>
      <td>{order.customer_name}</td>
      <td>{order.item}</td>
      <td>{order.quantity}</td>
      <td>{order.fulfilled ? `Fulfilled` : `In progress`}</td>
      <td>
        {!order.fulfilled && (
          <button
            onClick={() => fulfillOrderHandler(order.id)}
            disabled={isButtonDisabled}
          >
            Fulfill order
          </button>
        )}
      </td>
    </tr>
  );
};

const formatDate = (dateString) => {
  let date = new Date(dateString);
  return date.toLocaleDateString();
};

export default OrderRow;
