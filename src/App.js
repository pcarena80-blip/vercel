import React, { useState, useEffect } from 'react';
import './App.css';
import LazyLoadComponent from './components/LazyLoadComponent';
import ScrollLazyLoad from './components/ScrollLazyLoad';

// Sample data
const sampleData = [
  { id: 1, title: "Product 1", description: "This is a beautiful product with amazing features", price: "$99", image: "https://picsum.photos/300/200?random=1" },
  { id: 2, title: "Product 2", description: "High quality product with premium design", price: "$149", image: "https://picsum.photos/300/200?random=2" },
  { id: 3, title: "Product 3", description: "Innovative product with cutting-edge technology", price: "$199", image: "https://picsum.photos/300/200?random=3" },
  { id: 4, title: "Product 4", description: "Elegant design with superior functionality", price: "$129", image: "https://picsum.photos/300/200?random=4" },
  { id: 5, title: "Product 5", description: "Modern product with sleek aesthetics", price: "$179", image: "https://picsum.photos/300/200?random=5" },
  { id: 6, title: "Product 6", description: "Premium quality with exceptional performance", price: "$249", image: "https://picsum.photos/300/200?random=6" },
  { id: 7, title: "Product 7", description: "Revolutionary design with advanced features", price: "$299", image: "https://picsum.photos/300/200?random=7" },
  { id: 8, title: "Product 8", description: "Sophisticated product with elegant styling", price: "$159", image: "https://picsum.photos/300/200?random=8" },
  { id: 9, title: "Product 9", description: "Professional grade with outstanding quality", price: "$189", image: "https://picsum.photos/300/200?random=9" },
  { id: 10, title: "Product 10", description: "Exclusive product with limited availability", price: "$399", image: "https://picsum.photos/300/200?random=10" },
  { id: 11, title: "Product 11", description: "Luxury product with premium materials", price: "$499", image: "https://picsum.photos/300/200?random=11" },
  { id: 12, title: "Product 12", description: "Artisan crafted with attention to detail", price: "$349", image: "https://picsum.photos/300/200?random=12" },
  { id: 13, title: "Product 13", description: "Contemporary design with modern appeal", price: "$229", image: "https://picsum.photos/300/200?random=13" },
  { id: 14, title: "Product 14", description: "Innovative technology with smart features", price: "$279", image: "https://picsum.photos/300/200?random=14" },
  { id: 15, title: "Product 15", description: "Sustainable product with eco-friendly design", price: "$199", image: "https://picsum.photos/300/200?random=15" },
  { id: 16, title: "Product 16", description: "Versatile product with multiple applications", price: "$169", image: "https://picsum.photos/300/200?random=16" },
  { id: 17, title: "Product 17", description: "Durable construction with long-lasting quality", price: "$259", image: "https://picsum.photos/300/200?random=17" },
  { id: 18, title: "Product 18", description: "Compact design with powerful performance", price: "$189", image: "https://picsum.photos/300/200?random=18" },
  { id: 19, title: "Product 19", description: "User-friendly interface with intuitive controls", price: "$219", image: "https://picsum.photos/300/200?random=19" },
  { id: 20, title: "Product 20", description: "Advanced features with cutting-edge innovation", price: "$329", image: "https://picsum.photos/300/200?random=20" },
];

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🔄 Lazy Loading Demo</h1>
          <p>Scroll-based lazy loading with smooth animations</p>
        </header>

        {/* Removed tabs and directly render scroll lazy load */}
        <ScrollLazyLoad data={sampleData} />
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
