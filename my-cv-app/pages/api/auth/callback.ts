import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  const { code, redirect } = req.query

  if (typeof code === 'string') {
    const supabase = createPagesServerClient({ req, res })
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return res.redirect(307, `/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  const candidate =
    (Array.isArray(redirect) ? redirect[0] : redirect) ??
    (typeof req.query.redirect_to === 'string' ? req.query.redirect_to : undefined)

  const destination = typeof candidate === 'string' && candidate.startsWith('/') ? candidate : '/cv'

  res.redirect(307, destination)
}

export default handler
