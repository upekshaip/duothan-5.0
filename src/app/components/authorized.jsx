import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>

        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please log in with your
          team credentials to continue.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/login">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
              Go to Login
            </button>
          </Link>

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 transition duration-200"
          >
            Return to Home
          </button>
        </div>

        {/* Auto-redirect notice */}
        <div className="mt-6 text-sm text-gray-500">
          <p>You will be redirected to login in 5 seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
