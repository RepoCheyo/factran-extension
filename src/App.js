/* global chrome */
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Loading from './pages/loading';

function App() {
  const [tokenExists, setTokenExists] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const getToken = () => {
    chrome.storage.local.get(['Authorization']).then((result) => {
      if (result.Authorization) {
        setTokenExists(true);
      }
      setLoadingScreen(false);
    });
  };

  useEffect(() => {
    // chrome.storage.local.clear();
    setTimeout(() => {
      getToken();
    }, 250);
  }, [tokenExists]);

  return (
    <div className="App">
      {loadingScreen && <Loading />}
      {tokenExists ? <Home /> : <Login />}
    </div>
  );
}

export default App;
