import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { Block } from '../../../utils/types'

interface SavePayload {
  id?: string
  title?: string
  blocks?: Block[]
  fontScale?: number
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const supabase = createPagesServerClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return res.status(401).json({ error: 'Vous devez être connecté pour sauvegarder le CV.' })
  }

  let payload: SavePayload

  try {
    payload = req.body as SavePayload
  } catch {
    return res.status(400).json({ error: 'Payload invalide.' })
  }

  if (!Array.isArray(payload.blocks)) {
    return res.status(400).json({ error: 'La liste des blocs est manquante ou invalide.' })
  }

  const title = typeof payload.title === 'string' && payload.title.trim().length > 0 ? payload.title.trim() : 'Mon CV'
  const fontScale = typeof payload.fontScale === 'number' ? payload.fontScale : 1

  const upsertValues: Record<string, unknown> = {
    user_id: session.user.id,
    title,
    blocks: payload.blocks,
    font_scale: fontScale,
  }

  if (payload.id) {
    upsertValues.id = payload.id
  }

  const { data, error } = await supabase
    .from('user_cvs')
    .upsert(upsertValues, { onConflict: 'id', returning: 'representation' })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true, cv: data?.[0] })
}

export default handler
