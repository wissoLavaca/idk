
// Service worker pour StageConnect
const CACHE_NAME = 'stageconnect-v1';

// Fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache : Network First avec fallback sur le cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la réponse est valide, on la met en cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // En cas d'erreur réseau, on cherche dans le cache
        return caches.match(event.request);
      })
  );
});

// Gestion des notifications push
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-96.png',
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Background sync pour les actions hors ligne
self.addEventListener('sync', event => {
  if (event.tag === 'sync-applications') {
    event.waitUntil(syncApplications());
  } else if (event.tag === 'sync-wishlist') {
    event.waitUntil(syncWishlist());
  }
});

// Fonction pour synchroniser les candidatures en attente
async function syncApplications() {
  try {
    const pendingApplications = await getPendingApplications();
    for (const application of pendingApplications) {
      await sendApplication(application);
      await removePendingApplication(application.id);
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la synchronisation des candidatures:', error);
    return false;
  }
}

// Fonction pour synchroniser les modifications de wishlist
async function syncWishlist() {
  try {
    const pendingWishlistActions = await getPendingWishlistActions();
    for (const action of pendingWishlistActions) {
      if (action.type === 'add') {
        await addToWishlistOnline(action.studentId, action.offerId);
      } else if (action.type === 'remove') {
        await removeFromWishlistOnline(action.studentId, action.offerId);
      }
      await removePendingWishlistAction(action.id);
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la wishlist:', error);
    return false;
  }
}

// Fonctions mockées pour la démonstration
async function getPendingApplications() {
  // Dans une vraie application, ces données seraient stockées dans IndexedDB
  return [];
}

async function sendApplication(application) {
  // Simuler un envoi API
  console.log('Envoi de la candidature:', application);
  return true;
}

async function removePendingApplication(id) {
  // Supprimer de IndexedDB
  console.log('Suppression de la candidature en attente #', id);
  return true;
}

async function getPendingWishlistActions() {
  // Dans une vraie application, ces données seraient stockées dans IndexedDB
  return [];
}

async function addToWishlistOnline(studentId, offerId) {
  console.log(`Ajout de l'offre #${offerId} à la wishlist de l'étudiant #${studentId}`);
  return true;
}

async function removeFromWishlistOnline(studentId, offerId) {
  console.log(`Retrait de l'offre #${offerId} de la wishlist de l'étudiant #${studentId}`);
  return true;
}

async function removePendingWishlistAction(id) {
  console.log('Suppression de l\'action wishlist en attente #', id);
  return true;
}