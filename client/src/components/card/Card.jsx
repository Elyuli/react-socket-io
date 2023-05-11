import styles from "./card.module.css";
import Heart from "../../assets/img/heart.svg";
import HeartFilled from "../../assets/img/heartFilled.svg";
import Comment from "../../assets/img/comment.svg";
import Share from "../../assets/img/share.svg";
import Info from "../../assets/img/info.svg";

const Card = ({ post }) => {
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<img src={post.userImg} alt="" className={styles.userImg} />
				<span>{post.fullName}</span>
			</div>
			<img src={post.postImg} alt="" className={styles.postImg} />
			<div className={styles.interaction}>
				<img src={Heart} alt="" className={styles.cardIcon} />
				<img src={Comment} alt="" className={styles.cardIcon} />
				<img src={Share} alt="" className={styles.cardIcon} />
				<img
					src={Info}
					alt=""
					className={`${styles.cardIcon} ${styles.infoIcon}`}
				/>
			</div>
		</div>
	);
};

export default Card;
