const SPOTS = [
  [6, 14, 0, 16], [18, 62, 1.2, 12], [32, 8, 2.1, 18], [47, 84, 0.6, 12], [58, 28, 3, 14],
  [70, 70, 1.8, 18], [82, 16, 2.6, 12], [90, 54, 0.9, 16], [12, 90, 3.4, 12], [76, 40, 1.4, 10],
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c.7 6.4 5.6 11.3 12 12-6.4.7-11.3 5.6-12 12-.7-6.4-5.6-11.3-12-12C6.4 11.3 11.3 6.4 12 0z" />
    </svg>
  )
}

export default function Sparkles() {
  return (
    <div className="aurora" aria-hidden="true">
      <i /><i /><i /><i />
      {SPOTS.map(([top, left, delay, size], n) => (
        <span key={n} className="sparkle" style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s`, width: size, height: size }}>
          <Star />
        </span>
      ))}
    </div>
  )
}
