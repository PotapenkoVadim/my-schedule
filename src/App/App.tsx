import { ErrorBoundary } from "react-error-boundary";
import Router from "./Router";
import { ErrorPage } from "@/views";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={() => <ErrorPage />}>
      <Router />
    </ErrorBoundary>
  );
}