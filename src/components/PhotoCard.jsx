
export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="min-w-0 truncate font-medium text-slate-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={
            isFavorite ? "Remove from favourites" : "Add to favourites"
          }
          aria-pressed={isFavorite}
          className={`shrink-0 rounded-full p-2 text-2xl leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 ${
            isFavorite
              ? "text-rose-500"
              : "text-slate-400 hover:text-rose-500"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}
