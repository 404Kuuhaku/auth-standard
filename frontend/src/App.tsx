import { useState } from "react";
import "./App.css";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Link,
	TextField,
	Typography,
} from "@mui/material";
// import Divider from "@mui/material/Divider";

function App() {
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	const validateInputs = () => {
		const email = document.getElementById("email") as HTMLInputElement;
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

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage(
				"Password must be at least 6 characters long."
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
			<Typography>Hello Test Auth</Typography>
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
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Link
								component="button"
								onClick={handleClickOpen}
								variant="body2"
								sx={{ alignSelf: "baseline" }}
							>
								Forgot your password?
							</Link>
						</Box>
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
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					{/* <ForgotPassword open={open} handleClose={handleClose} /> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={validateInputs}
					>
						Sign in
					</Button>
					<Typography sx={{ textAlign: "center" }}>
						Don&apos;t have an account?{" "}
						<span>
							<Link
								href="/material-ui/getting-started/templates/sign-in/"
								variant="body2"
								sx={{ alignSelf: "center" }}
							>
								Sign up
							</Link>
						</span>
					</Typography>
				</Box>
				{/* <Divider>or</Divider>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Button
					type="submit"
					fullWidth
					variant="outlined"
					onClick={() => alert("Sign in with Google")}
					startIcon={<GoogleIcon />}
				>
					Sign in with Google
				</Button>
				<Button
					type="submit"
					fullWidth
					variant="outlined"
					onClick={() => alert("Sign in with Facebook")}
					startIcon={<FacebookIcon />}
				>
					Sign in with Facebook
				</Button>
			</Box> */}
			</Box>
		</>
	);
}

export default App;
