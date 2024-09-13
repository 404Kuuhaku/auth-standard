interface IUser {
	_id: string;
	username: string;
	email: string;
	password: string;
	role: "user" | "dev" | "admin";
	createdAt: Date;
	updatedAt: Date;
}

export default IUser;
