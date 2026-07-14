let currentAccount;
let accountPermissions;

class AccountService {
  constructor(database) {
    this.database = database;
  }

  async loadAccount(accountId) {
    if (!currentAccount) {
      currentAccount = await this.database.getAccount(accountId);
    }

    return currentAccount;
  }

  async getPermissions(accountId) {
    if (!accountPermissions) {
      const account = await this.loadAccount(accountId);
      accountPermissions = await this.database.getPermissions(account.id);
    }

    return accountPermissions;
  }
}

module.exports = AccountService;
