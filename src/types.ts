export interface Meme {
  id: string;
  name: string;
  description: string;
  media_url: string;
  media_type: 'image' | 'video';
  thumbnail_url: string | null;
  created_at: string;
  /** Nama pembuat/uploader (misal "Fly you Fools") -- opsional */
  credit_name?: string | null;
  /** Link profil pembuat (misal https://x.com/namauser) -- opsional */
  credit_url?: string | null;
}

export interface MemeInput {
  name: string;
  description: string;
  media_url: string;
  media_type: 'image' | 'video';
  thumbnail_url: string | null;
}

/** Filter jenis konten di menu galeri */
export type MediaFilter = 'all' | 'video' | 'photo';

export interface ApiListResponse {
  memes: Meme[];
}

export interface ApiMemeResponse {
  meme: Meme;
}
