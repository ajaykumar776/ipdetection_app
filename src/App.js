import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [publicIp, setPublicIp] = useState('');
    const [publicIpDetails, setPublicIpDetails] = useState({});
    const [localIpDetails, setLocalIpDetails] = useState({});

    useEffect(() => {
        // Fetch Public IP
        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setPublicIp(data.ip);
                // Fetch details using the public IP
                return fetch(`http://ip-api.com/json/${data.ip}`);
            })
            .then(response => response.json())
            .then(data => setPublicIpDetails(data))
            .catch(error => console.error('Error fetching public IP details:', error));

        // Fetch Local IP and system details
        fetch('https://ipdetection-backend.onrender.com/api/ip')
            .then(response => response.json())
            .then(data => setLocalIpDetails(data))
            .catch(error => console.error('Error fetching local IP and system details:', error));
    }, []);

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
                        <p>{localIpDetails.localIp}</p>
                        {localIpDetails.systemDetails && (
                            <div className="details">
                                <p><strong>OS Type:</strong> {localIpDetails.systemDetails.osType}</p>
                                <p><strong>Platform:</strong> {localIpDetails.systemDetails.osPlatform}</p>
                                <p><strong>OS Release:</strong> {localIpDetails.systemDetails.osRelease}</p>
                                <p><strong>Total Memory:</strong> {localIpDetails.systemDetails.totalMemory}</p>
                                <p><strong>Free Memory:</strong> {localIpDetails.systemDetails.freeMemory}</p>
                                <p><strong>CPUs:</strong> {localIpDetails.systemDetails.cpus}</p>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
