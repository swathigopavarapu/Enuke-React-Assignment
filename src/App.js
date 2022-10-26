import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setTableData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTableData();
  }, []);


 const getTableData = () =>{
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`).then(res =>{
      let result = Object.values(res.data?.[`Time Series (5min)`]).map(Object.values);
      setTableData(Object.entries(res.data?.[`Time Series (5min)`]))
      setLoading(false)
    })
  }


  return (
    <div className="App">
      <h2>
        
        
      </h2>

     {loading ? <div>Loading, Please wait...</div> : 
      <div className="fixTableHead">
        <table>
      <thead>
    <th>DateTime</th>
    <th>Open</th>
    <th>High</th>
    <th>Low</th>
    <th>Close</th>
    <th>Volume</th>
  </thead>
  <tbody>
  {data.map((item,index) =>{
        return <>
   <tr key={item[0]}>
   <td>{item[0]}</td>
    <td>{item[1]?.[`1. open`]}</td>
    <td>{item[1]?.[`2. high`]}</td>
    <td>{item[1]?.[`3. low`]}</td>
    <td>{item[1]?.[`4. close`]}</td>
    <td>{item[1]?.[`5. volume`]}</td>
  </tr>
  </> 
 })  }
 </tbody>
</table>
</div> }
    </div>
  );
}

export default App;
