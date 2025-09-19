import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'
import type { Session } from '@supabase/supabase-js'

const formContainerStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 55%), rgba(2, 6, 23, 0.96)',
  padding: '40px 16px',
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  background: 'rgba(15, 23, 42, 0.96)',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  borderRadius: '18px',
  padding: '32px',
  boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)',
  color: '#e2e8f0',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(148, 163, 184, 0.35)',
  marginBottom: '18px',
  fontSize: '15px',
  background: 'rgba(15, 23, 42, 0.65)',
  color: '#f8fafc',
}

const buttonStyle: CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: 'none',
  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '15px',
  cursor: 'pointer',
  marginTop: '8px',
  transition: 'all 0.2s ease',
}

const secondaryButtonStyle: CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid rgba(148, 163, 184, 0.45)',
  background: 'transparent',
  color: '#cbd5f5',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: '12px',
}

type AuthMode = 'signin' | 'signup'

type AuthErrors = {
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

interface LoginPageProps {
  initialSession?: Session | null
}

export default function LoginPage({ initialSession }: LoginPageProps) {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const session = useSession() ?? initialSession ?? null
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formErrors, setFormErrors] = useState<AuthErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flashMessage, setFlashMessage] = useState<string | null>(null)

  const redirectPath = useMemo(() => {
    const redirectParam = router.query.redirect
    if (Array.isArray(redirectParam)) {
      return redirectParam[0] ?? '/cv'
    }
    return redirectParam ?? '/cv'
  }, [router.query.redirect])

  useEffect(() => {
    if (session?.user) {
      router.replace(typeof redirectPath === 'string' ? redirectPath : '/cv').catch(() => {})
    }
  }, [redirectPath, router, session])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: AuthErrors = {}

    if (!validateEmail(email)) {
      nextErrors.email = 'Merci de saisir une adresse e-mail valide.'
    }

    if (password.length < 8) {
      nextErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    }

    if (mode === 'signup' && password !== confirmPassword) {
      nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      return
    }

    setFormErrors({})
    setIsSubmitting(true)
    setFlashMessage(null)

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          throw error
        }
        await router.replace(typeof redirectPath === 'string' ? redirectPath : '/cv')
      } else {
        const origin = typeof window !== 'undefined' ? window?.location?.origin : process.env.NEXT_PUBLIC_SITE_URL
        const emailRedirectTo = origin ? `${origin}/api/auth/callback` : undefined
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo,
          },
        })
        if (error) {
          throw error
        }
        setFlashMessage("Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse.")
        setMode('signin')
      }
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      } else {
        setFormErrors({ general: 'Une erreur inattendue est survenue. Réessayez plus tard.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      setFormErrors({ email: 'Saisissez une adresse e-mail valide pour réinitialiser le mot de passe.' })
      return
    }

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL
      const redirectTo = origin ? `${origin}/reset-password` : undefined
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })
      if (error) {
        throw error
      }
      setFlashMessage('Email de réinitialisation envoyé ! Consultez votre boîte de réception.')
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))
    setFormErrors({})
    setFlashMessage(null)
  }

  return (
    <div style={formContainerStyle}>
      <Head>
        <title>Connexion | Finance CV</title>
      </Head>
      <div style={cardStyle}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Link href="/">
            <img
              src="/Logo.png"
              alt="Finance CV"
              style={{ height: '120px', objectFit: 'contain' }}
            />
          </Link>
          <h1 style={{ fontSize: '24px', marginTop: '8px', marginBottom: '8px', fontWeight: 700 }}>
            {mode === 'signin' ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Accédez à votre générateur de CV personnalisé.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
            Adresse e-mail
          </label>
          <input
            style={inputStyle}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="prenom.nom@entreprise.com"
            autoComplete="email"
          />
          {formErrors.email && (
            <p style={{ color: '#f87171', fontSize: '13px', marginTop: '-12px', marginBottom: '12px' }}>
              {formErrors.email}
            </p>
          )}

          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
            Mot de passe
          </label>
          <input
            style={inputStyle}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Au moins 8 caractères"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            minLength={8}
          />
          {formErrors.password && (
            <p style={{ color: '#f87171', fontSize: '13px', marginTop: '-12px', marginBottom: '12px' }}>
              {formErrors.password}
            </p>
          )}

          {mode === 'signup' && (
            <>
              <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                Confirmer le mot de passe
              </label>
              <input
                style={inputStyle}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="Retapez votre mot de passe"
                autoComplete="new-password"
                minLength={8}
              />
              {formErrors.confirmPassword && (
                <p style={{ color: '#f87171', fontSize: '13px', marginTop: '-12px', marginBottom: '12px' }}>
                  {formErrors.confirmPassword}
                </p>
              )}
            </>
          )}

          {formErrors.general && (
            <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>
              {formErrors.general}
            </p>
          )}

          {flashMessage && (
            <p style={{ color: '#34d399', fontSize: '13px', marginBottom: '12px' }}>
              {flashMessage}
            </p>
          )}

          <button type="submit" style={buttonStyle} disabled={isSubmitting}>
            {isSubmitting ? 'Patientez…' : mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        {mode === 'signin' && (
          <button type="button" style={secondaryButtonStyle} onClick={handleResetPassword}>
            Mot de passe oublié ?
          </button>
        )}

        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '14px', color: '#cbd5f5' }}>
          {mode === 'signin' ? (
            <>
              Pas encore de compte ?{' '}
              <button type="button" onClick={toggleMode} style={{ ...secondaryButtonStyle, width: 'auto', display: 'inline-block', marginTop: 0 }}>
                S&apos;inscrire gratuitement
              </button>
            </>
          ) : (
            <>
              Déjà membre ?{' '}
              <button type="button" onClick={toggleMode} style={{ ...secondaryButtonStyle, width: 'auto', display: 'inline-block', marginTop: 0 }}>
                Se connecter
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session?.user) {
    const redirectParam = context.query.redirect
    const destination = Array.isArray(redirectParam) ? redirectParam[0] ?? '/cv' : redirectParam ?? '/cv'

    return {
      redirect: {
        destination,
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
