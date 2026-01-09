/* =====================================================
   TRANSPORTS ACHATZ - Stats animées
   Compteurs avec animation au scroll + fetch Supabase
   Nécessite: config.js (SUPABASE_URL, SUPABASE_ANON_KEY)
   ===================================================== */

// Valeurs par défaut (fallback si Supabase indisponible)
const DEFAULT_STATS = {
    tracteurs: 15,
    porteurs: 2,
    remorques: 33,
    conducteurs: 16,
    km: 7715516
};

// État global
let statsLoaded = false;
let animationTriggered = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('[Stats] Initialisation...');

    // Charger les stats depuis Supabase
    loadStatsFromSupabase();

    // Observer pour déclencher l'animation au scroll
    setupScrollObserver();
});

/**
 * Charge les statistiques depuis Supabase via la fonction RPC
 */
async function loadStatsFromSupabase() {
    try {
        console.log('[Stats] Chargement depuis Supabase...');

        // Appel de la fonction RPC qui retourne toutes les stats
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_website_stats`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: '{}'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const stats = await response.json();
        console.log('[Stats] Données chargées:', stats);

        // Mettre à jour les targets dans le HTML
        updateStatTargets(stats);
        statsLoaded = true;

    } catch (error) {
        console.error('[Stats] Erreur chargement Supabase:', error);
        console.log('[Stats] Utilisation des valeurs par défaut');
        updateStatTargets(DEFAULT_STATS);
        statsLoaded = true;
    }
}

/**
 * Met à jour les data-target dans le HTML avec les vraies valeurs
 */
function updateStatTargets(stats) {
    Object.keys(stats).forEach(key => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            element.dataset.target = stats[key];
        }
    });
}

/**
 * Configure l'Intersection Observer pour l'animation au scroll
 */
function setupScrollObserver() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationTriggered) {
                animationTriggered = true;
                console.log('[Stats] Section visible, démarrage animation...');

                // Attendre que les stats soient chargées
                const checkAndAnimate = () => {
                    if (statsLoaded) {
                        animateAllCounters();
                    } else {
                        setTimeout(checkAndAnimate, 100);
                    }
                };
                checkAndAnimate();
            }
        });
    }, {
        threshold: 0.3 // Déclencher quand 30% de la section est visible
    });

    observer.observe(statsSection);
}

/**
 * Anime tous les compteurs
 */
function animateAllCounters() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach((card, index) => {
        // Ajouter la classe pour l'animation d'entrée
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 100);

        // Animer le compteur
        const valueElement = card.querySelector('.stat-value');
        if (valueElement) {
            const target = parseInt(valueElement.dataset.target) || 0;
            const format = valueElement.dataset.format;

            setTimeout(() => {
                animateCounter(valueElement, target, format);
            }, index * 150 + 200);
        }
    });
}

/**
 * Anime un compteur de 0 jusqu'à la valeur cible
 */
function animateCounter(element, target, format = null) {
    const duration = 2000; // 2 secondes
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const startValue = 0;

    // Fonction d'easing (ease-out)
    const easeOutQuad = t => t * (2 - t);

    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentValue = Math.round(startValue + (target - startValue) * progress);

        // Formater la valeur
        element.textContent = formatNumber(currentValue, format);

        if (frame === totalFrames) {
            clearInterval(counter);
            // S'assurer que la valeur finale est exacte
            element.textContent = formatNumber(target, format);
        }
    }, frameDuration);
}

/**
 * Formate les nombres pour l'affichage
 */
function formatNumber(num, format) {
    if (format === 'km') {
        // Format millions avec décimale : 7.7M
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace('.', ',') + 'M';
        }
        // Format milliers : 715K
        if (num >= 1000) {
            return Math.round(num / 1000) + 'K';
        }
    }

    // Format standard avec séparateur de milliers
    return num.toLocaleString('fr-FR');
}
