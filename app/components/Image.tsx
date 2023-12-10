import { ImageProps } from '@/lib/types'

export default function ({ url, alt, width, height, loading, className, backgroundImage }: ImageProps) {
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
