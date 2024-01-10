import { LOGIN_USER } from "../utils/mutations";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [loginMutation, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: { ...loginFormData },
      });

      if (data) {
        console.log("Login successful:", data);

        const { token, user } = data.login;
        console.log("API response:", { token, user });
        Auth.login(token);

        // Redirect to the homepage after successful login
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setShowAlert(true);
    }
  };

  // Check for GraphQL errors
  if (error) {
    console.error("GraphQL error:", error.message);
    // Handle error or update UI accordingly
  }
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto"
            src="./src/assets/DALL·E 2024-01-03 18.30.23 - .png"
            alt="Your Company"
          />
          <h2 className="mt- mb-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginFormData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          {showAlert && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-2 rounded">
              {/* Display your error message here */}
              Login failed. Please try again.
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;