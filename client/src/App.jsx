import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import posts from "./assets/data";
import { io } from "socket.io-client";

function App() {
	const [username, setUsername] = useState("");
	const [user, setUser] = useState("");
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io("http://localhost:3500", {
			transports: ["websocket"],
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, []);

	useEffect(() => {
		socket?.emit("newUser", user);
		return () => socket?.removeListener("newUser");
	}, [socket, user]);

	return (
		<div className={styles.container}>
			{user ? (
				<>
					<Navbar socket={socket} />
					{posts.map((post) => (
						<Card key={post.id} post={post} socket={socket} user={user} />
					))}

					<span className={styles.username}>{username}</span>
				</>
			) : (
				<div className={styles.login}>
					<input
						type="text"
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button onClick={() => setUser(username)}>Login</button>
				</div>
			)}
		</div>
	);
}

export default App;
