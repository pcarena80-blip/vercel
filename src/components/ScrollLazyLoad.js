import React, { useState, useEffect, useRef, useCallback } from 'react';
import LazyLoadComponent from './LazyLoadComponent';
import './ScrollLazyLoad.css';

const ScrollLazyLoad = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const loadingRef = useRef();

  const ITEMS_PER_LOAD = 6;

  // Initialize with first batch of items
  useEffect(() => {
    loadMoreItems();
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  const loadMoreItems = useCallback(() => {
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
    }, 800); // Simulate network delay
  }, [currentIndex, data, loading, hasMore]);

  const getAnimationType = (index) => {
    const animations = ['fade-in', 'slide-in', 'scale-in', 'bounce-in'];
    return animations[index % animations.length];
  };

  return (
    <div className="scroll-lazy-container">
      <div className="scroll-info">
        <h3>📜 Scroll-based Lazy Loading</h3>
        <p>Scroll down to automatically load more items. Currently showing {visibleItems.length} of {data.length} items.</p>
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

      {loading && (
        <div className="loading-container" ref={loadingRef}>
          <div className="loading-spinner"></div>
          <p>Loading more items...</p>
        </div>
      )}

      {!hasMore && visibleItems.length > 0 && (
        <div className="end-message">
          <p>🎉 All items loaded! You've reached the end.</p>
        </div>
      )}

      {visibleItems.length === 0 && !loading && (
        <div className="empty-state">
          <p>No items to display.</p>
        </div>
      )}
    </div>
  );
};

export default ScrollLazyLoad; 