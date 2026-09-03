"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Loader2, UploadCloud, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getStoragePathFromPublicUrl, validateImageFile, PROPERTY_IMAGES_BUCKET } from "@/lib/supabase/storage";

export function ImageUploader({
  initialImages,
  folder,
}: {
  initialImages: string[];
  folder: string;
}) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const supabase = createClient();
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage.from(PROPERTY_IMAGES_BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });

      if (uploadError) {
        setError(`Upload fehlgeschlagen: ${uploadError.message}`);
        continue;
      }

      const { data } = supabase.storage.from(PROPERTY_IMAGES_BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    if (uploaded.length > 0) {
      setImages((current) => [...current, ...uploaded]);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(index: number) {
    const url = images[index];
    setImages((current) => current.filter((_, i) => i !== index));

    const path = url ? getStoragePathFromPublicUrl(url) : null;
    if (path) {
      startTransition(async () => {
        const supabase = createClient();
        await supabase.storage.from(PROPERTY_IMAGES_BUCKET).remove([path]);
      });
    }
  }

  function move(index: number, direction: -1 | 1) {
    setImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  }

  return (
    <div>
      <input type="hidden" name="images" value={images.join("\n")} />

      <div
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-surface-soft/50 px-6 py-8 text-center transition-colors hover:border-accent"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
      >
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden="true" />
        ) : (
          <UploadCloud className="h-6 w-6 text-text-muted" aria-hidden="true" />
        )}
        <p className="text-sm text-text-muted">
          Bilder hierher ziehen oder <span className="font-medium text-ink">durchsuchen</span>
        </p>
        <p className="text-xs text-text-muted/70">JPG, PNG, WebP oder AVIF · max. 8 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={image} className="group relative aspect-square overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview grid, not a public LCP image */}
              <img src={image} alt="" className="h-full w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-sm bg-ink/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Titelbild
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Nach links verschieben"
                  className="rounded p-1 text-white disabled:opacity-30"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Bild entfernen"
                  className="rounded p-1 text-white hover:text-red-300"
                  disabled={isPending}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label="Nach rechts verschieben"
                  className="rounded p-1 text-white disabled:opacity-30"
                >
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
