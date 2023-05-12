import styles from "./navbar.module.css";
import Notification from "../../assets/img/notification.svg";
import Message from "../../assets/img/message.svg";
import Settings from "../../assets/img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
	const [notifications, setNotifications] = useState([]);
	const [msg, setMsg] = useState([]);
	const [open, setOpen] = useState(false);
	const [openMsg, setOpenMsg] = useState(false);

	useEffect(() => {
		socket.on("getNotification", (data) => {
			setNotifications((prev) => [...prev, data]);
		});
		return () => socket.off("getNotification");
	}, [socket]);

	useEffect(() => {
		socket.on("getText", (data) => {
			setMsg((prev) => [...prev, data]);
		});
		return () => socket.off("getText");
	}, [socket]);

	console.log("notifications", notifications);

	const displayNotification = ({ senderName, type }, index) => {
		let action;

		switch (type) {
			case 1:
				action = "liked";
				break;
			case 2:
				action = "commented";
				break;

			default:
				action = "shared";
				break;
		}

		return (
			<span key={index} className={styles.notification}>
				{senderName} {action} your post
			</span>
		);
	};

	const displayMsg = (m, index) => {
		return (
			<span key={index} className={styles.notification}>
				{m.senderName} {m.text}
			</span>
		);
	};

	const handleReadNotification = () => {
		setNotifications([]);
		setOpen(false);
	};
	const handleReadMsg = () => {
		setMsg([]);
		setOpenMsg(false);
	};

	return (
		<div className={styles.navbar}>
			<span className={styles.logo}>LOGO</span>
			<div className={styles.icons}>
				<div
					className={styles.icon}
					onClick={() => {
						setOpenMsg(false);
						setOpen(!open);
					}}
				>
					<img src={Notification} alt="" className={styles.iconImg} />
					{notifications.length > 0 && (
						<div className={styles.counter}>{notifications.length}</div>
					)}
				</div>
				<div
					className={styles.icon}
					onClick={() => {
						setOpen(false);
						setOpenMsg(!openMsg);
					}}
				>
					<img
						src={Message}
						alt=""
						className={styles.iconImg}
						onClick={displayMsg}
					/>
					{msg.length > 0 && <div className={styles.counter}>{msg.length}</div>}
				</div>
				<div className={styles.icon}>
					<img src={Settings} alt="" className={styles.iconImg} />
				</div>
			</div>
			{open && (
				<div className={styles.notifications}>
					{notifications.map((n, i) => displayNotification(n, i))}
					<button className={styles.nButton} onClick={handleReadNotification}>
						Mark as read
					</button>
				</div>
			)}
			{openMsg && (
				<div className={styles.msg}>
					{msg.map((m, i) => displayMsg(m, i))}
					<button className={styles.nButton} onClick={handleReadMsg}>
						Mark as read
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
