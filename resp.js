class UserManager {
  constructor(database, emailService, logger) {
    this.database = database;
    this.emailService = emailService;
    this.logger = logger;
  }

  async createUser(user) {
    if (!user.email || !user.name) {
      throw new Error("Invalid user");
    }

    await this.database.save(user);
    this.logger.info(`Created user ${user.email}`);
    await this.emailService.sendWelcomeEmail(user.email);
  }

  async deleteUser(id) {
    await this.database.delete(id);
    this.logger.info(`Deleted user ${id}`);
  }

  async exportUsers() {
    const users = await this.database.findAll();

    return users
      .map((u) => `${u.id},${u.name},${u.email}`)
      .join("\n");
  }

  async generateStatistics() {
    const users = await this.database.findAll();

    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.active).length,
    };
  }

  async backupUsers() {
    const users = await this.database.findAll();

    // Simulate backup
    console.log("Backing up users...", users.length);
  }
}

module.exports = UserManager;
