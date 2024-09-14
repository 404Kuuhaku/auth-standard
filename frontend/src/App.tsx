import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import UserPage from "./pages/User";
import HomePage from "./pages/Home";

const router = createBrowserRouter([
	{ path: "/", element: <HomePage /> },
	{ path: "/sign-in/", element: <SignInPage /> },
	{ path: "/sign-up/", element: <SignUpPage /> },
	{ path: "/user/", element: <UserPage /> },
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
