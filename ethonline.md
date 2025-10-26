# ETHOnline 2025 - Sponsor Integrations

How we integrated sponsor technologies into Prism Finance.

---

## Hardhat

We built the entire smart contract infrastructure using Hardhat 3.0.9. This includes compiling, testing, and deploying all 10 contracts in our DAO lending protocol.

**What we used:**
- Hardhat 3.0.9 for development and testing
- Hardhat Ignition 3.0.3 for deployments
- ESM modules (modern JavaScript)

**Why Hardhat Ignition?**

Instead of writing manual deployment scripts with lots of boilerplate, we created a single declarative module that deploys our entire protocol. Ignition handles dependencies, executes transactions in parallel where possible, and can resume if something fails.

Our Ignition module (`ignition/modules/PrismProtocol.js`) deploys:
- Base contracts (MockUSDT, CreditScore, LendingPool, LoanManager)
- DAO contracts (GovernanceToken, ReputationNFT, DAOMembership)
- Risk management (YieldingPool, InsurancePool, LoanVoting)
- Plus all the authorization and configuration between them

**Commands:**
```bash
yarn compile    # Compile all contracts
yarn test       # Run tests
npx hardhat ignition deploy ignition/modules/PrismProtocol.js --network sepolia
```

The result is a clean, maintainable deployment system that we can run on any network without changing code.

---

**Built for ETHOnline 2025**
