import React from 'react';
import { fetchExchangeRate } from "./func";

function App() {
  const fetchData = async () => {
    let data = await fetchExchangeRate('3wNf5tfXGjytedr8fF3AUEljbd30YBED');
    console.log(data);
  }

  return (
    <button onClick={fetchData}>ddd</button>
  );
}

export default App;
