import React, { useState, useEffect } from 'react';
import LazyLoadComponent from './LazyLoadComponent';
import './ButtonLazyLoad.css';

const ButtonLazyLoad = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_LOAD = 4;

  // Initialize with first batch of items
  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const nextItems = data.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);
      
      if (nextItems.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setVisibleItems(prev => [...prev, ...nextItems]);
      setCurrentIndex(prev => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 600); // Simulate network delay
  };

  const resetItems = () => {
    setVisibleItems([]);
    setCurrentIndex(0);
    setHasMore(true);
    setLoading(false);
    
    // Load initial items after reset
    setTimeout(() => {
      loadMoreItems();
    }, 100);
  };

  const getAnimationType = (index) => {
    const animations = ['fade-in', 'slide-in', 'scale-in', 'bounce-in'];
    return animations[index % animations.length];
  };

  return (
    <div className="button-lazy-container">
      <div className="button-info">
        <h3>🔘 Button-based Lazy Loading</h3>
        <p>Click the "Load More" button to load additional items. Currently showing {visibleItems.length} of {data.length} items.</p>
      </div>

      <div className="items-grid">
        {visibleItems.map((item, index) => (
          <LazyLoadComponent
            key={item.id}
            item={item}
            index={index}
            animationType={getAnimationType(index)}
          />
        ))}
      </div>

      <div className="button-controls">
        {hasMore && (
          <button 
            className={`load-more-button ${loading ? 'loading' : ''}`}
            onClick={loadMoreItems}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Loading...
              </>
            ) : (
              'Load More Items'
            )}
          </button>
        )}

        {!hasMore && visibleItems.length > 0 && (
          <div className="end-message">
            <p>🎉 All items loaded!</p>
            <button className="reset-button" onClick={resetItems}>
              Reset and Start Over
            </button>
          </div>
        )}

        {visibleItems.length === 0 && !loading && (
          <div className="empty-state">
            <p>No items to display.</p>
            <button className="reset-button" onClick={resetItems}>
              Load Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonLazyLoad; 
