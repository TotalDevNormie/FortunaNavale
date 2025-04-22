// app/routes/root-redirect.tsx
import { redirect } from "react-router";
import type { LoaderFunction } from "react-router"; // Use standard RR type

// Define your default language code (consider putting this in a shared config)
const DEFAULT_LANG = "en";

// Loader function to perform the redirect
export const loader: LoaderFunction = async () => {
  // Redirect to the root path of the default language
  return redirect(`/${DEFAULT_LANG}`);
};

// A component is still required by the route definition,
// but it will likely never render because the loader redirects immediately.
export default function RootRedirectComponent() {
  // You can render null or a simple loading message
  return null;
  // Or: return <p>Loading language...</p>;
}
