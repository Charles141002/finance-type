import { useEffect, useState } from 'react'
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

export default function MesCvPage() {
  const router = useRouter()
  const [cvs, setCvs] = useState<CvSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchCvs = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cv/list?limit=0')
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de charger les CV.')
      }
      const { cvs: list } = (await res.json()) as { cvs: CvSummary[] }
      setCvs(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les CV.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCvs().catch(() => {})
  }, [])

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
      await fetchCvs()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de créer le CV.')
    } finally {
      setIsCreating(false)
    }
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de supprimer le CV.')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (value: string) =>
    new Date(value).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgba(2, 6, 23, 0.95)' }}>
      <DynamicHeader variant="landing" />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 16px', color: '#e2e8f0', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Mes CV sauvegardés</h1>
          <p style={{ fontSize: '15px', color: '#cbd5f5' }}>
            Retrouvez tous vos CV générés. Cliquez sur l&apos;un d&apos;eux pour continuer la modification.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
              Revenir à l&apos;éditeur
            </Link>
            <Link
              href="/gestion-cv"
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.35)',
                color: '#cbd5f5',
                textDecoration: 'none',
                fontWeight: 600,
                background: 'rgba(30, 41, 59, 0.5)',
              }}
            >
              Gestion avancée
            </Link>
          </div>
          {error && (
            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 12px', borderRadius: '6px', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </header>

        {isLoading ? (
          <p style={{ color: '#cbd5f5' }}>Chargement...</p>
        ) : cvs.length === 0 ? (
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#cbd5f5' }}>Vous n&apos;avez pas encore de CV sauvegardé.</p>
            <button
              type="button"
              onClick={handleCreateCv}
              disabled={isCreating}
              style={{
                marginTop: '16px',
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
              {isCreating ? 'Création…' : 'Créer mon premier CV'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            <button
              type="button"
              onClick={handleCreateCv}
              disabled={isCreating}
              style={{
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px dashed rgba(59, 130, 246, 0.45)',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'left',
                color: '#93c5fd',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                cursor: isCreating ? 'not-allowed' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                opacity: isCreating ? 0.6 : 1,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={(event) => {
                const target = event.currentTarget
                if (!isCreating) {
                  target.style.transform = 'translateY(-2px)'
                  target.style.boxShadow = '0 10px 24px rgba(59, 130, 246, 0.25)'
                }
              }}
              onMouseLeave={(event) => {
                const target = event.currentTarget
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#bfdbfe' }}>+ Créer un autre CV</span>
              <span style={{ fontSize: '13px', color: '#cbd5f5' }}>
                Lance un nouveau CV vierge tout en conservant les précédents.
              </span>
            </button>

            {cvs.map((cv) => (
              <button
                key={cv.id}
                onClick={() => router.push({ pathname: '/cv', query: { id: cv.id } }).catch(() => {})}
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.25)',
                  borderRadius: '12px',
                  padding: '18px',
                  textAlign: 'left',
                  color: '#e2e8f0',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(event) => {
                  const target = event.currentTarget
                  target.style.transform = 'translateY(-2px)'
                  target.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.35)'
                }}
                onMouseLeave={(event) => {
                  const target = event.currentTarget
                  target.style.transform = 'translateY(0)'
                  target.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{cv.title || 'CV sans titre'}</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleDeleteCv(cv.id)
                    }}
                    disabled={deletingId === cv.id}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: deletingId === cv.id ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(event) => {
                      const target = event.currentTarget
                      if (deletingId !== cv.id) {
                        target.style.backgroundColor = 'rgba(239, 68, 68, 0.25)'
                      }
                    }}
                    onMouseLeave={(event) => {
                      const target = event.currentTarget
                      target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'
                    }}
                  >
                    {deletingId === cv.id ? 'Suppression…' : 'Supprimer'}
                  </button>
                </div>
                <span style={{ fontSize: '13px', color: '#cbd5f5' }}>Modifié le {formatDate(cv.updated_at)}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Créé le {formatDate(cv.created_at)}</span>
              </button>
            ))}
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
        destination: '/login?redirect=/mes-cv',
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
