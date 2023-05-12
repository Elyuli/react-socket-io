const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:5173/",
	},
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
	!onlineUsers.some((user) => user.username === username) &&
		onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
	return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
	console.log("User connected");

	//io.emit("firstEvent", "Hello this it test!");

	socket.on("newUser", (username) => {
		addNewUser(username, socket.id);
	});

	socket.on("sendNotification", ({ senderName, receiverName, type }) => {
		const receiver = getUser(receiverName);

		io.to(receiver.socketId).emit("getNotification", {
			senderName,
			type,
		});
	});
	socket.on("sendText", ({ senderName, receiverName, text }) => {
		const receiver = getUser(receiverName);

		io.to(receiver.socketId).emit("getText", {
			senderName,
			text,
		});
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
		removeUser(socket.id);
	});
});

httpServer.listen(3500, () => console.log("Listening"));
