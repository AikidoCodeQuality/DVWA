class OrderRepository {
  constructor(database) {
    this.database = database;
  }

  async getRecentOrders(customerId) {
    const result = await this.database.query(
      `
      SELECT *
      FROM orders
      WHERE customer_id = ?
      ORDER BY created_at DESC
      LIMIT 20
      `,
      [customerId]
    );

    return result.rows;
  }
}

module.exports = OrderRepository;
