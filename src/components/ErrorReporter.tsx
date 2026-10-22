"use client";

import { useEffect } from "react";

type ReporterProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorReporter({ error, reset }: ReporterProps) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground">
              An unexpected error occurred.
            </p>
          </div>
          <div className="space-y-2">
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error details
                </summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                  {error.message}
                  {error.stack ? `\n\n${error.stack}` : ""}
                  {error.digest ? `\n\nDigest: ${error.digest}` : ""}
                </pre>
              </details>
            )}
            <button
              type="button"
              onClick={reset}
              className="bg-primary text-primary-foreground px-4 py-2 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
