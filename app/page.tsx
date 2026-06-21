import { loadCases } from '@/lib/csv'
import CasesTable from './CasesTable'

export default async function Page() {
  const { headers, rows } = await loadCases()
  return (
    <main>
      <div className="topbar">
        <div>
          <h1>Workers Comp Cases — 20WC_202511</h1>
          <div className="sub">{rows.length} records loaded from 20WC_202511.csv</div>
        </div>
        <form method="post" action="/api/logout">
          <button className="logout" type="submit">Sign out</button>
        </form>
      </div>
      <CasesTable headers={headers} rows={rows} />
    </main>
  )
}
