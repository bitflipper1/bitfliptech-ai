import './Logo.css'

// 5x7 pixel grids for B and F. Cells present in both stay lit;
// cells unique to one letter flip on/off, morphing B <-> F.
const B = ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X...X', 'X...X', 'XXXX.']
const F = ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'X....']

const CELL = 4
const GAP = 1

export default function Logo({ size = 22 }: { size?: number }) {
  const cells: { x: number; y: number; kind: 'both' | 'b' | 'f' }[] = []
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 5; x++) {
      const inB = B[y][x] === 'X'
      const inF = F[y][x] === 'X'
      if (!inB && !inF) continue
      cells.push({ x, y, kind: inB && inF ? 'both' : inB ? 'b' : 'f' })
    }
  }
  const w = 5 * (CELL + GAP) - GAP
  const h = 7 * (CELL + GAP) - GAP

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={(size * w) / h}
      height={size}
      className="logo"
      role="img"
      aria-label="BitFlip logo: pixel B flipping to F"
    >
      {cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x * (CELL + GAP)}
          y={c.y * (CELL + GAP)}
          width={CELL}
          height={CELL}
          className={`logo-cell logo-${c.kind}`}
        />
      ))}
    </svg>
  )
}
