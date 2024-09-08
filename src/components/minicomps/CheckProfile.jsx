import supabase from '../../supabase.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';


// Check if the logged-on user exists in the `user_info` table
export default function CheckUserExists() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const check = async () => {
        const { data: user, error } = await supabase.auth.getUser()
        if (currentPath != '/login') {
            if (error || !user) {
                navigate('/login');
            }
            else {
                const { data, error: queryError } = await supabase
                    .from('user_info')
                    .select('*')
                    .eq('uid', user?.user?.id) // Assuming the user_id in `user_info` matches the authenticated user's ID

                if (queryError) {
                    return false
                }

                // Check if any records were returned
                if (data.length > 0) {
                    return true
                } else {
                    if (currentPath != '/profile') {
                        navigate('/profile');
                    }
                }
            }
        }

    }
    useEffect(() => {
        // Get the currently logged-in user
        check();
    }, [location])
}

