/* eslint-disable */
import React, {
  useState,
  useEffect,
} from 'react';
import Web3 from 'web3';


import {
  useDispatch,
} from 'react-redux';

import AttributionSplitter from './contracts/AttributionSplitter.json';

import {
  setUserAddress,
  setIsAdmin,
  setMinterKey,
  setBurnerKey,
  setIsMinter,
  setIsBurner,
} from './actions/UserActions';

import NavBar from './components/NavBar';
import AdminRole from './components/AdminRole';

const ethers = require('ethers');

// The address from the above deployment example
// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
//console.log(ethers);
const contractFactory = new ethers.ContractFactory(
  AttributionSplitter.abi,
  AttributionSplitter.bytecode,
);
console.log(contractFactory.interface.functions);
const a = contractFactory.interface.functions;
//
//const c = contractFactory.getDeployTransaction();
//console.log(c);

//const provider = ethers.getDefaultProvider('ropsten');
//const provider = new ethers.providers.Web3Provider(web3.currentProvider);

//let provider = new ethers.providers.JsonRpcProvider();


function Home() {
   const dispatch = useDispatch();
   const [ethBrowserError, setEthBrowserError] = useState(null);
   const [ethContractError, setEthContractError] = useState(null);
   const [account, setAccount] = useState(null);
   const [tutorialToken, setAttributionSplitter] = useState(null);
   const [contractAddress, setContractAddress] = useState(null);
   const [loading, setLoading] = useState(true);
   const [adminRole, setAdminRole] = useState(false);
   const [burnerRole, setBurnerRole] = useState(false);
   const [burnerRoleKey, setBurnerRoleKey] = useState('');
   const [minterRole, setMinterRole] = useState(false);
   const [minterRoleKey, setMinterRoleKey] = useState('');
   const [init, setInit] = useState(false);
 
   async function loadWeb3() {
     if (window.ethereum) {
       window.web3 = new Web3(window.ethereum);
       await window.ethereum.enable();
     } else if (window.web3) {
       window.web3 = new Web3(window.web3.currentProvider);
     } else {
       setEthBrowserError('Non-Ethereum browser detected');
     }
   }
 
   async function loadBlockChainData() {
     const { web3 } = window;
     const accounts = await web3.eth.getAccounts();
     setAccount(accounts[0]);
     dispatch(setUserAddress(accounts[0]));
     //const netWorkId = await web3.eth.net.getId();
     //const netWorkData = AttributionSplitter.networks[netWorkId];
     const network = ethers.providers.getNetwork('homestead');
     const provider = ethers.getDefaultProvider('homestead');
     const netWorkId = network.chainId;
     const networkAddress = network.ensAddress;
     if (network) {
       console.log(networkAddress);
       const a = "0x2CAAb14352F1C5D511cc01aD7B396c82fc16b8fa"
       const contract = new ethers.Contract(
          //"AttributionSplitter.sol",
          a,
          AttributionSplitter.abi,
          provider
       );
       console.log("edkdkdkk");
       console.log(contract);
       const AttrSplit = new web3.eth.Contract(
         AttributionSplitter.abi,
         networkAddress
       );
       setAttributionSplitter(AttrSplit);
       const { _address } = AttrSplit;
       console.log(_address);

       //const tempAdminRole = await AttrSplit.methods.DEFAULT_ADMIN_ROLE().call();
       //const hasAdminRole = await AttrSplit.methods.hasRole(tempAdminRole, accounts[0]).call();
       //dispatch(setIsAdmin(hasAdminRole));
       //setAdminRole(hasAdminRole);
       //const tempMinterRole = await AttrSplit.methods.MINTER_ROLE().call();
       //setMinterRoleKey(tempMinterRole);
       //dispatch(setMinterKey(tempMinterRole));
       //const hasMinterRole = await AttrSplit.methods.hasRole(tempMinterRole, accounts[0]).call();
       //setMinterRole(hasMinterRole);
       //dispatch(setIsMinter(hasMinterRole));
       //const tempBurnerRole = await AttrSplit.methods.BURNER_ROLE().call();
       //setBurnerRoleKey(tempBurnerRole);
       //dispatch(setBurnerKey(tempBurnerRole));
       //const hasBurnerRole = await AttrSplit.methods.hasRole(tempBurnerRole, accounts[0]).call();
       //setBurnerRole(hasBurnerRole);
       //dispatch(setIsBurner(hasBurnerRole));
       setContractAddress(a);
       setLoading(false);
     } else {
       setEthContractError('AttributionSplitter not deployed to detected network');
     }
   }
   useEffect(() => {
     if (!init) {
       loadWeb3();
       loadBlockChainData();
       setInit(true);
     }
     return () => {
       console.log('Desmontando blockchain ...');
     };
   }, [init]);
 
   return (
     <div className="App">
       {ethBrowserError && (
         <>
           <p>{ ethBrowserError }</p>
         </>
       )}
       {ethContractError && (
         <>
           <p>{ ethContractError }</p>
         </>
       )}
       {loading && (
         <>
           <p>loading ...</p>
         </>
       )}
       {!loading && (
         <>
           <NavBar
             contractAddress={contractAddress}
           />
         </>
       )}
       {adminRole && (
         <AdminRole
           tutorialToken={tutorialToken}
           minterRoleKey={minterRoleKey}
           minterRole={minterRole}
           burnerRoleKey={burnerRoleKey}
           burnerRole={burnerRole}
           adminAddress={account}
         />
       )}
     </div>
   );
}

export default Home;
