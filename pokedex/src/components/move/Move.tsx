import { move } from "@/app/useful/interfaces"
import styles from "./Move.module.css"

export default function Move({ name, level }: {name:string, level:number}){

    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.bubble}>
                    <h3 className={styles.text}>{level}</h3>
                </div>
                <div className={styles.bubble}>
                    <h3 className={styles.text}>{name}</h3>
                </div>
            </div>
            
        </div>
    )
}