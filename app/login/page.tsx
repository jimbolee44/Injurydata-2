export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next = '/', error } = await searchParams
  return (
    <main className="login-main">
      <form className="login-card" method="post" action="/api/login">
        <h1>Sign in</h1>
        <p className="sub">Enter the shared password to view the case data.</p>
        <input type="hidden" name="next" value={next} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
        />
        <button type="submit">Continue</button>
        {error ? <div className="error">Incorrect password.</div> : null}
      </form>
    </main>
  )
}
