/**
 * Solange eine Seite lädt, stehen ihre Umrisse schon da — ruhige Flächen
 * statt eines Drehkreises. So springt beim Laden nichts.
 */
export default function AdminLaedt() {
  const flaeche = "animate-pulse rounded-[22px] bg-[#E8EDF1]";
  return (
    <div aria-busy="true" aria-label="Wird geladen">
      <div className={`${flaeche} h-9 w-64 rounded-[12px]`} />
      <div className={`${flaeche} mt-3 h-5 w-48 rounded-[10px]`} />
      <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className={`${flaeche} h-32`} />
        ))}
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className={`${flaeche} h-80`} />
        ))}
      </div>
    </div>
  );
}
