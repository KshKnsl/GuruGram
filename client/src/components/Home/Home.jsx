import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Card from '../Card/Card';

function Home() {
  const texts = ["Marketing", "AWS", "Career", "Web Development", "Data Science", "UI/UX Design", "Finance", "Healthcare", "Education", "Art", "Music"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Cycle through the texts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleClick = (text) => {
    alert(`Card for ${text} clicked!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgdiv}>
        <div className={styles.main}>
          <div className={styles.uptext}>
            Want to learn a new skill ??
          </div>
          <div className={styles.textContainer}>
            <div id={styles.beforePart}>Get 1-on-1  &nbsp;</div>
            <div id={styles.changingPart}>{texts[currentTextIndex]}</div>
            <div id={styles.afterPart}>
              Mentorship
            </div>
          </div>
          <div className={styles.searchBar}></div>
        </div>

        <div className={styles.parentContainer}>
          <div className={styles.scrollingContent}>
            {texts.map((text, index) => (
              <Card
                key={index}
                name="Mentor 1"
                description="Expert in Marketing"
                domainStatement="Specialized in Marketing"
                image="https://via.placeholder.com/300x150"
                onClick={() => handleClick(text)}
                style={{
                  transform: `translateX(${(index - currentTextIndex) * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;