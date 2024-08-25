import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import supabase from '../supabase.js';
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  return (
    <div style={{width: "100%", height: "100vh", display: "grid", placeItems: "center"}}>
          <div style={{width: "90%", maxWidth: "400px"}}>
            <Auth providers={['google']} supabaseClient={supabase}  appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                  inputText:"white"
                },
              },
            },
          }} />
        </div>
    </div>
  );
};

export default Login;