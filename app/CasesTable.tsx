'use client'
import { useMemo, useState } from 'react'

type Row = Record<string, string>

export default function CasesTable({ headers, rows }: { headers: string[]; rows: Row[] }) {
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let r = rows
    if (needle) {
      r = rows.filter(row => headers.some(h => row[h]?.toLowerCase().includes(needle)))
    }
    if (sortKey) {
      const k = sortKey
      const dir = sortDir === 'asc' ? 1 : -1
      const isDate = /date/i.test(k)
      r = [...r].sort((a, b) => {
        const av = a[k] ?? '', bv = b[k] ?? ''
        if (isDate) {
          const ad = Date.parse(av), bd = Date.parse(bv)
          if (!isNaN(ad) && !isNaN(bd)) return (ad - bd) * dir
        }
        return av.localeCompare(bv) * dir
      })
    }
    return r
  }, [q, rows, headers, sortKey, sortDir])

  const onSort = (h: string) => {
    if (sortKey === h) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(h); setSortDir('asc') }
  }

  return (
    <>
      <div className="controls">
        <input
          type="search"
          placeholder="Filter across all columns…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <span className="count">{filtered.length} shown</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {headers.map(h => (
                <th key={h} onClick={() => onSort(h)}>
                  {h}
                  <span className="arrow">{sortKey === h ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                {headers.map(h => <td key={h}>{row[h]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
