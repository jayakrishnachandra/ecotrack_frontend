import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import loadingGif from './Loading_2.gif';

const Profile = ({ token, setToken }) => {
    const [userData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        const fetchUsageData = async () => {
            try {
                const response = await fetch('https://render-ecotrack.onrender.com/userData', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const usageData = await response.json();
                console.log("Fetched user data:", usageData);
                setData(usageData);
            } catch (err) {
                console.error("Fetch error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsageData();
    }, [token]);

    const handleSignOut = () => {
      window.location.reload()
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <img 
                    src={loadingGif} 
                    alt="Loading..." 
                    style={styles.loadingGif} 
                />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

    return (
      <>
        <h1 style={styles.header}>User Profile</h1>
        <div className="container" style={styles.container}>

            {/* Card for Email */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5>Email</h5>
                </div>
                <div className="card-body">
                    <p><span style={styles.boldText}>{userData.email}</span></p>
                </div>
            </div>

            {/* Card for Men Count */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5>Men Count</h5>
                </div>
                <div className="card-body">
                    <p><span style={styles.boldText}>{userData.men_count}</span></p>
                </div>
            </div>

            {/* Card for Room Count */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5>Room Count</h5>
                </div>
                <div className="card-body">
                    <p><span style={styles.boldText}>{userData.room_count}</span></p>
                </div>
            </div>

            {/* Card for Total Water Usage Limit */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5>Total Water Usage Limit</h5>
                </div>
                <div className="card-body">
                    <p><span style={styles.boldText}>{userData.totalWaterUsageLimit}</span> Litres</p>
                </div>
            </div>

            {/* Card for Total Electricity Usage Limit */}
            <div className="card mb-3">
                <div className="card-header">
                    <h5>Total Electricity Usage Limit</h5>
                </div>
                <div className="card-body">
                    <p><span style={styles.boldText}>{userData.totalElectricityUsageLimit}</span> Kwh</p>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
        </div>
        
        </>
    );
};

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loadingGif: {
        width: '100px',
        height: '100px',
    },
    container: {
        display: 'flex',
        borderRadius: "10px",
        padding: "20px",
        flexWrap: 'wrap',
        gap: "20px",
    },
    header: {
        textAlign: 'center',
        color: 'rgb(0, 137, 193)',
        width: '100%',
        marginTop: '50px',
    },
    signOutButton: {
        margin: '10px auto',
        padding: '10px 20px',
        backgroundColor: 'rgb(0, 137, 193)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    boldText: {
        fontWeight: 'bold',
        color: "#0089c1"
    },
};

export default Profile;
