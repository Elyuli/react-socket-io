import styles from "./navbar.module.css";
import Notification from "../../assets/img/notification.svg";
import Message from "../../assets/img/message.svg";
import Settings from "../../assets/img/settings.svg";

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<span className={styles.logo}>LOGO</span>
			<div className={styles.icons}>
				<div className={styles.icon}>
					<img src={Notification} alt="" className={styles.iconImg} />
					<div className={styles.counter}>2</div>
				</div>
				<div className={styles.icon}>
					<img src={Message} alt="" className={styles.iconImg} />
					<div className={styles.counter}>2</div>
				</div>
				<div className={styles.icon}>
					<img src={Settings} alt="" className={styles.iconImg} />
					<div className={styles.counter}>2</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
