const Token = artifacts.require("Token")
const Stake = artifacts.require("Stake")

module.exports = async function (deployer) {
  await deployer.deploy(Token)
  const token = await Token.deployed()

  await deployer.deploy(Stake, token.address)
};