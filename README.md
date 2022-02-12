edit *Still working to fix it : 

<h2> New Repo is now <a href="https://github.com/maxx6262/wallet-connect-celo-promise-return/tree/csb-20g9c/"> here </a> </h2>

i currently have found a way to get Promises returns with 3 special steps : (to analyze to fix)
1. I have to connect
2. I have to refresh page on dapp <i>  due to bad Infura calling and reaching <strong> bad value at position i on JSON </strong> </i>
3. I have to disconnect from Valora and to reconnect by clicking on <strong> SetStorage </button> to allow Dapp to reach Transactions returns. Then, <i> tx of each request is displayed on screen </i>

<h2> I maked some changes to override useProvider </h2>

By calling new way to reach provider, issue with reading requests are fixed with WalletConnect connector but main issues could still happen (almost 1 from 2 / 1 from 3 issuable sessions at the moment </h2>

You can try current version on <a href="https://20g9c.csb.app/"> Sandebox dapp </a>

<h2> Conversation about this issue is still reachable <a href="https://github.com/tmm/wagmi/issues/116" > here </a>

r# wagmi-wallerconnect-alfajoles-promises
Implementation of dapp interacting with a SimpleStorage contract deployed on Alfajoles testnet .
Using connectWallet connecteur with Valora and Alfajoles apps to  test wagmi api and to get Promises returns into dapp.
Using only Hook library from Wafi to clean calls and transactions requests (Hooks need not using of any Web3 compo (?)  due to interact with etherjs ?

Issue opened <a href="https://github.com/tmm/wagmi/issues/116"> here </a>

Deployment and features page were builded on @codesandbox 
You'll find callable and reachable version <a href="https://l3ecb.sse.codesandbox.io/"> here </a>
Created with CodeSandbox
