# Defi tutorial starter

## Code setup
1. Clone the repo `git clone`
2. Download link Ganache from [here](#https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.trufflesuite.com%2Fganache&event=video_description&v=CgXQC4dbGUE&redir_token=QUFFLUhqazZiNURHbGJLbVE2R3cwUXpUVTY2aTI0bTVpQXxBQ3Jtc0tuU1RtNFZDc2dwMkY4RUxFR0x4aWZtcnBmV3U0aUs3VUcxLXZ0NVZrZFJiX2lHQTNBZDFzU2xobkZlc2NJd2xtY1NJOWVzdjNOTWlVdlJOMjVTalc4ZjZ3REt2QkpWSUNtV19mOEZ2UXVqOFQwRGk1VQ%3D%3D)
3. Install truffle module `npm install -g truffle`
4. Install packages listed in package.json `npm install`
5. Compile solidity contract `truffle compile`
6. Run migration for the compiled contracts `truffle migrate --reset`
7. Run tests `truffle test`
8. Start a dev server `npm run start`

## Metamask setup for staking and unstaking
1. Follw this [link](#https://metamask.io/) to install metamask
2. Click `Networks` on the top section of the metamask plugin
3. Select `Custom RPC`
4. Add network name `Ganache` or anything you prefer
5. Copy the RPC Server address from `Ganache` application and click `Save`
6. Copy the private key for second address from the `Ganache` as its the investor account
7. Select `Import account` from the top section of metamask and paste the private key
8. Ensure the default metamask address is set to investor addresss from the Ganache app

## Staking and Unstaking
1. Go to localhost:3000
2. mDai balance be displayed as `100`
3. Enter amount less than available balance and click `Stake`
4. Approve the allowance and transaction from the metamask plugin
5. Select amount to unstake and approve the transaction from the metamask

## Issue tokens
1. Run `truffle exec scripts/issue-token.js`

 
   
