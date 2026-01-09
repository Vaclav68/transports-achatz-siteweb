# Transports Achatz - Site Web

## Informations entreprise
- **Nom**: TRANSPORTS ACHATZ
- **Adresse**: 9B Quai du Dr Heberle, 68570 Soultzmatt, France
- **Téléphone**: 03.89.47.00.37
- **WhatsApp**: +33 7 49 21 69 81
- **Email**: admin@achatz.fr
- **Site**: https://transports-achatz.fr

## Couleurs du site
- **Jaune principal**: #f9e602 (jaune Achatz)
- **Noir**: #020202 (fond principal)
- **Blanc**: #FFFFFF (texte sur fond noir)

## Réseaux sociaux
- Facebook: https://facebook.com/Transports.Achatz/
- WhatsApp: https://wa.me/+33749216981
- Instagram: @transports_achatz
- LinkedIn: /company/transports-achatz
- X (Twitter): @transportsachatz

## Structure du site

### Pages principales
1. **Accueil** (index.html)
   - Hero avec slider camion
   - Section "Nos Moyens de Transports" (Tautliner, Citerne, Plateau, Porteur)
   - Galerie photos
   - Section "Nos Chiffres" (stats temps réel Supabase)
   - Google Maps (localisation entreprise)
   - Formulaire de contact (connecté Supabase)
   - Navigation secondaire "Nous Trouver"

2. **Notre histoire** (notre-histoire.html)
   - 3 Générations: Jean Achatz Père, Ralph Achatz, Jean Achatz
   - Contenu "À VENIR"

3. **Outils** (outils.html)
   - Dashdoc (https://www.dashdoc.eu/)
   - Espace Privé (http://transport-achatz.fr/)

### Pages légales
4. **Mentions Légales** (mentions-legales.html)
   - Éditeur, hébergement (VPS Hostinger EU), propriété intellectuelle

5. **Politique de Confidentialité** (politique-confidentialite.html)
   - RGPD compliant, droits utilisateurs, cookies

## Types de transport
1. **TAUTLINER** - Remorques à rideaux coulissants
2. **CITERNE** - Transport de liquides
3. **PLATEAU** - Transport de marchandises diverses
4. **PORTEUR** - Véhicules porteurs

## Polices
- **Titres**: Speed Regular (`fonts/Speed Regular.woff2`) + fallback Bebas Neue
- **Corps**: Open Sans
- **Style**: `font-style: normal` (la police Speed est déjà italique par défaut)
- **Poids**: `font-weight: 400`
- **Espacement**: Pas de `letter-spacing`

## Spécifications CSS
| Élément | Dimensions |
|---------|------------|
| Logo header | 350 x 227 px |
| Hero image | 1904 x 598 px (responsive largeur, hauteur fixe) |
| Hero margin-top | 257px (logo 227px + padding 30px) |

### Variables CSS
```css
--color-yellow: #f9e602;
--color-yellow-dark: #d9c902;
--color-black: #020202;
--color-white: #FFFFFF;
--font-heading: 'Speed Regular', 'Bebas Neue', sans-serif;
--font-body: 'Open Sans', sans-serif;
```

## Images

```
images/
├── logo.svg              ← Header/Footer (toutes pages)
├── favicon.svg           ← Favicon circulaire (route blanche sur noir)
├── og-image.jpg          ← Image partage réseaux sociaux (1200x630)
├── eu-flag.svg           ← Drapeau UE (mentions légales)
├── hero/
│   └── hero-truck.svg    ← Slider accueil
├── transports/
│   ├── Tautliner.jpg
│   ├── Citerne.jpg
│   └── Plateau.jpg
├── gallery/
│   ├── Plateau 2.jpg
│   ├── Citerne 2.jpg
│   ├── Porteur.jpg
│   └── Tracteur neige.jpg
├── histoire/             ← À créer
│   └── generations.jpg   ← [ ] À ajouter
└── outils/               ← À créer
    ├── dashdoc-logo.png  ← [ ] À ajouter
    └── espace-prive.png  ← [ ] À ajouter
```

## SEO

### Fichiers techniques
| Fichier | Description |
|---------|-------------|
| `robots.txt` | Instructions pour les robots Google |
| `sitemap.xml` | Liste des 5 pages avec priorités |

### Balises META (toutes pages)
- `<meta name="description">` - Description unique par page
- `<meta name="robots">` - index/noindex selon la page
- `<link rel="canonical">` - URL canonique
- `<meta name="theme-color" content="#020202">` - Noir

### Open Graph (Facebook/LinkedIn)
- og:type, og:title, og:description, og:url, og:image, og:locale, og:site_name

### Twitter Card
- twitter:card, twitter:site (@transportsachatz), twitter:title, twitter:description

### Schema.org (index.html)
```json
{
  "@type": "TransportCompany",
  "name": "Transports Achatz",
  "address": "9B Quai du Dr Heberle, 68570 Soultzmatt",
  "telephone": "+33389470037",
  "serviceType": ["Transport routier", "Tautliner", "Citerne", "Plateau", "Porteur"]
}
```

### Google Search Console
- **Propriété**: transports-achatz.fr (type Domaine)
- **Validation**: DNS TXT `google-site-verification=JqgdNWgpbEGBqMpWKUPnMJQxPL56vyzeCOUjSoieABs`
- **Sitemap**: soumis

## JavaScript

### Fichiers
| Fichier | Description |
|---------|-------------|
| `js/config.js` | Configuration Supabase partagée (URL, ANON_KEY) |
| `js/main.js` | Menu mobile, slider hero, scroll |
| `js/contact.js` | Formulaire contact → Supabase |
| `js/stats.js` | Compteurs animés + fetch RPC Supabase |

### Stats temps réel
```javascript
// Appel RPC Supabase
fetch(`${SUPABASE_URL}/rest/v1/rpc/get_website_stats`, {
    method: 'POST',
    headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
    },
    body: '{}'
});

// Réponse
{
    "tracteurs": 15,
    "porteurs": 2,
    "remorques": 33,
    "conducteurs": 16,
    "km": 7715516
}
```

## Supabase (Backend)

### Configuration
| Param | Valeur |
|-------|--------|
| Project Ref | `snrsofwsltwghhuddubu` |
| URL | `https://snrsofwsltwghhuddubu.supabase.co` |

### Tables utilisées
| Schema | Table | Usage |
|--------|-------|-------|
| `crm` | `contact_messages` | Messages du formulaire de contact |
| `public` | `vehicules` | Stats flotte (via RPC) |
| `public` | `membres_achatz` | Stats conducteurs (via RPC) |

### Fonctions RPC
| Fonction | Description |
|----------|-------------|
| `get_website_stats()` | Retourne les stats agrégées pour le site |
| `crm.cleanup_old_contact_messages()` | Supprime les messages > 3 ans (RGPD) |

### Trigger email
- **Table**: `crm.contact_messages`
- **Trigger**: `on_contact_message_insert`
- **Fonction**: `crm.notify_contact_message()`
- **Destination**: `contact@achatz.fr`

### RGPD - Suppression automatique
- **Cron job**: `cleanup-contact-messages`
- **Planification**: `0 3 1 * *` (1er du mois à 3h)
- **Rétention**: 3 ans (recommandation CNIL)

## Hébergement actuel
- **Plateforme**: Hostinger (Business)
- **Type**: Hébergement mutualisé / Site builder
- **DNS**: Hostinger
- **SSL**: Automatique (Let's Encrypt)

## Domaines
| Domaine | Expiration | Usage |
|---------|------------|-------|
| transports-achatz.fr | 2026-05-15 | Principal |
| transport-achatz.fr | 2026-07-05 | Redirection |
| achatz.fr | 2026-10-21 | Redirection |

## Notes
- Site responsive (mobile-first)
- Formulaire de contact connecté à Supabase
- Stats temps réel depuis Supabase avec fallback statique
- Copyright 2025
- Pages légales avec `noindex` (mentions légales, politique confidentialité)
