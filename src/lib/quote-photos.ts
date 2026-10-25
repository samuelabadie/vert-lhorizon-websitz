export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function photoError(files: File[]): string | null {
  if (files.length > MAX_PHOTOS) return "Vous pouvez ajouter 5 photos maximum.";
  if (files.some(file => !PHOTO_TYPES.includes(file.type))) return "Choisissez des photos JPG, PNG ou WebP.";
  if (files.some(file => file.size === 0 || file.size > MAX_PHOTO_BYTES)) return "Chaque photo doit peser moins de 8 Mo et ne pas être vide.";
  if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) return "L’ensemble des photos doit peser moins de 20 Mo.";
  return null;
}
