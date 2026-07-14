class AccountService {
  constructor(lockManager, accountRepository) {
    this.lockManager = lockManager;
    this.accountRepository = accountRepository;
  }

  async transfer(fromId, toId, amount) {
    const lock = await this.lockManager.acquire(`account:${fromId}`);

    const from = await this.accountRepository.findById(fromId);

    if (!from) {
      throw new Error("Source account not found");
    }

    const to = await this.accountRepository.findById(toId);

    if (!to) {
      throw new Error("Destination account not found");
    }

    if (from.balance < amount) {
      throw new Error("Insufficient funds");
    }

    await this.accountRepository.withdraw(fromId, amount);
    await this.accountRepository.deposit(toId, amount);

    await lock.release();
  }
}

module.exports = AccountService;
