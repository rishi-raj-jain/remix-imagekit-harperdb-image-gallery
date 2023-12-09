export default function ({ url, alt, loading, className }: { url: string; alt: string; loading?: 'lazy' | 'eager'; className?: string }) {
  return (
    <img
      alt={alt}
      src={url}
      loading={loading || 'lazy'}
      style={{ backgroundImage: `url(${url + '?tr=bl-50'})`, transform: 'translate3d(0, 0, 0)' }}
      className={[className, 'bg-cover bg-center bg-no-repeat transform will-change-auto'].filter((i) => i).join(' ')}
    />
  )
}
