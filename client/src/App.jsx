import { useState } from "react";
import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import posts from "./assets/data";

function App() {
	const [username, setUsername] = useState("");
	const [user, setUser] = useState("");

	return (
		<div className={styles.container}>
			{user ? (
				<>
					<Navbar />
					{posts.map((post) => (
						<Card key={post.id} post={post} />
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
