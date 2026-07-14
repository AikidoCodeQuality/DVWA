function processOrder(order) {
  if (order) {
    if (order.customer) {
      if (order.customer.isActive) {
        if (order.items && order.items.length > 0) {
          if (order.payment) {
            if (order.payment.status === "PAID") {
              return {
                success: true,
                orderId: order.id,
              };
            }
          }
        }
      }
    }
  }

  return {
    success: false,
  };
}

module.exports = { processOrder };
