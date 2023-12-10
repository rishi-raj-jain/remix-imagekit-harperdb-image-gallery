export default function ({
  url,
  alt,
  loading,
  className,
  backgroundImage,
  height,
  width,
}: {
  url: string
  alt?: string
  className?: string
  backgroundImage?: string
  loading?: 'lazy' | 'eager'
  height: number | string
  width: number | string
}) {
  return (
    <img
      src={url}
      width={width}
      height={height}
      alt={alt || ''}
      loading={loading || 'lazy'}
      style={{ backgroundImage: `url(${backgroundImage || url + '?tr=bl-50'})`, transform: 'translate3d(0, 0, 0)' }}
      className={[className, 'bg-cover bg-center bg-no-repeat transform will-change-auto'].filter((i) => i).join(' ')}
    />
  )
}
