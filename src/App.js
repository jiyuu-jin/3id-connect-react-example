import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';

function App() {
  useEffect(() => {
    try{
      (async() =>{
        if (window.ethereum) {
          const threeIdConnect = new ThreeIdConnect();
          const addresses = await window.ethereum.enable();
          console.log('Addresses', addresses);

          const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0]);
          console.log('AuthProvider', authProvider);

          await threeIdConnect.connect(authProvider);
          const didProvider = await threeIdConnect.getDidProvider();
          console.log('DIDProvider', didProvider);

          const ceramic = new Ceramic('https://gateway-clay.ceramic.network');
          console.log('Ceramic', ceramic);

          await ceramic.setDIDProvider(didProvider); // This line does not finish executing, just hangs.
          console.log("DID PROVIDER SET ");

          const idx = new IDX(ceramic);
          console.log("IDX Instance", idx);
          // console.log("Basic Profile", await idx.get('basicProfile'));
        }else{
          alert("Please connect MetaMask to use this site.")
        };
      })();
    }catch(error){
      console.error(error);
    };
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
