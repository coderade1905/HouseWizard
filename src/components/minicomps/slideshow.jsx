import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export function Slideshow({allPhotos}) {
  return (
    <Carousel>
      {allPhotos.map((image, index) => (
        <div key={index}>
          <img style={{maxHeight: "300px"}} src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Carousel>
  );
}

