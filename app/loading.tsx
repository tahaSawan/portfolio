/**
 * Shown briefly while a route segment resolves — matte shell + tiny accent line.
 * CSS-only motion; no client JS.
 */
export default function Loading() {
  return (
    <div
      className="loading-route fixed inset-0 z-[35] flex min-h-dvh flex-col items-center justify-center bg-page"
      role="status"
      aria-live="polite"
    >
      <div className="loading-route__line h-0.5 w-14 rounded-full bg-accent/40" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}
