import { loadCases } from '@/lib/csv'
import CasesTable from './CasesTable'

export const dynamic = 'force-static'

export default async function Page() {
  const { headers, rows } = await loadCases()
  return (
    <main>
      <h1>Workers Comp Cases — 20WC_202511</h1>
      <div className="sub">{rows.length} records loaded from 20WC_202511.csv</div>
      <CasesTable headers={headers} rows={rows} />
    </main>
  )
}
