import { SIGN_UP } from "../utils/mutations";
import { useState } from 'react';
import { useMutation } from '@apollo/client';


export default function SignUp() {
    const [SignupFormData, setSignupFormData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);

    const [signUp, { error }] = useMutation(SIGN_UP);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData({ ...SignupFormData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const { data } = await signUp({
                variables: {
                    email: SignupFormData.email,
                    password: SignupFormData.password,
                },
            });

            console.log('Sign-up successful:', data);

            // Redirect to the login page after successful signup
            window.location.href = '/login';
        } catch (error) {
            console.error('Sign-up error:', error.message);
            setShowAlert(true);
        }
    };
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto"
                        src="./src/assets/DALL·E 2024-01-03 18.30.23 - .png"
                        alt="Your Company"
                    />
                    <h2 className="mb-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignUp}>
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
                                    value={SignupFormData.email}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={SignupFormData.password}
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
                                Sign up
                            </button>
                        </div>
                    </form>

                    {showAlert && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-2 rounded">
                            {/* Display your error message here */}
                            Sign-up failed. Please try again.
                        </div>
                    )}

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a
                            href="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            onClick={() => {
                                window.location.href = '/login';
                            }}
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}