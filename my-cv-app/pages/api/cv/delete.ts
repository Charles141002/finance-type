import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
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

  const { error } = await supabase
    .from('user_cvs')
    .delete({ returning: 'minimal' })
    .eq('id', id)
    .eq('user_id', session.user.id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true })
}

export default handler
