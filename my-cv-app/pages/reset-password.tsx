import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

export default function ResetPasswordPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const session = useSession()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        throw updateError
      }
      setSuccess('Mot de passe mis à jour avec succès. Vous allez être redirigé.')
      setTimeout(() => {
        router.push('/login').catch(() => {})
      }, 1500)
    } catch (updateError) {
      if (updateError instanceof Error) {
        setError(updateError.message)
      } else {
        setError('Impossible de mettre à jour le mot de passe. Veuillez réessayer.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(2,6,23,0.96)' }}>
      <Head>
        <title>Réinitialiser le mot de passe | Finance CV</title>
      </Head>
      <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(15, 23, 42, 0.96)', padding: '32px', borderRadius: '18px', border: '1px solid rgba(148, 163, 184, 0.25)', boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)', color: '#e2e8f0', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Définir un nouveau mot de passe</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Choisissez un mot de passe robuste pour sécuriser votre compte.
        </p>

        {!session && (
          <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>
            Le lien n&apos;est plus valide ou a déjà été utilisé. Demandez un nouvel e-mail de réinitialisation.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
            Nouveau mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            autoComplete="new-password"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.35)', marginBottom: '18px', background: 'rgba(15, 23, 42, 0.65)', color: '#f8fafc' }}
          />

          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            autoComplete="new-password"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.35)', marginBottom: '18px', background: 'rgba(15, 23, 42, 0.65)', color: '#f8fafc' }}
          />

          {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          {success && <p style={{ color: '#34d399', fontSize: '13px', marginBottom: '12px' }}>{success}</p>}

          <button type="submit" disabled={isSubmitting || !session} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', opacity: session ? 1 : 0.5 }}>
            {isSubmitting ? 'Patientez…' : 'Enregistrer le nouveau mot de passe'}
          </button>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    props: {
      initialSession: session,
    },
  }
}
