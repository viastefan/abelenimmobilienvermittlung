/**
 * Jede Seite der App blendet sanft ein. Ein Template statt des Layouts:
 * das Layout bleibt beim Wechsel stehen, das Template entsteht neu.
 */
export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return <div className="seite-rein">{children}</div>;
}
