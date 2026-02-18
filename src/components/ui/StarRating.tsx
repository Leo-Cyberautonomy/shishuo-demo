import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
  interactive?: boolean
  onChange?: (rating: number) => void
}

export default function StarRating({ rating, size = 16, interactive = false, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${interactive ? 'cursor-pointer' : ''} transition-colors duration-150`}
          style={{ width: size, height: size }}
          fill={i <= rating ? '#D4A853' : 'none'}
          stroke={i <= rating ? '#D4A853' : '#D2D2D7'}
          strokeWidth={1.5}
          onClick={() => interactive && onChange?.(i)}
        />
      ))}
    </div>
  )
}
