import styles from "./card.module.css";
import Heart from "../../assets/img/heart.svg";
import HeartFilled from "../../assets/img/heartFilled.svg";
import Comment from "../../assets/img/comment.svg";
import Share from "../../assets/img/share.svg";
import Info from "../../assets/img/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
	const [liked, setLiked] = useState(false);

	const handleNotification = (type) => {
		setLiked(true);

		socket.emit("sendNotification", {
			senderName: user,
			receiverName: post.username,
			type,
		});
	};
	const handleMsg = () => {
		socket.emit("sendText", {
			senderName: user,
			receiverName: post.username,
			text: "hello this is chat message",
		});
	};
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<img src={post.userImg} alt="" className={styles.userImg} />
				<span>{post.fullName}</span>
			</div>
			<img src={post.postImg} alt="" className={styles.postImg} />
			<div className={styles.interaction}>
				{liked ? (
					<img src={HeartFilled} alt="" className={styles.cardIcon} />
				) : (
					<img
						src={Heart}
						alt=""
						className={styles.cardIcon}
						onClick={() => handleNotification(1)}
					/>
				)}
				<img
					src={Comment}
					alt=""
					className={styles.cardIcon}
					onClick={() => handleMsg()}
				/>
				<img
					src={Share}
					alt=""
					className={styles.cardIcon}
					//onClick={() => handleNotification(3)}
				/>
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
