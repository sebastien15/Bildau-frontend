import React, {  useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);


  // call fetch reports on page load
    // fetch reports api
    // let results;
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reports');
        const data = response.data;
        let result = data.elements.map((item, i) => {
          return (
            <div className="row border-dark border w-75 mx-auto p-2" key={i}>
              <div className="col-md-4">
                <div className="row">
                  <p><span>Id:</span> {item.id}</p>
                </div>
                <div className="row">
                  <p><span>State:</span> {item.state}</p>
                </div>
                <div className="row">
                  <a href="/">Details</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <p><span>Type:</span> {item.payload.reportType}</p>
                </div>
                <div className="row">
                  <p><span>Message:</span> {item.payload.message}...</p>
                </div>
              </div>
              <div className="col-md-2">
                <div className="row">
                  <button
                    type="button"
                    onClick={handleBlock}
                    data-id={item.id}
                    className="btn btn-light border-dark border"
                  >
                    Block
                  </button>
                </div>
                <div className="row mt-2">
                  <button
                    type="button"
                    onClick={handleResolve}
                    data-id={item.id}
                    className="btn btn-light border-dark border"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          );
        });
        setResults([...results, result]);
      } catch (error) {
        console.log(error);
      }
    };


    useEffect(() => {
      fetchReports();
    }, [])
    

  // handle Block to block a spam
  const handleBlock = async (e) => {
    e.preventDefault();

    let reportId = e.target.dataset.id;
    
    try {
      const response = await axios.delete(`http://localhost:8000/reports/${reportId}`);
      const data = response.data;
      console.log(data);
      // update the list of reports
      fetchReports();
    } catch (error) {
      console.log(error);
    }

  };

  // handle resolve to resolve a spam
  const handleResolve = async (e) => {
    e.preventDefault();

    let reportId = e.target.dataset.id;

    try {
      const response = await axios.put(`http://localhost:8000/reports/${reportId}`, {
        "state": "CLOSED"
      });

      const data = response.data;
      console.log(data);
      // update the list of reports
      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="App">
      <div className="container pt-5">
        {results}
      </div>
    </div>
  );
}

export default App;
