const mongoose = require("mongoose");
require("dotenv").config();

const connect = mongoose.connect(process.env.DB_URI);

connect
	.then(() => {
		console.log("Database connected");
	})
	.catch(() => {
		console.log("Database could not be connected");
	});

const LoginSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
		minlength: 6,
	},
});

// collection port
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
