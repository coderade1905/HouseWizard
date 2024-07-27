// src/Slideshow.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Slideshow.css';


function Slideshow(allPhotos) {
  console.log(allPhotos, 3);
  for (let index = 0; index < allPhotos.allPhotos.length; index++) {
    console.log(allPhotos.allPhotos[index], 5);
    
  }
  const [photos, setPhotos] = useState(allPhotos);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {allPhotos.allPhotos.forEach((photo, index) => {
          <div key={index}>
            <img src="https://firebasestorage.googleapis.com/v0/b/housefind-88ebb.appspot.com/o/files%2Fmsg1055900924-15714.jpg?alt=media&token=ddbb7cd7-d78f-40f7-95bb-b4e660ba2205" alt="abc" />
          </div>
        })}
      </Slider>
    </div>
  );
};

export default Slideshow;
