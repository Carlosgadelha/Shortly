import database from "../dataBase.js";

async function getUser(id) {

	const result = await database.query('SELECT * FROM users WHERE id=$1', [id]);
	return result.rows[0];

}

async function getUserEmail(email) {

	const result = await database.query('SELECT * FROM users WHERE email = $1', [email]);
	return result.rows[0];
}

async function newSession(token,userId){
	return database.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);
}

async function newUser(name, email, password) {

	return database.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
}

export const userRepository = {
	getUser,
	getUserEmail,
	newSession,
	newUser
}