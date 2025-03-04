import React, { useState } from 'react';

const SignIn = ({ onSignIn, toggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    localStorage.setItem("userEmail", email);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8065/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-in failed");
      }

      const data = await response.json();
      if (!data.token) throw new Error("Token not received");

      onSignIn(data.token);
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div style={styles.container}>
      <div  style={styles.header}>
              <h2  style={{ color: 'rgb(0, 137, 193)' }}>Sign In</h2>
            </div>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSignIn} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input} 
          />
        </div>
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
      <p style={styles.toggleRegister} onClick={toggleRegister}>
        Don't have an account? Register
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '35px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color : '#565656'
  },
  input: {
    padding: '10px',
    borderRadius: '14px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    backgroundColor: '#e3f2fd',
    color: '#0089c1',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  toggleRegister: {
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'pointer',
    color: '#0089c1',
  },
};

export default SignIn;
