import React, { useState, useEffect } from 'react';
import supabase from '../supabase.js';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // To store the authenticated user
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        telegram: '',
        instagram: '',
        uid: '', // Will be set after the user is fetched
    });

    // Load initial profile data (if available)
    useEffect(() => {
        const fetchUserAndProfile = async () => {
            // Fetch the authenticated user
            const { data: userResponse, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error('Error fetching user:', userError);
                return;
            }

            const userData = userResponse.user;
            setUser(userData);

            if (userData?.id) {
                // Fetch the user's profile from the database
                const { data, error } = await supabase
                    .from('user_info')
                    .select('*')
                    .eq('UID', userData.id)
                    .single(); // Assuming each user has one profile

                if (data) {
                    setProfile({
                        firstName: data.FirstName || '',
                        lastName: data.LastName || '',
                        phoneNumber: data.PhoneNumber || '',
                        email: data.Email || '',
                        telegram: data.Telegram || '',
                        instagram: data.Instagram || '',
                        uid: data.UID,
                    });
                }

                if (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        fetchUserAndProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("user_info")
            .update({
                FirstName: profile.firstName,
                LastName: profile.lastName,
                PhoneNumber: profile.phoneNumber,
                Email: profile.email,
                Telegram: profile.telegram,
                Instagram: profile.instagram,
            })
            .eq('UID', user.id); // Update the record with the matching UID

        if (error) {
            console.error("Error updating profile:", error);
        } else {
            console.log("Profile updated:", data);
            navigate('/');
        }
    };


    return (
        <div className="edit-profile-container">
            <h2>Profile and Contact</h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telegram">Telegram username</label>
                    <input
                        type="text"
                        id="telegram"
                        name="telegram"
                        value={profile.telegram}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram Username</label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={profile.instagram}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-btn">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
