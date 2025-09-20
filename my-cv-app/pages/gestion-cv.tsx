import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import DynamicHeader from '../components/DynamicHeader'
import { createInitialBlocks } from '../data/initialCV'

interface CvSummary {
  id: string
  title: string
  created_at: string
  updated_at: string
}

const PAGE_SIZE = 12

export default function GestionCvPage() {
  const router = useRouter()
  const [cvs, setCvs] = useState<CvSummary[]>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedSearch(searchTerm.trim())
    }, 350)

    return () => {
      window.clearTimeout(handler)
    }
  }, [searchTerm])

  const fetchPage = useCallback(
    async (targetPage: number, replace = false) => {
      setIsLoading(true)
      setError(null)
      const offsetValue = targetPage * PAGE_SIZE

      try {
        const params = new URLSearchParams({
          limit: PAGE_SIZE.toString(),
          offset: offsetValue.toString(),
        })

        if (debouncedSearch) {
          params.set('search', debouncedSearch)
        }

        const res = await fetch(`/api/cv/list?${params.toString()}`)
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de charger les CV.')
        }

        const { cvs: fetched, total: totalCount } = (await res.json()) as { cvs?: CvSummary[]; total?: number }
        const safeFetched = fetched ?? []

        setTotal(typeof totalCount === 'number' ? totalCount : null)
        setCvs((previous) => (replace ? safeFetched : [...previous, ...safeFetched]))

        const hasCount = typeof totalCount === 'number'
        setHasMore(
          hasCount ? offsetValue + safeFetched.length < totalCount : safeFetched.length === PAGE_SIZE
        )

        setPage(targetPage)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Impossible de charger les CV.')
        if (replace) {
          setCvs([])
          setHasMore(false)
          setTotal(null)
        }
      } finally {
        setIsLoading(false)
        setIsInitialLoad(false)
      }
    },
    [debouncedSearch]
  )

  useEffect(() => {
    fetchPage(0, true).catch(() => {})
  }, [debouncedSearch, fetchPage])

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return
    fetchPage(page + 1).catch(() => {})
  }

  const handleDeleteCv = async (id: string) => {
    if (deletingId) return
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('Supprimer ce CV ? Cette action est définitive.')
      if (!confirmed) {
        return
      }
    }

    setDeletingId(id)
    setError(null)
    try {
      const res = await fetch(`/api/cv/delete?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de supprimer le CV.')
      }

      setCvs((previous) => previous.filter((cv) => cv.id !== id))
      setTotal((previous) => (typeof previous === 'number' ? Math.max(previous - 1, 0) : null))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer le CV.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleCreateCv = async () => {
    if (isCreating) return
    setIsCreating(true)
    setError(null)
    try {
      const blocks = createInitialBlocks()
      const res = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Nouveau CV', blocks, fontScale: 1 }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de créer le CV.')
      }
      const { cv } = (await res.json()) as { cv?: { id: string } }
      if (cv?.id) {
        router.push({ pathname: '/cv', query: { id: cv.id } }).catch(() => {})
        return
      }
      fetchPage(0, true).catch(() => {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de créer le CV.')
    } finally {
      setIsCreating(false)
    }
  }

  const formatDate = useCallback(
    (value: string) =>
      new Date(value).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    []
  )

  const resultsLabel = useMemo(() => {
    if (typeof total === 'number') {
      return `${cvs.length} CV${cvs.length > 1 ? 's' : ''} affiché${cvs.length > 1 ? 's' : ''} sur ${total}`
    }
    return `${cvs.length} CV${cvs.length > 1 ? 's' : ''} chargé${cvs.length > 1 ? 's' : ''}`
  }, [cvs.length, total])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgba(2, 6, 23, 0.95)' }}>
      <DynamicHeader variant="landing" />
      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '32px 16px',
          color: '#e2e8f0',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '34px', fontWeight: 800, margin: 0 }}>Gestion des CV</h1>
            <p style={{ fontSize: '15px', color: '#cbd5f5', marginTop: '6px' }}>
              Recherchez, ouvrez ou supprimez vos CV sauvegardés. Chargez davantage d&apos;éléments pour explorer votre historique complet.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 220px', minWidth: '220px' }}>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher un CV par titre"
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(148, 163, 184, 0.4)',
                  backgroundColor: 'rgba(15, 23, 42, 0.55)',
                  color: '#e2e8f0',
                  fontSize: '14px',
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(148, 163, 184, 0.4)',
                    background: 'rgba(30, 41, 59, 0.8)',
                    color: '#cbd5f5',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Effacer
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleCreateCv}
              disabled={isCreating}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: '#fff',
                fontWeight: 700,
                cursor: isCreating ? 'not-allowed' : 'pointer',
                opacity: isCreating ? 0.7 : 1,
              }}
            >
              {isCreating ? 'Création…' : 'Créer un nouveau CV'}
            </button>
            <Link
              href="/cv"
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Retour à l&apos;éditeur
            </Link>
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>{resultsLabel}</div>
          {error && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}
        </header>

        <section
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '14px',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.7)' }}>
                  <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: '13px', color: '#cbd5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Titre du CV
                  </th>
                  <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: '13px', color: '#cbd5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Dernière modification
                  </th>
                  <th style={{ textAlign: 'left', padding: '14px 18px', fontSize: '13px', color: '#cbd5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Créé le
                  </th>
                  <th style={{ textAlign: 'right', padding: '14px 18px', fontSize: '13px', color: '#cbd5f5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cvs.map((cv, index) => (
                  <tr
                    key={cv.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.75)',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                    }}
                  >
                    <td style={{ padding: '16px 18px', fontSize: '15px', fontWeight: 600 }}>
                      {cv.title || 'CV sans titre'}
                    </td>
                    <td style={{ padding: '16px 18px', fontSize: '14px', color: '#cbd5f5' }}>{formatDate(cv.updated_at)}</td>
                    <td style={{ padding: '16px 18px', fontSize: '14px', color: '#94a3b8' }}>{formatDate(cv.created_at)}</td>
                    <td style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => router.push({ pathname: '/cv', query: { id: cv.id } }).catch(() => {})}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(59, 130, 246, 0.45)',
                            background: 'rgba(59, 130, 246, 0.15)',
                            color: '#bfdbfe',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          Ouvrir
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCv(cv.id)}
                          disabled={deletingId === cv.id}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.35)',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#fca5a5',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: deletingId === cv.id ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {deletingId === cv.id ? 'Suppression…' : 'Supprimer'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {cvs.length === 0 && !isInitialLoad && !isLoading && (
            <div style={{ padding: '32px', textAlign: 'center', color: '#cbd5f5', fontSize: '15px' }}>
              Aucun CV ne correspond à votre recherche.
            </div>
          )}
          {isLoading && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#cbd5f5', fontSize: '14px' }}>
              Chargement...
            </div>
          )}
        </section>

        {hasMore && (
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
              style={{
                padding: '12px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.45)',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#bfdbfe',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Chargement…' : 'Charger plus de CV'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=/gestion-cv',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
    },
  }
}
