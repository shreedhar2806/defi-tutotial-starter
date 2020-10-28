const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}
contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;
  before(async() => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    await dappToken.transfer(tokenFarm.address, tokens('1000000'))
    await daiToken.transfer(investor, tokens('100'), {from: owner})
  })
  describe("Mock Dai deployment", async()=> {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    })
  })
  describe("Dapp Token deployment", async ()=> {
    it('has a name', async()=> {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });
  describe("Token Farm deployment", async ()=> {
    it('has a name', async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });
    it('contract has tokens', async () => {
      const balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("Farming tokens", async ()=> {
    let result;
    it('rewards investors for staking mDai tokens', async () => {
      let result;
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock Dai wallet balance correct before staking');
      // Stake mock dai tokens
      await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor});
      await tokenFarm.stakeTokens(tokens('100'), {from: investor});

      //check staking result
      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('0', 'investor mock dai wallet balance after staking'));

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('100', 'Toekn Farm mock Dai balance correct after staking'));

      //is staking set to true
      result = await tokenFarm.isStaking(investor);
      assert.equal(result.toString(), "true", "Investor staking status correct after staking");

      // hasStaked should be true
      result = await tokenFarm.hasStaked(investor);
      assert.equal(result.toString(), "true", "Investor staking hasStaked correct after staking");

      // issue tokens
      await tokenFarm.issueTokens({from: owner});

      //Check balances after issuance
      result = await dappToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), "investor Dapp token balance correct after issuance");

      //Ensure that only owner can issue tokens
      await tokenFarm.issueTokens({from: investor}).should.be.rejected;

      await tokenFarm.unStakeTokens({from: investor});

      result = await daiToken.balanceOf(investor);
      assert.equal(result.toString(), tokens('100'), "investor mock dai wallet balance correct after staking");

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('0'), "Token Farm Mock Dai balance correct after staking")

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct staking');
    });
  });
});
