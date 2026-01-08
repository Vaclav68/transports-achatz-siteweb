# Transports Achatz - Site Web

## Informations entreprise
- **Nom**: Transports Achatz
- **Localisation**: Soultzmatt, Alsace
- **Téléphone**: 03.89.47.00.37
- **WhatsApp**: +33 7 49 21 69 81
- **Site actuel**: https://transports-achatz.fr

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
1. **Accueil** (index.html)
   - Hero avec slider camion
   - Section "Nos Moyens de Transports" (Tautliner, Citerne, Plateau)
   - Galerie photos
   - **Section "Nos Chiffres"** (stats temps réel Supabase)
   - Google Maps (localisation entreprise)
   - Formulaire de contact (connecté Supabase)

2. **Notre histoire** (notre-histoire.html)
   - 3 Générations: Jean Achatz Père, Ralph Achatz, Jean Achatz
   - Contenu "À VENIR"

3. **Outils** (outils.html)
   - Dashdoc (https://www.dashdoc.eu/)
   - Espace Privé (http://transport-achatz.fr/)

## Polices
- **Titres**: Speed Regular (`fonts/Speed Regular.woff2`) + fallback Bebas Neue
- **Corps**: Open Sans
- **Style**: `font-style: normal` (la police Speed est déjà italique par défaut)
- **Poids**: `font-weight: 400`
- **Espacement**: Pas de `letter-spacing` (important pour correspondre au site Hostinger)

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

## Images (organisées par section)

```
images/
├── logo.svg              ← Header/Footer (toutes pages)
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

## Types de transport
1. **TAUTLINER** - Remorques à rideaux coulissants
2. **CITERNE** - Transport de liquides
3. **PLATEAU** - Transport de marchandises diverses

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
| `get_website_stats()` | Retourne les stats agrégées pour le site (tracteurs, porteurs, remorques, conducteurs, km) |

### Trigger email
- **Table**: `crm.contact_messages`
- **Trigger**: `on_contact_message_insert`
- **Fonction**: `crm.notify_contact_message()`
- **Destination**: `contact@achatz.fr`
- **Template**: HTML professionnel avec branding Achatz

## JavaScript

### Fichiers
| Fichier | Description |
|---------|-------------|
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

## Notes
- Site responsive (mobile-first)
- Formulaire de contact connecté à Supabase (index.html uniquement pour l'instant)
- Stats temps réel depuis Supabase avec fallback statique
- Copyright 2025
