// Importing modules
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collections = require("./config");
const collection = require("./config");

const app = express();

// Convert data to JSON
app.use(express.json());

// indicating static files
app.use(express.static("public"));
app.use(express.static("src"));

// URL encoding
app.use(express.urlencoded({ extended: false }));

// EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/dashboard", (req, res) => {
	res.render("dashboard");
});

app.post("/signup", async (req, res) => {
	const data = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	};

	const existingUser = await collection.findOne({
		$or: [{ username: data.username }, { email: data.email }],
	});

	if (existingUser) {
		if (existingUser.username === data.username) {
			return res.status(400).render("error", {
				title: "Signup Error",
				message: "Username already exists",
				redirectUrl: "/signup",
			});
		}
		if (existingUser.email === data.email) {
			return res.status(400).render("error", {
				title: "Signup Error",
				message: "Email already exists",
				redirectUrl: "/signup",
			});
		}
	} else {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(data.password, saltRounds);

		data.password = hashedPassword;

		const userData = await collection.insertMany(data);
		console.log(userData);
		res.redirect("/login");
	}
});

app.post("/login", async (req, res) => {
	try {
		const data = {
			email: req.body.email,
			password: req.body.password,
		};

		const existingUser = await collection.findOne({ email: data.email });

		if (!existingUser) {
			return res.status(400).render("error", {
				title: "Login Error",
				message: "User does not exist",
				redirectUrl: "/login",
			});
		}

		const isPasswordMatch = await bcrypt.compare(
			data.password,
			existingUser.password
		);

		if (!isPasswordMatch) {
			return res.status(400).render("error", {
				title: "Login Error",
				message: "Wrong password",
				redirectUrl: "/login",
			});
		} else {
			res.redirect("/dashboard");
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).render("error", {
			title: "Internal Server Error",
			message: "Something went wrong. Please try again later.",
			redirectUrl: "/login",
		});
	}
});

const port = 8000;

app.listen(port, () => {
	console.log(`server listening on ${port}`);
});
