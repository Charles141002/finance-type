import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Identifiant manquant.' })
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
    .select('id, title, blocks, font_scale, updated_at, created_at')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .maybeSingle()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: 'CV introuvable.' })
  }

  return res.status(200).json({ cv: data })
}

export default handler
