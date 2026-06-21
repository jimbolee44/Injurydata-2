import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type Row = Record<string, string>

function parseCSV(text: string): { headers: string[]; rows: Row[] } {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const out: string[][] = []
  let field = ''
  let row: string[] = []
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else { inQuotes = false }
      } else { field += c }
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); out.push(row); row = []; field = '' }
      else if (c === '\r') { /* skip */ }
      else field += c
    }
  }
  if (field.length || row.length) { row.push(field); out.push(row) }
  const headers = out.shift() ?? []
  const rows = out.filter(r => r.some(v => v !== '')).map(r => {
    const obj: Row = {}
    headers.forEach((h, idx) => { obj[h] = r[idx] ?? '' })
    return obj
  })
  return { headers, rows }
}

export async function loadCases() {
  const file = path.join(process.cwd(), '20WC_202511.csv')
  const text = await readFile(file, 'utf8')
  return parseCSV(text)
}
