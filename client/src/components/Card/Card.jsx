import React from 'react';
import styles from './Card.module.css';

const Card = ({ name, description, domainStatement, image, onClick, style }) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.scrollingContent}>
        <div className={styles.mentorContainer}>
          <div className={styles.card}>
            <img src={image} alt={name} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h2 className={styles.cardName}>{name}</h2>
              <p className={styles.cardDescription}>{description}</p>
              <p className={styles.domainStatement}>{domainStatement}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;