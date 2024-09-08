import React from 'react';
import supabase from '../supabase.js';

const Login = () => {

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Error with Google sign-in:', error.message);
    }
  };


  return (
    <div style={{ width: "100%", height: "80vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: "90%", maxWidth: "400px", textAlign: "center" }}>
        <h2>Sign in to your account</h2>

        <button
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
