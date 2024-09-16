import React from 'react'
import styles from "./Card.module.css"
function Card({ name, description, image, onClick }) {
    return (
        <>
            {/* <div className={styles.card}>
                    <div className={styles.profilePic}>

                    </div>
                    
            </div> */}
            <div className={styles.card} onClick={onClick}>
                {image && <img src={image} alt={name} className={styles.cardImage} />}
                <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{name}</h3>
                    <p className={styles.cardDescription}>{description}</p>
                </div>
            </div>
        </>
    )
}

export default Card
