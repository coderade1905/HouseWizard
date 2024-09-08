import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase.js';
import '../styles/Profile.css';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { CssVarsProvider } from "@mui/joy/styles";
import translation from './translation/translation.js';
import { HomeContext } from '../App';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(HomeContext);
  const [data, setData] = useState({ extras: [], price: 0, bednum: 0, description: "", youtube: "", type: "" });
  function SelectMultiple({ values, setValues, disabled }) {
    const handleChange = (event, newValue) => {
      setValues({ ...values, extras: newValue });
    };
    return (
      <Select
        value={values.extras}
        disabled={disabled}
        multiple
        onChange={handleChange}
        sx={{
          minWidth: '13rem',
          color: '#fff !important',
          backgroundColor: "#333 !important",
          border: "1px solid #777 !important"
        }}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        <Option value="wifi">Wifi</Option>
        <Option value="kitchen">Kitchen</Option>
        <Option value="tv">TV</Option>
        <Option value="parking">Parking</Option>
        <Option value="heating">Heating</Option>
      </Select>
    );
  }
  useEffect(() => {
    const fetchListing = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data: listing, error: fetchError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        navigate('/mylistings');
      } else if (listing.user_id !== user.user.id) {
        navigate('/mylistings');
      }
      setData(listing);
    };
    fetchListing();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.type != "") {
      const { data: user } = await supabase.auth.getUser()
      try {
        const { data1, error } = await supabase
          .from('listings')
          .update(data)
          .eq('id', id)
          .eq('user_id', user.user.id)

        if (error) {
          console.error('Error updating listing:', error)
        } else {
          console.log('Listing updated:', data1)
        }
        navigate(`/listing/${id}`);
      } catch (error) {
        console.error('Error updating listing:', error);
      }
    }
  };

  return (
    <CssVarsProvider defaultMode="dark">
      <div className="edit-profile-container">
        <h2>{translation[language]['edt']}</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">{translation[language]['new']} {translation[language]['pr']}</label>
            <input
              type="number"
              id="Price"
              name="Price"
              min={0}
              value={data.price}
              onChange={(e) => { setData({ ...data, price: e.target.value }) }}
              required
            />
          </div>
          <div className="form-group" style={{ display: data?.bednum == 0 ? "none" : "block" }}>
            <label htmlFor="bednum">{translation[language]['new']} {translation[language]['bdnum']}</label>
            <input
              type="number"
              id="bednum"
              name="bednum"
              min={0}
              value={data.bednum}
              onChange={(e) => { setData({ ...data, bednum: e.target.value }) }}
              required={data?.bednum == 0 ? false : true}
            />
          </div>
          <div className="form-group" style={{ display: data?.type == "lnd" ? "none" : "block" }}>
            <label htmlFor="">{translation[language]['new']} {translation[language]['amen']}</label>
            <SelectMultiple values={data} setValues={setData} disabled={data?.type == "lnd" ? true : false} />
          </div>
          <div className="form-group">
            <label htmlFor="description">{translation[language]['new']} {translation[language]['desc']}</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              value={data.description}
              onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
          </div>
          <div className="form-group">
            <label htmlFor="">{translation[language]['new']} {translation[language]['ytv']}</label>
            <input
              type="text"
              id="youtube"
              name="youtube"
              min={0}
              max={10}
              value={data.youtube}
              onChange={(e) => { setData({ ...data, youtube: e.target.value }) }}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">{translation[language]['edt']}</button>
          </div>
        </form>
      </div>
    </CssVarsProvider>
  );
};

export default EditListing;
