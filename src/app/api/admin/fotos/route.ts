import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { createClient } from "@/lib/supabase/server";
import { ERLAUBTE_FOTOTYPEN } from "@/lib/admin/fotos";

export const runtime = "nodejs";

/**
 * Stellt dem Browser eine einmalige Berechtigung aus, ein Foto direkt zu
 * Vercel Blob hochzuladen. Die Datei läuft damit nicht durch diesen Server —
 * der nähme ohnehin nur 4,5 MB je Anfrage an.
 *
 * Berechtigungen gibt es nur für eine angemeldete Sitzung, nur für Bilder,
 * nur bis 20 MB und nur in den Ordnern der App.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const antwort = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pfad) => {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Nicht angemeldet.");
        if (!/^objekte\/[\w-]+\/[\w.-]+$/.test(pfad)) throw new Error("Unzulässiger Ablageort.");

        return {
          allowedContentTypes: [...ERLAUBTE_FOTOTYPEN],
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        };
      },
    });
    return NextResponse.json(antwort);
  } catch (error) {
    console.error("Foto-Berechtigung verweigert:", error);
    return NextResponse.json({ error: "Das Foto konnte nicht hochgeladen werden." }, { status: 400 });
  }
}
