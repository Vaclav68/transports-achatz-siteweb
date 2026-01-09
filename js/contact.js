/* =====================================================
   TRANSPORTS ACHATZ - Formulaire de contact
   Nécessite: config.js (SUPABASE_URL, SUPABASE_ANON_KEY)
   ===================================================== */

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Contact] Script chargé');

    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('[Contact] Formulaire non trouvé !');
        return;
    }

    console.log('[Contact] Formulaire trouvé, ajout du listener');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('[Contact] Submit intercepté');

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        // Utiliser FormData pour récupérer les valeurs
        const formDataObj = new FormData(form);

        console.log('[Contact] FormData entries:');
        for (let [key, value] of formDataObj.entries()) {
            console.log(`  ${key}: "${value}"`);
        }

        const formData = {
            name: (formDataObj.get('name') || '').trim(),
            email: (formDataObj.get('email') || '').trim(),
            phone: (formDataObj.get('phone') || '').trim() || null,
            message: (formDataObj.get('message') || '').trim()
        };

        console.log('[Contact] Données:', formData);

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            console.log('[Contact] Validation échouée');
            showModal('error', 'Champs manquants', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Validation email basique
        if (!formData.email.includes('@')) {
            showModal('error', 'Email invalide', 'Veuillez entrer une adresse e-mail valide.');
            return;
        }

        // État loading
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        try {
            console.log('[Contact] Envoi vers Supabase...');

            // Envoi vers Supabase (schema crm)
            const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Accept-Profile': 'crm',
                    'Content-Profile': 'crm',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(formData)
            });

            console.log('[Contact] Réponse:', response.status);

            if (response.ok || response.status === 201) {
                console.log('[Contact] Succès !');
                showModal('success', 'Message envoyé', 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.');
                form.reset();
            } else {
                const errorText = await response.text();
                console.error('[Contact] Erreur Supabase:', response.status, errorText);
                throw new Error(errorText || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('[Contact] Erreur:', error);
            showModal('error', 'Erreur', 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone au 03.89.47.00.37');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});

// Afficher une modale stylée
function showModal(type, title, message) {
    // Supprimer l'ancienne modale si elle existe
    const oldModal = document.querySelector('.modal-overlay');
    if (oldModal) oldModal.remove();

    // Icône selon le type
    const icon = type === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

    // Créer la modale
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content modal-${type}">
                <div class="modal-icon">${icon}</div>
                <h3 class="modal-title">${title}</h3>
                <p class="modal-message">${message}</p>
                <button class="modal-btn" onclick="closeModal()">Fermer</button>
            </div>
        </div>
    `;

    // Ajouter au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Animation d'entrée
    setTimeout(() => {
        document.querySelector('.modal-overlay').classList.add('active');
    }, 10);

    // Fermer en cliquant sur l'overlay
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Fermer avec Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Fermer la modale
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}
