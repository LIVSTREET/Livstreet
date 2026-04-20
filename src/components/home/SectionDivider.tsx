/**
 * Subtle decorative divider between homepage sections.
 * Uses the sage accent color to add a quiet rhythm without breaking
 * the calm, premium feel.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`} aria-hidden>
      <span className="h-px w-10 bg-accent/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
      <span className="h-px w-10 bg-accent/40" />
    </div>
  );
}
