import React, { useEffect, useState } from 'react';
import './App.css'; // Create and import a CSS file for styling

function App() {
    const [ipData, setIpData] = useState({
        publicIp: '',
        publicIpDetails: {},
        localIp: '',
        systemDetails: {}
    });

    useEffect(() => {
        fetch('https://ipdetection-backend.onrender.com/api/ip')
            .then(response => response.json())
            .then(data => setIpData(data))
            .catch(error => console.error('Error fetching IP addresses:', error));
    }, []);

    const {
        publicIp,
        publicIpDetails,
        localIp,
        systemDetails
    } = ipData;

    return (
        <div className="App">
            <header className="App-header">
                <h1>IP Address Details</h1>
                <div className="grid-container">
                    <div className="card">
                        <h2>Public IP Address</h2>
                        <p>{publicIp}</p>
                        {publicIp && (
                            <div className="details">
                                <p><strong>Location:</strong> {publicIpDetails.city}, {publicIpDetails.region}, {publicIpDetails.country}</p>
                                <p><strong>ISP:</strong> {publicIpDetails.isp}</p>
                                <p><strong>Organization:</strong> {publicIpDetails.org}</p>
                                <p><strong>Hostname:</strong> {publicIpDetails.query}</p>
                            </div>
                        )}
                    </div>
                    <div className="card">
                        <h2>Local IP Address</h2>
                        <p>{localIp}</p>
                        {localIp && (
                            <div className="details">
                                <p><strong>OS Type:</strong> {systemDetails.osType}</p>
                                <p><strong>Platform:</strong> {systemDetails.osPlatform}</p>
                                <p><strong>OS Release:</strong> {systemDetails.osRelease}</p>
                                <p><strong>Total Memory:</strong> {systemDetails.totalMemory}</p>
                                <p><strong>Free Memory:</strong> {systemDetails.freeMemory}</p>
                                <p><strong>CPUs:</strong> {systemDetails.cpus}</p>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
