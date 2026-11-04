import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you requested does not exist or has been moved.
          </p>
          <div className="pt-2">
            <Link
              href="/en"
              className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Go to Nomads Pipa
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
