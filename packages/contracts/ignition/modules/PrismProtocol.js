import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PrismProtocol", (m) => {
  // Configuration parameters
  const governanceTokenName = m.getParameter("governanceTokenName", "SME DAO Token");
  const governanceTokenSymbol = m.getParameter("governanceTokenSymbol", "SMEDAO");
  const initialSupply = m.getParameter("initialSupply", 1000000n * 10n ** 18n);
  const newMemberTokenGrant = m.getParameter("newMemberTokenGrant", 1000n * 10n ** 18n);

  // Base Protocol Contracts

  // Deploy MockUSDT
  const mockUSDT = m.contract("MockUSDT");

  // Deploy CreditScore
  const creditScore = m.contract("CreditScore");

  // Deploy LendingPool
  const lendingPool = m.contract("LendingPool", [mockUSDT]);

  // Deploy LoanManager
  const loanManager = m.contract("LoanManager", [
    lendingPool,
    creditScore,
    mockUSDT
  ]);

  // DAO Governance Contracts

  // Deploy GovernanceToken
  const governanceToken = m.contract("GovernanceToken", [
    governanceTokenName,
    governanceTokenSymbol,
    initialSupply
  ]);

  // Deploy ReputationNFT
  const reputationNFT = m.contract("ReputationNFT");

  // Deploy DAOMembership
  const daoMembership = m.contract("DAOMembership", [
    governanceToken,
    reputationNFT
  ]);

  // Deploy YieldingPool
  const yieldingPool = m.contract("YieldingPool", [
    mockUSDT,
    daoMembership
  ]);

  // Deploy InsurancePool
  const insurancePool = m.contract("InsurancePool", [mockUSDT]);

  // Deploy LoanVoting (depends on all above contracts)
  const loanVoting = m.contract("LoanVoting", [
    governanceToken,
    reputationNFT,
    daoMembership,
    loanManager
  ]);

  // Configuration Calls

  // Set LoanManager in LendingPool
  m.call(lendingPool, "setLoanManager", [loanManager]);

  // Set LoanVoting in LoanManager
  m.call(loanManager, "setLoanVoting", [loanVoting]);

  // Authorize DAOMembership to update ReputationNFT
  m.call(reputationNFT, "authorizeUpdater", [daoMembership]);

  // Authorize LoanVoting to update ReputationNFT
  m.call(reputationNFT, "authorizeUpdater", [loanVoting]);

  // Authorize LoanVoting to slash in GovernanceToken
  m.call(governanceToken, "authorizeSlasher", [loanVoting]);

  // Set LoanVoting as authorized contract in InsurancePool
  m.call(insurancePool, "setAuthorizedContract", [loanVoting]);

  // Set token grant amount in DAOMembership
  m.call(daoMembership, "setTokenGrantAmount", [newMemberTokenGrant]);

  // Transfer governance tokens to DAOMembership for grants
  const grantPoolAmount = newMemberTokenGrant * 100n; // 100 new members worth
  m.call(governanceToken, "transfer", [daoMembership, grantPoolAmount]);

  // Return all deployed contracts
  return {
    mockUSDT,
    creditScore,
    lendingPool,
    loanManager,
    governanceToken,
    reputationNFT,
    daoMembership,
    yieldingPool,
    insurancePool,
    loanVoting
  };
});
