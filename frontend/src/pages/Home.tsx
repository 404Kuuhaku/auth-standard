import { Typography } from "@mui/material";
import { useEffect } from "react";

const HomePage = () => {
	useEffect(() => {}, []);
	return (
		<>
			<Typography
				variant="h2"
				component="h2"
				sx={{ textAlign: "center" }}
			>
				Home Page
			</Typography>
			<Typography
				variant="h5"
				component="h5"
				sx={{ textAlign: "center" }}
			>
				Do you have an account?
			</Typography>
		</>
	);
};

export default HomePage;
