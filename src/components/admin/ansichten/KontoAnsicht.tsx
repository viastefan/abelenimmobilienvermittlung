import { LogOut, Mail, Smartphone } from "lucide-react";
import { signOut } from "@/app/admin/actions";
import { support } from "@/data/support";
import { PasswortFormular } from "../PasswortFormular";
import { Karte, Seitenkopf, knopf } from "../ui";

export function KontoAnsicht({ email }: { email?: string }) {
  return (
    <>
      <Seitenkopf
        titel="Ihr Zugang"
        unterzeile={
          email ? (
            <>
              Angemeldet als <span className="font-semibold text-ink">{email}</span>
            </>
          ) : undefined
        }
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <Karte titel="Passwort ändern" beschreibung="Ab dem Speichern melden Sie sich mit dem neuen Passwort an.">
          <PasswortFormular />
        </Karte>

        <div className="space-y-5 lg:space-y-6">
          <Karte titel="Als App auf dem Telefon">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-accent-soft text-accent-deep">
                <Smartphone className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <p className="text-[0.9375rem] leading-relaxed text-text-muted">
                Öffnen Sie diese Seite auf dem iPhone in Safari, tippen Sie unten auf <span className="font-semibold text-ink">Teilen</span> und
                dann auf <span className="font-semibold text-ink">Zum Home-Bildschirm</span>. Ab dann öffnet sich alles mit einem Tipp — wie jede
                andere App. Auf Android heißt es im Menü <span className="font-semibold text-ink">Zum Startbildschirm hinzufügen</span>.
              </p>
            </div>
          </Karte>

          <Karte titel="Fragen zur App?">
            <p className="text-[0.9375rem] leading-relaxed text-text-muted">
              {support.name} hilft gern — ob ein Passwort vergessen ist oder etwas anders aussehen soll.
            </p>
            <a href={`mailto:${support.email}?subject=${encodeURIComponent("Frage zur App")}`} className={`${knopf.zweit} mt-5`}>
              <Mail className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
              Nachricht schreiben
            </a>
          </Karte>
        </div>
      </div>

      <form action={signOut} className="mt-10 flex justify-center">
        <button type="submit" className={knopf.leise}>
          <LogOut className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
          Abmelden
        </button>
      </form>
    </>
  );
}
