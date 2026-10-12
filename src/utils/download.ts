/** Nama file download: ambil dari akhir URL (misal /memes/doge.jpg -> doge.jpg) */
export function fileNameFromUrl(url: string): string {
  const clean = url.split('?')[0].split('#')[0];
  const base = clean.substring(clean.lastIndexOf('/') + 1);
  return base || 'meme';
}

/**
 * Download media meme. Untuk file dari domain yang sama, file benar-benar
 * ter-download; kalau gagal (misal URL luar diblokir CORS), fallback buka
 * file di tab baru.
 */
export async function downloadMedia(url: string, filename?: string): Promise<void> {
  const name = filename ?? fileNameFromUrl(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
