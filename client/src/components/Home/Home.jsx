import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Card from '../Card/Card';

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

    const handleClick = () => {
        alert('Card clicked!');
    };

    return (
        <>
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
                    <div className="searchBar"></div>
                </div>

                <div className={styles.parentContainer}>
                    <div className={styles.scrollingContent}>
                        <Card
                            name="John Doe"
                            description="A passionate software developer."
                            image="https://via.placeholder.com/300x150"
                            onClick={handleClick}
                        />
                        <Card />
                        <Card />
                        <Card />
                        <Card />

                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;