import type { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

const DEFAULT_LIMIT = 30
const MAX_LIMIT = 100

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

  const { limit: limitParam, offset: offsetParam, search: searchParam, sort: sortParam } = req.query

  const parseNumberParam = (value: string | string[] | undefined, fallback: number) => {
    if (typeof value === 'undefined') return fallback
    const firstValue = Array.isArray(value) ? value[0] : value
    const parsed = Number.parseInt(firstValue, 10)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  const limitFromQuery = parseNumberParam(limitParam, DEFAULT_LIMIT)
  const limit = limitFromQuery === 0 ? 0 : Math.min(Math.max(limitFromQuery, 1), MAX_LIMIT)
  const offset = Math.max(parseNumberParam(offsetParam, 0), 0)
  const search = typeof searchParam === 'string' ? searchParam.trim() : Array.isArray(searchParam) ? searchParam[0]?.trim() ?? '' : ''

  const sortMapping: Record<string, { column: 'updated_at' | 'created_at' | 'title'; ascending: boolean }> = {
    updated_desc: { column: 'updated_at', ascending: false },
    updated_asc: { column: 'updated_at', ascending: true },
    created_desc: { column: 'created_at', ascending: false },
    created_asc: { column: 'created_at', ascending: true },
    title_asc: { column: 'title', ascending: true },
    title_desc: { column: 'title', ascending: false },
  }

  const sortKey = typeof sortParam === 'string' ? sortParam : Array.isArray(sortParam) ? sortParam[0] : undefined
  const { column: sortColumn, ascending } = sortMapping[sortKey ?? ''] ?? sortMapping.updated_desc

  let query = supabase
    .from('user_cvs')
    .select('id, title, updated_at, created_at', { count: 'exact' })
    .eq('user_id', session.user.id)

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  query = query.order(sortColumn, { ascending })

  const rangeLimit = limit === 0 ? null : limit

  if (rangeLimit) {
    query = query.range(offset, offset + rangeLimit - 1)
  }

  const { data, error, count } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const total = typeof count === 'number' ? count : data?.length ?? 0

  return res.status(200).json({ cvs: data ?? [], total })
}

export default handler
