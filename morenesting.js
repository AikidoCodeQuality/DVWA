class CheckoutService {
  async checkout(order, paymentService, inventoryService) {
    if (order) {
      if (order.customer) {
        if (order.customer.isVerified) {
          if (order.items && order.items.length > 0) {
            for (const item of order.items) {
              if (item.inStock) {
                try {
                  if (await paymentService.authorize(order.payment)) {
                    await inventoryService.reserve(item.id);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }
          }
        }
      }
    }

    return {
      success: true,
    };
  }
}

module.exports = CheckoutService;
