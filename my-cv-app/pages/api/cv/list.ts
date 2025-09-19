import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const supabase = createPagesServerClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return res.status(401).json({ error: 'Authentification requise.' })
  }

  const { data, error } = await supabase
    .from('user_cvs')
    .select('id, title, updated_at, created_at')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ cvs: data ?? [] })
}

export default handler
