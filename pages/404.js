import Link from 'next/link'
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <AcademicCapIcon className="mx-auto h-20 w-auto text-gray-400" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            404: Page not found
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8 space-x-2 flex justify-center">
          <Link href="/" legacyBehavior>
            <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
              Go back home
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}