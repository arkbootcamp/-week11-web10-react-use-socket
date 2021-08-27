import io from 'socket.io-client'
import {useEffect} from 'react'
function App() {
  useEffect(() => {
    const socket = io('http://localhost:4000')
    console.log(socket);
  }, [])
  return (
    <div className="App">
      <h1>Aplikasi react socket</h1>
    </div>
  );
}

export default App;
