import supabase from '../../supabase.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


// Check if the logged-on user exists in the `user_info` table
export default function CheckUserExists() {
    const navigate = useNavigate();
    const check = async () => {
        const { data: user, error } = await supabase.auth.getUser()

        if (error || !user) {
            navigate('/login');
        }

        // Query the `user_info` table using the user's unique identifier (e.g., user.id)
        const { data, error: queryError } = await supabase
            .from('user_info')
            .select('*')
            .eq('UID', user.user.id) // Assuming the user_id in `user_info` matches the authenticated user's ID

        if (queryError) {
            console.log('Error querying user_info table:', queryError)
            return false
        }

        // Check if any records were returned
        if (data.length > 0) {
            console.log('User exists in user_info table.')
            return true
        } else {
            navigate('/profile');
        }
    }
    useEffect(() => {
          // Get the currently logged-in user
          check();
    }, [])
}

