# Finance CV Builder

Générateur de CV type finance basé sur Next.js (Pages Router) avec authentification utilisateur alimentée par [Supabase](https://supabase.com/).

## Prérequis

- Node.js ≥ 18.18 recommandé (la version 18.14 accepte mais génère des avertissements)
- Compte Supabase avec un projet provisionné

## Configuration

1. Copiez le fichier `.env.local.example` vers `.env.local` et remplissez les variables :

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase (Settings → API). |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme publique Supabase. |
   | `SUPABASE_SERVICE_ROLE_KEY` | **Ne pas exposer côté client**. Utile uniquement pour des scripts serveur (CRON, migrations…). |
   | `NEXT_PUBLIC_SITE_URL` | URL publique de l'application utilisée pour les redirections d'authentification (dev : `http://localhost:3000`). |

2. Dans Supabase :
   - Activez l'authentification par email/password (Auth → Providers).
   - Activez la confirmation d'e-mail obligatoire (Auth → Policies) pour durcir la sécurité.
   - (Optionnel) Configurez des templates d'emails personnalisés et DKIM.

3. Installez les dépendances :

   ```bash
   npm install
   ```

4. Provisionnez la base de données Supabase :

   - Ouvrez l'onglet **SQL Editor** dans Supabase.
   - Collez le contenu de `supabase/cv_schema.sql` puis exécutez-le pour créer la table `user_cvs`, activer la RLS et installer les politiques associées.

## Démarrage

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Authentification Supabase

- L'initialisation du client Supabase se trouve dans `utils/supabaseClient.ts` et est injectée globalement dans `pages/_app.tsx` via `SessionContextProvider`.
- L'API `pages/api/auth/callback.ts` échange les codes PKCE envoyés par Supabase et initialise la session côté serveur via `createPagesServerClient`. Pensez à définir `emailRedirectTo` sur `https://votre-domaine/api/auth/callback` dans les appels `signUp`/`signIn`.
- Les pages protégées (ex. `pages/cv.tsx`) vérifient la session côté serveur et redirigent vers `/login` si nécessaire.
- Les utilisateurs peuvent :
  - Créer un compte et confirmer leur email.
  - Se connecter / se déconnecter depuis l'interface.
  - Demander un lien de réinitialisation et choisir un nouveau mot de passe sur `/reset-password`.

## Sauvegarde des CV

- Depuis `/cv`, le bouton `Sauvegarder` envoie les blocs et le `fontScale` courant vers l'API `POST /api/cv/save` qui effectue un **upsert** dans `user_cvs` pour l'utilisateur connecté.
- Le script `supabase/cv_schema.sql` inclut la table, un index sur `user_id`, les politiques RLS et un trigger `updated_at`.
- Vérifiez que vos politiques Supabase autorisent les insert/update/select lorsque `auth.uid() = user_id`.
- La page `/mes-cv` affiche toutes les sauvegardes, permet d'en créer de nouvelles, de rouvrir un CV (`/cv?id=...`) et de supprimer un enregistrement.

## Bonnes pratiques supplémentaires

- Activez la [protection anti-brute force](https://supabase.com/docs/guides/auth/auth-rate-limits) et ajustez les quotas dans le tableau de bord Supabase.
- Stockez les clés privées (service role) uniquement côté serveur ou dans un gestionnaire de secrets.
- Utilisez `createPagesServerClient`/`createServerActionClient` sur vos routes sensibles pour vérifier la session avant de procéder à des opérations protégées.
- Vérifiez régulièrement les logs d'authentification Supabase.

## Tests

`npm run lint` permet de vérifier les règles ESLint (actuellement quelques avertissements hérités du projet d'origine subsistent).
