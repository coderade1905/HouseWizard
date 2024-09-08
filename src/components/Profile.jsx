import React, { useState, useEffect, useContext } from 'react';
import supabase from '../supabase.js';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import translation from './translation/translation.js';
import { HomeContext } from '../App';

const EditProfile = () => {
    const navigate = useNavigate();
    const { language } = useContext(HomeContext);
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
    const [first, setFirst] = useState(true);

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
                    .eq('uid', userData.id)
                    .single(); // Assuming each user has one profile

                if (data) {
                    setFirst(false);
                    setProfile({
                        firstName: data.firstname || '',
                        lastName: data.lastname || '',
                        phoneNumber: data.phonenumber || '',
                        email: data.email || '',
                        telegram: data.telegram || '',
                        instagram: data.instagram || '',
                        uid: data.uid,
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
        if (first) {
            const { data, error } = await supabase
                .from("user_info")
                .insert({
                    firstname: profile.firstName,
                    lastname: profile.lastName,
                    phonenumber: profile.phoneNumber,
                    email: profile.email,
                    telegram: profile.telegram,
                    instagram: profile.instagram,
                    uid: user.id
                })

            if (error) {
                console.error("Error updating profile:", error);
            } else {
                navigate('/');
            }
        }
        else {
            const { data, error } = await supabase
                .from("user_info")
                .update({
                    firstname: profile.firstName,
                    lastname: profile.lastName,
                    phonenumber: profile.phoneNumber,
                    email: profile.email,
                    telegram: profile.telegram,
                    instagram: profile.instagram,
                })
                .eq('uid', user.id);

            if (error) {
                console.error("Error updating profile:", error);
            } else {
                navigate('/');
            }
        }
    };


    return (
        <div className="edit-profile-container">
            <h2>{translation[language]['pc']}</h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">{translation[language]['fn']}</label>
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
                    <label htmlFor="lastName">{translation[language]['ln']}</label>
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
                    <label htmlFor="phoneNumber">{translation[language]['pn']}</label>
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
                    <label htmlFor="email">{translation[language]['em']}</label>
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
                    <label htmlFor="telegram">{translation[language]['tg']}</label>
                    <input
                        type="text"
                        id="telegram"
                        name="telegram"
                        value={profile.telegram}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">{translation[language]['ig']}</label>
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
