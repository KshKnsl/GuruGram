import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home() {
    const texts = ["Marketing", "AWS", "Career", ""];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Cycle through the texts every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 1750);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
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
                <div className="searchBar"></div>
            </div>
            
            <div className={styles.parentContainer}>
                <div className={styles.scrollingContent}>
                    <div className={styles.card}>Card 1</div>
                    <div className={styles.card}>Card 2</div>
                    <div className={styles.card}>Card 3</div>
                    <div className={styles.card}>Card 4</div>
                    <div className={styles.card}>Card 5</div>
                    <div className={styles.card}>Card 6</div>
                </div>
            </div>
            
        </>
    );
}

export default Home;