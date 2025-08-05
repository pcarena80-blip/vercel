import React, { useState, useEffect } from 'react';
import './LazyLoadComponent.css';

const LazyLoadComponent = ({ item, index, animationType = 'fade-in' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, index * 100); // Staggered loading effect

    return () => clearTimeout(timer);
  }, [index]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // Still mark as loaded even if image fails
  };

  if (!isLoaded) {
    return (
      <div className="lazy-item-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`lazy-item ${animationType}`}>
      <div className="item-image-container">
        <img
          src={item.image}
          alt={item.title}
          className={`item-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
      
      <div className="item-content">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-price">{item.price}</div>
        
        <button className="item-button">
          View Details
        </button>
      </div>
    </div>
  );
};

export default LazyLoadComponent; 