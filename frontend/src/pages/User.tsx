import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const UserPage = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	const fetchUser = useCallback(async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/user/profile",
				{
					withCredentials: true,
				}
			);
			const { username, email } = response.data;
			setUsername(username);
			setEmail(email);
		} catch (error) {
			navigate("/sign-in/");
			console.error("Error during registration:", error);
		}
	}, [navigate]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);
	return (
		<>
			<Box
				sx={{
					width: { xs: "80vw", md: "50vw", lg: "20vw" },
					height: { xs: "80vh", md: "50vh", lg: "20vh" },
					mx: "auto",
					my: "auto",
				}}
			>
				<Typography
					variant="h5"
					component="h5"
					sx={{ textAlign: "center" }}
				>
					{`hello ${username}, welcome to your profile`}
				</Typography>
				<Typography
					variant="h5"
					component="h5"
					sx={{ textAlign: "center" }}
				>
					{`This is your email ${email}`}
				</Typography>
			</Box>
		</>
	);
};

export default UserPage;
