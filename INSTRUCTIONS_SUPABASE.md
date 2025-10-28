# Instructions de Configuration Supabase

## Problèmes Actuels et Solutions

Vous rencontrez deux erreurs :
1. **Erreur lors du téléchargement du fichier** - Le bucket Storage n'existe pas
2. **Erreur lors de la soumission du brief** - Les colonnes de la base de données manquent

## Solution Complète - 3 Étapes

---

### ÉTAPE 1 : Exécuter le Script SQL

1. Allez sur votre tableau de bord Supabase :
   **URL:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/sql

2. Cliquez sur **"New Query"**

3. Copiez tout le contenu du fichier **`supabase/SETUP_COMPLET.sql`**

4. Collez-le dans l'éditeur SQL

5. Cliquez sur **"Run"** (ou appuyez sur Ctrl + Enter)

6. Vérifiez que vous voyez le message :
   > "Configuration de la base de données terminée avec succès!"

---

### ÉTAPE 2 : Créer le Bucket Storage

1. Allez dans la section Storage :
   **URL:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/storage/buckets

2. Cliquez sur **"New bucket"**

3. Remplissez les informations :
   - **Name:** `brief-documents`
   - **Public bucket:** ✅ **OUI** (cochez cette case)

4. Cliquez sur **"Create bucket"**

---

### ÉTAPE 3 : Configurer les Politiques du Bucket

1. Dans la liste des buckets, trouvez **`brief-documents`**

2. Cliquez sur les **trois points (...)** à droite du nom du bucket

3. Sélectionnez **"Policies"**

4. Ajoutez ces deux politiques :

#### Politique 1 : Upload de fichiers
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'brief-documents');
```

#### Politique 2 : Lecture de fichiers
```sql
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'brief-documents');
```

**OU** Utilisez l'interface graphique :
- Cliquez sur **"New Policy"**
- Sélectionnez **"For full customization"**
- **Policy name:** "Allow public uploads"
- **Allowed operation:** INSERT
- **Target roles:** public
- **USING expression:** `bucket_id = 'brief-documents'`

Répétez pour la politique de lecture (SELECT).

---

## Vérification

Après avoir complété ces 3 étapes :

1. **Testez la base de données :**
   - Allez sur votre site : https://boubasma020-svg.github.io/brefwebsite/
   - Remplissez le formulaire (sans fichier d'abord)
   - Cliquez sur "Soumettre le brief"
   - ✅ Vous devriez voir : "Brief soumis avec succès!"

2. **Testez l'upload de fichiers :**
   - Dans le formulaire, essayez de télécharger un fichier dans "Document d'identité visuelle"
   - ✅ Vous devriez voir : "Fichier téléchargé avec succès!"

---

## En cas de Problème

### Erreur : "column does not exist"
➜ Vous n'avez pas exécuté le script SQL (ÉTAPE 1)

### Erreur : "bucket does not exist"
➜ Vous n'avez pas créé le bucket (ÉTAPE 2)

### Erreur : "new row violates row-level security policy"
➜ Vous n'avez pas configuré les politiques (ÉTAPE 3)

---

## Liens Rapides

- 🔗 **Votre Site:** https://boubasma020-svg.github.io/brefwebsite/
- 🗄️ **SQL Editor:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/sql
- 📦 **Storage:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/storage/buckets
- 📊 **Table Editor:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/editor
- 🔐 **Policies:** https://supabase.com/dashboard/project/orgesnuldglanqzveloi/auth/policies

---

## Notes Importantes

- Les fichiers uploadés seront publiquement accessibles
- La taille maximale des fichiers dépend de votre plan Supabase
- Les formats acceptés : PDF, DOC, DOCX, JPG, JPEG, PNG, TXT
- Si vous ne voulez pas uploader de fichiers, vous pouvez soumettre le formulaire sans fichiers
