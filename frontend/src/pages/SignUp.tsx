import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";

const SignUpPage = () => {
	const navigate = useNavigate();
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		const username = data.get("username");
		const password = data.get("password");

		try {
			const response = await axios.post(
				"http://localhost:8000/auth/register",
				{
					username,
					email,
					password,
				}
			);

			if (response.status === 200) {
				navigate("/sign-in");
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	const validateInputs = () => {
		const email = document.getElementById("email") as HTMLInputElement;
		const username = document.getElementById(
			"username"
		) as HTMLInputElement;
		const password = document.getElementById(
			"password"
		) as HTMLInputElement;

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage("Please enter a valid email address.");
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage("");
		}

		if (!username.value || !/^[a-zA-Z0-9_-]+$/.test(username.value)) {
			setUsernameError(true);
			setUsernameErrorMessage(
				"Username can only contain letters, numbers, dashes (-), and underscores (_)."
			);
			isValid = false;
		} else {
			setUsernameError(false);
			setUsernameErrorMessage("");
		}

		if (!password.value || password.value.length < 4) {
			setPasswordError(true);
			setPasswordErrorMessage(
				"Password must be at least 4 characters long."
			);
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage("");
		}

		return isValid;
	};

	return (
		<>
			<Typography
				variant="h2"
				component="h2"
				sx={{ textAlign: "center" }}
			>
				Register Page
			</Typography>
			<Box
				sx={{
					width: { xs: "80vw", md: "50vw", lg: "20vw" },
					height: "100vh",
					mx: "auto",
					my: "auto",
				}}
			>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						gap: 2,
					}}
				>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							error={emailError}
							helperText={emailErrorMessage}
							id="email"
							type="email"
							name="email"
							placeholder="your@email.com"
							autoComplete="email"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color={emailError ? "error" : "primary"}
							sx={{ ariaLabel: "email" }}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="username">Username</FormLabel>
						<TextField
							error={usernameError}
							helperText={usernameErrorMessage}
							id="username"
							type="text"
							name="username"
							placeholder="yourusername"
							autoComplete="username"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color={usernameError ? "error" : "primary"}
							sx={{ ariaLabel: "username" }}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							error={passwordError}
							helperText={passwordErrorMessage}
							name="password"
							placeholder="••••••"
							type="password"
							id="password"
							autoComplete="current-password"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color={passwordError ? "error" : "primary"}
						/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={validateInputs}
					>
						Sign up
					</Button>
					<Typography sx={{ textAlign: "center" }}>
						Have an account?{" "}
						<span>
							<Link
								href="/sign-in/"
								variant="body2"
								sx={{ alignSelf: "center" }}
							>
								Sign in
							</Link>
						</span>
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default SignUpPage;
