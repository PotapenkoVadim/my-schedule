"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);

  return (
    <div>
      <div>Something went wrong!</div>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
