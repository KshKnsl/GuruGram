import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Card from '../Card/Card';
import Testimonial from './Textimonial';

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

  return (<>
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

      <div className={styles.reasonsContainer}>
        <div className={styles.reason}>
          <h2>Enjoy on your TV</h2>
          <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          <img src="https://i.imgur.com/89tN78f.png" alt="TV" />
        </div>
        <div className={styles.reason}>
          <h2>Download your shows to watch offline</h2>
          <p>Save your favourites easily and always have something to watch.</p>
          <img src="https://i.imgur.com/YjW2v2r.png" alt="Download" />
        </div>
        <div className={styles.reason}>
          <h2>Watch everywhere</h2>
          <p>Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.</p>
          <img src="https://i.imgur.com/t0v885p.png" alt="Everywhere" />
        </div>
        <div className={styles.reason}>
          <h2>Create profiles for kids</h2>
          <p>Send kids on adventures with their favourite characters in a space made just for them - free with your membership.</p>
          <img src="https://i.imgur.com/gV2v47Z.png" alt="Kids" />
        </div>
      </div>
     
    </div>
     <Testimonial/>
     </>
  );
}

export default Home; 