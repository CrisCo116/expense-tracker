import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  // Get the error information from the route
  const error = useRouteError();

  // Log the error to the console
  console.error(error);

  // JSX for the ErrorPage component
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* Display error details if available */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}