document.addEventListener("DOMContentLoaded", function() {
    // Définition des données et constantes à jour
    const currentDateTime = "2025-03-08 17:15:21";
    const userLogin = "RamiMohamed12";
    let currentModule = "dashboard";
    
    // Mise à jour des éléments affichant l'heure et l'utilisateur
    updateTimeAndUserElements();
    
    // Initialiser la sidebar
    initSidebar();
    
    // Initialiser les graphiques
    initCharts();
    
    // Initialiser les animations
    initAnimations();
    
    // Initialiser les gestionnaires d'événements pour les actions
    initEventHandlers();
    
    // Initialiser le système de notification
    initNotifications();
    
    // Afficher un message de bienvenue
    showWelcomeMessage();
    
    // Fonctions d'initialisation
    
    function updateTimeAndUserElements() {
        // Mettre à jour tous les éléments affichant le temps et l'utilisateur
        document.querySelectorAll('#current-time').forEach(el => {
            el.textContent = currentDateTime;
        });
        
        document.querySelectorAll('#current-user, .profile_name').forEach(el => {
            el.textContent = userLogin;
        });
    }
    function initSidebar() {
      // Gestion des flèches d'expansion dans la sidebar
      let arrows = document.querySelectorAll(".arrow");
      for (let i = 0; i < arrows.length; i++) {
          arrows[i].addEventListener("click", (e) => {
              const arrowParent = e.target.parentElement.parentElement;
              arrowParent.classList.toggle("showMenu");
          });
      }
      
      // Bouton toggle pour la sidebar
      const sidebar = document.querySelector(".sidebar");
      const sidebarBtn = document.querySelector(".bx-menu");
      
      if (sidebarBtn) {
          sidebarBtn.addEventListener("click", () => {
              sidebar.classList.toggle("close");
              
              // Pour mobile
              if (window.innerWidth <= 640) {
                  sidebar.classList.toggle("open");
              }
          });
      }
      
      // Fermer la sidebar quand on clique à l'extérieur (mobile)
      document.addEventListener('click', (e) => {
          if (window.innerWidth <= 640 && 
              !sidebar.contains(e.target) && 
              !sidebarBtn.contains(e.target) && 
              sidebar.classList.contains('open')) {
              sidebar.classList.remove('open');
          }
      });
      
      // Activer le lien actif dans la sidebar
      document.querySelectorAll('.nav-links li a').forEach(link => {
          link.addEventListener('click', function(e) {
              if (this.getAttribute('onclick')) return; // Skip si onclick existe déjà
              
              document.querySelectorAll('.nav-links li').forEach(item => {
                  item.classList.remove('active');
              });
              
              this.closest('li').classList.add('active');
          });
      });
  }
  
  function initCharts() {
      // Graphique des offres de stage
      const offersChartElem = document.getElementById('offersChart');
      if (offersChartElem) {
          const gradient = offersChartElem.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          
          const gradientSecondary = offersChartElem.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradientSecondary.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
          gradientSecondary.addColorStop(1, 'rgba(139, 92, 246, 0.05)');
          
          const offersChart = new Chart(offersChartElem, {
              type: 'line',
              data: {
                  labels: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
                  datasets: [
                      {
                          label: 'Offres publiées',
                          data: [45, 52, 68, 78, 85, 92, 90, 85, 110, 128, 142, 155],
                          fill: true,
                          backgroundColor: gradient,
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                          tension: 0.4,
                          pointBackgroundColor: '#3b82f6',
                          pointBorderColor: '#fff',
                          pointRadius: 4
                      },
                      {
                          label: 'Candidatures',
                          data: [120, 145, 160, 180, 190, 210, 200, 195, 250, 280, 310, 340],
                          fill: true,
                          backgroundColor: gradientSecondary,
                          borderColor: '#8b5cf6',
                          borderWidth: 2,
                          tension: 0.4,
                          pointBackgroundColor: '#8b5cf6',
                          pointBorderColor: '#fff',
                          pointRadius: 4
                      }
                  ]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                      mode: 'index',
                      intersect: false
                  },
                  plugins: {
                      legend: {
                          position: 'top',
                          labels: {
                              color: '#f3f4f6',
                              font: {
                                  family: 'Montserrat'
                              },
                              padding: 20,
                              usePointStyle: true,
                              pointStyle: 'circle'
                          }
                      },
                      tooltip: {
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          bodyFont: {
                              family: 'Montserrat'
                          },
                          titleFont: {
                              family: 'Montserrat'
                          }
                      }
                  },
                  scales: {
                      x: {
                          grid: {
                              display: false
                          },
                          ticks: {
                              color: '#9ca3af',
                              font: {
                                  family: 'Montserrat'
                              }
                          }
                      },
                      y: {
                          grid: {
                              color: 'rgba(148, 163, 184, 0.1)'
                          },
                          ticks: {
                              color: '#9ca3af',
                              font: {
                                  family: 'Montserrat'
                              }
                          }
                      }
                  }
              }
          });
          
          // Boutons de filtre pour le graphique
          document.querySelectorAll('.filter-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  document.querySelectorAll('.filter-btn').forEach(b => {
                      b.classList.remove('bg-blue-600/50');
                      b.classList.add('bg-slate-700/50', 'hover:bg-slate-600/50');
                  });
                  
                  this.classList.remove('bg-slate-700/50', 'hover:bg-slate-600/50');
                  this.classList.add('bg-blue-600/50');
                  
                  const period = parseInt(this.getAttribute('data-period'));
                  
                  // Simulation de changement de données
                  let newLabels, newData1, newData2;
                  
                  if (period === 30) {
                      newLabels = ['1', '5', '10', '15', '20', '25', '30'];
                      newData1 = [12, 19, 15, 20, 18, 25, 30];
                      newData2 = [25, 32, 30, 45, 40, 48, 52];
                  } else if (period === 90) {
                      newLabels = ['Jan', 'Fév', 'Mars'];
                      newData1 = [45, 52, 68];
                      newData2 = [120, 145, 160];
                  } else {
                      newLabels = ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
                      newData1 = [45, 52, 68, 78, 85, 92, 90, 85, 110, 128, 142, 155];
                      newData2 = [120, 145, 160, 180, 190, 210, 200, 195, 250, 280, 310, 340];
                  }
                  
                  offersChart.data.labels = newLabels;
                  offersChart.data.datasets[0].data = newData1;
                  offersChart.data.datasets[1].data = newData2;
                  offersChart.update();
              });
          });
      }
      
      // Graphique des statistiques étudiants
      const studentsStatsChartElem = document.getElementById('studentsStatsChart');
      if (studentsStatsChartElem) {
          const gradient1 = studentsStatsChartElem.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradient1.addColorStop(0, 'rgba(16, 185, 129, 0.7)');
          gradient1.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
          
          const gradient2 = studentsStatsChartElem.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradient2.addColorStop(0, 'rgba(245, 158, 11, 0.7)');
          gradient2.addColorStop(1, 'rgba(245, 158, 11, 0.1)');
          
          const gradient3 = studentsStatsChartElem.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradient3.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
          gradient3.addColorStop(1, 'rgba(239, 68, 68, 0.1)');
          
          new Chart(studentsStatsChartElem, {
              type: 'bar',
              data: {
                  labels: ['Master 2', 'Master 1', 'Licence 3', 'Licence Pro'],
                  datasets: [
                      {
                          label: 'Avec stage',
                          data: [72, 65, 58, 78],
                          backgroundColor: gradient1,
                          borderColor: 'rgba(16, 185, 129, 1)',
                          borderWidth: 1
                      },
                      {
                          label: 'En recherche',
                          data: [25, 28, 38, 18],
                          backgroundColor: gradient2,
                          borderColor: 'rgba(245, 158, 11, 1)',
                          borderWidth: 1
                      },
                      {
                          label: 'Sans recherche',
                          data: [3, 7, 4, 4],
                          backgroundColor: gradient3,
                          borderColor: 'rgba(239, 68, 68, 1)',
                          borderWidth: 1
                      }
                  ]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          position: 'top',
                          labels: {
                              color: '#f3f4f6',
                              font: {
                                  family: 'Montserrat'
                              },
                              padding: 20,
                              usePointStyle: true,
                              pointStyle: 'circle'
                          }
                      },
                      tooltip: {
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          bodyFont: {
                              family: 'Montserrat'
                          },
                          titleFont: {
                              family: 'Montserrat'
                          }
                      }
                  },
                  scales: {
                      x: {
                          grid: {
                              display: false
                          },
                          ticks: {
                              color: '#9ca3af',
                              font: {
                                  family: 'Montserrat'
                              }
                          }
                      },
                      y: {
                          grid: {
                              color: 'rgba(148, 163, 184, 0.1)'
                          },
                          ticks: {
                              color: '#9ca3af',
                              font: {
                                  family: 'Montserrat'
                              },
                              callback: function(value) {
                                  return value + '%';
                              }
                          }
                      }
                  }
              }
          });
      }
  }
  
  function initAnimations() {
      // Animation d'entrée des cartes et conteneurs
      const elements = [
          ...document.querySelectorAll('.stat-card'),
          ...document.querySelectorAll('.bg-slate-800\\/50'),
          ...document.querySelectorAll('.activity-item'),
          ...document.querySelectorAll('.stage-card'),
          ...document.querySelectorAll('.candidature-card'),
          ...document.querySelectorAll('.account-card'),
          ...document.querySelectorAll('.wishlist-card'),
          ...document.querySelectorAll('.company-eval-card')
      ];
      
      elements.forEach((el, index) => {
          // État initial
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          
          // Animation avec délai échelonné
          setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
          }, 100 + (40 * index));
      });
  }
  
  function initEventHandlers() {
      // Gestionnaire pour les boutons de pagination
      document.querySelectorAll('.page-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              if (this.classList.contains('disabled')) return;
              
              const action = this.getAttribute('data-action');
              const currentPageElement = this.closest('.flex.items-center').querySelector('.text-blue-400');
              
              if (!currentPageElement) return;
              
              let [currentPage, totalPages] = currentPageElement.textContent.replace('Page ', '').split('/').map(Number);
              
              if (action === 'next' && currentPage < totalPages) {
                  currentPage++;
              } else if (action === 'prev' && currentPage > 1) {
                  currentPage--;
              }
              
              currentPageElement.textContent = `Page ${currentPage}/${totalPages}`;
              
              // Activer/désactiver les boutons selon la page
              const prevBtn = this.parentElement.querySelector('[data-action="prev"]');
              const nextBtn = this.parentElement.querySelector('[data-action="next"]');
              
              if (currentPage === 1) {
                  prevBtn.classList.add('disabled');
              } else {
                  prevBtn.classList.remove('disabled');
              }
              
              if (currentPage === totalPages) {
                  nextBtn.classList.add('disabled');
              } else {
                  nextBtn.classList.remove('disabled');
              }
              
              // Simuler le changement de données (à remplacer par un appel API)
              showNotification("Pagination", `Page ${currentPage} chargée`, "info");
          });
      });
      
      // Switch entre étudiants et pilotes
      document.querySelectorAll('.account-type-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const type = this.getAttribute('data-type');
              
              document.querySelectorAll('.account-type-btn').forEach(b => {
                  b.classList.remove('active');
              });
              this.classList.add('active');
              
              document.querySelectorAll('.account-list').forEach(list => {
                list.classList.add('hidden');
            });
            
            document.getElementById(`${type}-accounts`).classList.remove('hidden');
        });
    });
    
    // Gérer les boutons d'action des candidatures
    document.querySelectorAll('.btn-accept, .btn-reject, .btn-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.candidature-card');
            const studentName = card.querySelector('.candidature-student h3').textContent;
            const stageName = card.querySelector('.candidature-stage').textContent;
            
            if (this.classList.contains('btn-accept')) {
                showNotification("Candidature acceptée", `${studentName} pour ${stageName}`, "success");
                card.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                card.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                
                // Animation de disparition
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(50px)';
                    setTimeout(() => {
                        if (card.parentNode) card.parentNode.removeChild(card);
                    }, 500);
                }, 1000);
                
            } else if (this.classList.contains('btn-reject')) {
                showNotification("Candidature rejetée", `${studentName} pour ${stageName}`, "error");
                card.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                card.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                
                // Animation de disparition
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(50px)';
                    setTimeout(() => {
                        if (card.parentNode) card.parentNode.removeChild(card);
                    }, 500);
                }, 1000);
                
            } else if (this.classList.contains('btn-review')) {
                showNotification("Consultation de candidature", `${studentName} pour ${stageName}`, "info");
            }
        });
    });
    
    // Gérer les actions sur les offres de stage
    document.querySelectorAll('.stage-card .action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.stage-card');
            const stageTitle = card.querySelector('.stage-title').textContent;
            const stageCompany = card.querySelector('.stage-company').textContent;
            
            if (this.classList.contains('edit-btn')) {
                showNotification("Modification d'offre", `Édition de l'offre "${stageTitle}" de ${stageCompany}`, "info");
                loadModule('edit-offer');
            } else if (this.classList.contains('delete-btn')) {
                // Afficher une modal de confirmation
                const confirmModal = document.getElementById('confirmation-modal');
                const confirmMessage = document.getElementById('confirmation-message');
                const confirmBtn = document.getElementById('confirm-action-btn');
                
                confirmMessage.textContent = `Êtes-vous sûr de vouloir supprimer l'offre "${stageTitle}" de ${stageCompany}?`;
                confirmModal.classList.add('show');
                
                // Action sur le bouton de confirmation
                const handleConfirm = () => {
                    showNotification("Suppression d'offre", `Offre "${stageTitle}" supprimée avec succès`, "success");
                    
                    // Animation de disparition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (card.parentNode) card.parentNode.removeChild(card);
                    }, 500);
                    
                    confirmModal.classList.remove('show');
                    confirmBtn.removeEventListener('click', handleConfirm);
                };
                
                confirmBtn.addEventListener('click', handleConfirm);
                
                // Fermer la modal si on clique sur annuler
                document.querySelectorAll('.modal-close').forEach(closeBtn => {
                    closeBtn.addEventListener('click', () => {
                        confirmModal.classList.remove('show');
                        confirmBtn.removeEventListener('click', handleConfirm);
                    });
                });
            }
        });
    });
    
    // Gérer les actions sur les comptes
    document.querySelectorAll('.account-card .action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.account-card');
            const accountName = card.querySelector('h3').textContent;
            const accountType = card.querySelector('p').textContent;
            
            if (this.classList.contains('edit-btn-sm')) {
                showNotification("Modification de compte", `Édition du compte de ${accountName}`, "info");
                
                if (accountType.includes('Master') || accountType.includes('Licence')) {
                    loadModule('edit-student');
                } else if (accountType.includes('Pilote')) {
                    loadModule('edit-pilot');
                }
            } else if (this.classList.contains('delete-btn-sm')) {
                // Afficher une modal de confirmation
                const confirmModal = document.getElementById('confirmation-modal');
                const confirmMessage = document.getElementById('confirmation-message');
                const confirmBtn = document.getElementById('confirm-action-btn');
                
                confirmMessage.textContent = `Êtes-vous sûr de vouloir supprimer le compte de ${accountName}?`;
                confirmModal.classList.add('show');
                
                // Action sur le bouton de confirmation
                const handleConfirm = () => {
                    showNotification("Suppression de compte", `Compte de ${accountName} supprimé avec succès`, "success");
                    
                    // Animation de disparition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (card.parentNode) card.parentNode.removeChild(card);
                    }, 500);
                    
                    confirmModal.classList.remove('show');
                    confirmBtn.removeEventListener('click', handleConfirm);
                };
                
                confirmBtn.addEventListener('click', handleConfirm);
                
                // Fermer la modal si on clique sur annuler
                document.querySelectorAll('.modal-close').forEach(closeBtn => {
                    closeBtn.addEventListener('click', () => {
                        confirmModal.classList.remove('show');
                        confirmBtn.removeEventListener('click', handleConfirm);
                    });
                });
            }
        });
    });
    
    // Gérer le panneau de notifications
    const notificationBtn = document.getElementById('notification-btn');
    const notificationsPanel = document.getElementById('notifications-panel');
    const closeNotificationsBtn = document.getElementById('close-notifications');
    
    if (notificationBtn && notificationsPanel) {
        notificationBtn.addEventListener('click', () => {
            notificationsPanel.classList.toggle('open');
        });
        
        // Fermer avec le bouton
        if (closeNotificationsBtn) {
            closeNotificationsBtn.addEventListener('click', () => {
                notificationsPanel.classList.remove('open');
            });
        }
        
        // Fermer en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!notificationsPanel.contains(e.target) && 
                !notificationBtn.contains(e.target) &&
                notificationsPanel.classList.contains('open')) {
                notificationsPanel.classList.remove('open');
            }
        });
        
        // Marquer les notifications comme lues
        document.querySelector('.notifications-footer button:first-child')?.addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            showNotification("Notifications", "Toutes les notifications ont été marquées comme lues", "success");
        });
    }
    
    // Gérer le bouton de déconnexion
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        // Afficher une modal de confirmation
        const confirmModal = document.getElementById('confirmation-modal');
        const confirmMessage = document.getElementById('confirmation-message');
        const confirmBtn = document.getElementById('confirm-action-btn');
        
        confirmMessage.textContent = "Êtes-vous sûr de vouloir vous déconnecter?";
        confirmModal.classList.add('show');
        
        // Action sur le bouton de confirmation
        const handleConfirm = () => {
            showNotification("Déconnexion", "Vous serez redirigé vers la page de connexion...", "info");
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
            
            confirmModal.classList.remove('show');
            confirmBtn.removeEventListener('click', handleConfirm);
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        
        // Fermer la modal si on clique sur annuler
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                confirmModal.classList.remove('show');
                confirmBtn.removeEventListener('click', handleConfirm);
            });
        });
    });
  }
  
  function initNotifications() {
    // Créer un conteneur pour les notifications temporaires
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col space-y-3';
        document.body.appendChild(container);
    }
  }
  
  // Chargement des modules
  window.loadModule = function(moduleName) {
    // Mémoriser le module actuel
    currentModule = moduleName;
    
    // Si on revient au dashboard, recharger la page
    if (moduleName === 'dashboard') {
        window.location.reload();
        return;
    }
    
    // Récupérer le template du module
    const templateId = `${moduleName}-template`;
    const template = document.getElementById(templateId);
    
    if (template) {
        // Remplacer le contenu principal
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = template.innerHTML;
        
        // Mettre à jour le titre de la section
        let moduleTitle = moduleName.replace(/-/g, ' ');
        moduleTitle = moduleTitle.charAt(0).toUpperCase() + moduleTitle.slice(1);
        
        document.querySelectorAll('.nav-links li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Trouver et activer le lien correspondant dans la sidebar
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('onclick')?.includes(moduleName)) {
                link.closest('li').classList.add('active');
                
                // Si le lien est dans un sous-menu, ouvrir le parent
                const parentMenu = link.closest('.sub-menu')?.parentElement;
                if (parentMenu && !parentMenu.classList.contains('showMenu')) {
                    parentMenu.classList.add('showMenu');
                }
            }
        });
        
        showNotification("Navigation", `Module "${moduleTitle}" chargé`, "info");
    } else {
        // Si le template n'existe pas, afficher un message et créer un contenu dynamique
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="p-6">
                <h2 class="text-2xl font-semibold mb-6">${moduleName.replace(/-/g, ' ').charAt(0).toUpperCase() + moduleName.replace(/-/g, ' ').slice(1)}</h2>
                <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50">
                    <p class="text-center py-8">Cette fonctionnalité est en cours de développement.</p>
                    <div class="flex justify-center">
                        <button class="bg-blue-600/20 hover:bg-blue-600/40 px-4 py-2 rounded-lg border border-blue-500/30 transition-all" onclick="loadModule('dashboard')">
                            Retourner au tableau de bord
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        showNotification("Attention", `Le module "${moduleName}" est en cours de développement`, "warning");
    }
  };
  
  // Fonction pour afficher une notification
  window.showNotification = function(title, message, type = 'info') {
    const container = document.getElementById('notifications-container');
    
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification transform transition-all duration-500 translate-x-20 opacity-0';
    
    // Déterminer l'icône et la couleur selon le type
    let iconClass = 'fa-bell';
    let bgClass = 'bg-blue-500/20';
    let textClass = 'text-blue-500';
    
    if (type === 'success') {
        iconClass = 'fa-check-circle';
        bgClass = 'bg-emerald-500/20';
        textClass = 'text-emerald-500';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
        bgClass = 'bg-amber-500/20';
        textClass = 'text-amber-500';
    } else if (type === 'error') {
        iconClass = 'fa-times-circle';
        bgClass = 'bg-rose-500/20';
        textClass = 'text-rose-500';
    }
    
    notification.innerHTML = `
        <div class="bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-lg">
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full ${bgClass} flex items-center justify-center mr-3">
                    <i class="fas ${iconClass} ${textClass}"></i>
                </div>
                <div>
                    <p class="text-sm font-medium text-white">${title}</p>
                    <p class="text-xs text-gray-400">${message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.remove('translate-x-20', 'opacity-0');
    }, 100);
    
            // Auto-disparition après 5 secondes
            setTimeout(() => {
              if (notification.parentNode) {
                  notification.classList.add('translate-x-20', 'opacity-0');
                  setTimeout(() => {
                      if (notification.parentNode) {
                          notification.parentNode.removeChild(notification);
                      }
                  }, 500);
              }
          }, 5000);
      };
      
      // Afficher un message de bienvenue
      function showWelcomeMessage() {
          setTimeout(() => {
              showNotification(
                  `Bienvenue sur StageConnect, ${userLogin}`,
                  `Tableau de bord mis à jour le ${currentDateTime}`,
                  "success"
              );
          }, 1000);
      }
      
      // Fonctions supplémentaires pour implémenter le cahier des charges
      
      // SFx 2 – Rechercher et afficher une entreprise
      function searchCompany(query) {
          // Cette fonction serait connectée à l'API pour rechercher des entreprises
          console.log(`Recherche d'entreprise: ${query}`);
          // Simuler une réponse API
          return [
              { id: 1, name: "Microsoft France", sector: "Technologie", city: "Paris", rating: 4.8 },
              { id: 2, name: "Orange", sector: "Télécommunications", city: "Paris", rating: 4.2 },
              { id: 3, name: "Airbus", sector: "Aéronautique", city: "Toulouse", rating: 4.7 }
          ].filter(company => 
              company.name.toLowerCase().includes(query.toLowerCase()) || 
              company.sector.toLowerCase().includes(query.toLowerCase()) ||
              company.city.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      // SFx 3 – Créer une entreprise
      function createCompany(companyData) {
          // Cette fonction serait connectée à l'API pour créer une entreprise
          console.log("Création d'entreprise:", companyData);
          
          // Simuler une création réussie
          showNotification(
              "Entreprise créée",
              `L'entreprise ${companyData.name} a été ajoutée avec succès.`,
              "success"
          );
          
          return { success: true, id: Math.floor(Math.random() * 1000) + 100 };
      }
      
      // SFx 4 – Modifier une entreprise
      function updateCompany(companyId, companyData) {
          // Cette fonction serait connectée à l'API pour modifier une entreprise
          console.log(`Mise à jour de l'entreprise #${companyId}:`, companyData);
          
          // Simuler une modification réussie
          showNotification(
              "Entreprise modifiée",
              `Les informations de ${companyData.name} ont été mises à jour.`,
              "success"
          );
          
          return { success: true };
      }
      
      // SFx 5 – Évaluer une entreprise
      function rateCompany(companyId, rating, comment) {
          // Cette fonction serait connectée à l'API pour évaluer une entreprise
          console.log(`Évaluation de l'entreprise #${companyId}: ${rating}/5`, comment);
          
          // Simuler une évaluation réussie
          showNotification(
              "Évaluation enregistrée",
              `Votre évaluation ${rating}/5 a été enregistrée.`,
              "success"
          );
          
          return { success: true };
      }
      
      // SFx 6 – Supprimer une entreprise
      function deleteCompany(companyId, companyName) {
          // Cette fonction serait connectée à l'API pour supprimer une entreprise
          console.log(`Suppression de l'entreprise #${companyId}: ${companyName}`);
          
          // Simuler une suppression réussie
          showNotification(
              "Entreprise supprimée",
              `L'entreprise ${companyName} a été supprimée de la plateforme.`,
              "success"
          );
          
          return { success: true };
      }
      
      // SFx 8 – Rechercher et afficher une offre
      function searchOffer(query) {
          // Cette fonction serait connectée à l'API pour rechercher des offres
          console.log(`Recherche d'offre: ${query}`);
          
          // Simuler une réponse API
          return [
              { 
                  id: 101, 
                  title: "Développeur Web Frontend", 
                  company: "Microsoft France", 
                  location: "Paris", 
                  duration: "6 mois", 
                  paid: true 
              },
              { 
                  id: 102, 
                  title: "Data Scientist", 
                  company: "Orange", 
                  location: "Paris", 
                  duration: "5 mois", 
                  paid: true 
              },
              { 
                  id: 103, 
                  title: "UX Designer", 
                  company: "Airbus", 
                  location: "Toulouse", 
                  duration: "4 mois", 
                  paid: true 
              }
          ].filter(offer => 
              offer.title.toLowerCase().includes(query.toLowerCase()) || 
              offer.company.toLowerCase().includes(query.toLowerCase()) ||
              offer.location.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      // SFx 9 – Créer une offre
      function createOffer(offerData) {
          // Cette fonction serait connectée à l'API pour créer une offre
          console.log("Création d'offre:", offerData);
          
          // Simuler une création réussie
          showNotification(
              "Offre créée",
              `L'offre "${offerData.title}" pour ${offerData.company} a été publiée avec succès.`,
              "success"
          );
          
          return { success: true, id: Math.floor(Math.random() * 1000) + 100 };
      }
      
      // SFx 10 – Modifier une offre
      function updateOffer(offerId, offerData) {
          // Cette fonction serait connectée à l'API pour modifier une offre
          console.log(`Mise à jour de l'offre #${offerId}:`, offerData);
          
          // Simuler une modification réussie
          showNotification(
              "Offre modifiée",
              `L'offre "${offerData.title}" a été mise à jour.`,
              "success"
          );
          
          return { success: true };
      }
      
      // SFx 11 – Supprimer une offre
      function deleteOffer(offerId, offerTitle) {
          // Cette fonction serait connectée à l'API pour supprimer une offre
          console.log(`Suppression de l'offre #${offerId}: ${offerTitle}`);
          
          // Simuler une suppression réussie
          showNotification(
              "Offre supprimée",
              `L'offre "${offerTitle}" a été supprimée de la plateforme.`,
              "success"
          );
          
          return { success: true };
      }
      
      // SFx 12 – Consulter les statistiques des offres
      function getOfferStats(filters = {}) {
          // Cette fonction serait connectée à l'API pour obtenir les statistiques
          console.log("Demande de statistiques des offres:", filters);
          
          // Simuler une réponse API avec des données statistiques
          return {
              totalOffers: 128,
              byMonth: {
                  labels: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
                  values: [45, 52, 68, 78, 85, 92, 90, 85, 110, 128, 142, 155]
              },
              bySector: {
                  labels: ['Tech', 'Finance', 'Marketing', 'Ingénierie', 'Santé', 'Autres'],
                  values: [35, 20, 15, 25, 10, 23]
              },
              byLocation: {
                  labels: ['Paris', 'Lyon', 'Toulouse', 'Bordeaux', 'Lille', 'Autres'],
                  values: [40, 15, 12, 8, 10, 43]
              }
          };
      }
      
      // SFx 13-16 – Gestion des comptes Pilote
      function searchPilot(query) {
          // Simuler une recherche de pilote
          console.log(`Recherche de pilote: ${query}`);
          return [
              { id: 201, name: "Pierre Martin", email: "p.martin@example.com", department: "Informatique" },
              { id: 202, name: "Marie Dubois", email: "m.dubois@example.com", department: "Marketing" },
              { id: 203, name: "François Leroy", email: "f.leroy@example.com", department: "Finance" }
          ].filter(pilot => 
              pilot.name.toLowerCase().includes(query.toLowerCase()) || 
              pilot.email.toLowerCase().includes(query.toLowerCase()) ||
              pilot.department.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      function createPilot(pilotData) {
          console.log("Création de pilote:", pilotData);
          showNotification("Pilote créé", `Le compte pilote de ${pilotData.name} a été créé.`, "success");
          return { success: true, id: Math.floor(Math.random() * 1000) + 200 };
      }
      
      function updatePilot(pilotId, pilotData) {
          console.log(`Mise à jour du pilote #${pilotId}:`, pilotData);
          showNotification("Pilote modifié", `Le compte de ${pilotData.name} a été mis à jour.`, "success");
          return { success: true };
      }
      
      function deletePilot(pilotId, pilotName) {
          console.log(`Suppression du pilote #${pilotId}: ${pilotName}`);
          showNotification("Pilote supprimé", `Le compte de ${pilotName} a été supprimé.`, "success");
          return { success: true };
      }
      
      // SFx 17-21 – Gestion des comptes Étudiant
      function searchStudent(query) {
          // Simuler une recherche d'étudiant
          console.log(`Recherche d'étudiant: ${query}`);
          return [
              { id: 301, name: "Clara Rousseau", email: "c.rousseau@example.com", program: "Master 2 - Marketing" },
              { id: 302, name: "Maxime Dupont", email: "m.dupont@example.com", program: "Licence 3 - Informatique" },
              { id: 303, name: "Julie Bernard", email: "j.bernard@example.com", program: "Master 1 - Design" }
          ].filter(student => 
              student.name.toLowerCase().includes(query.toLowerCase()) || 
              student.email.toLowerCase().includes(query.toLowerCase()) ||
              student.program.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      function createStudent(studentData) {
          console.log("Création d'étudiant:", studentData);
          showNotification("Étudiant créé", `Le compte étudiant de ${studentData.name} a été créé.`, "success");
          return { success: true, id: Math.floor(Math.random() * 1000) + 300 };
      }
      
      function updateStudent(studentId, studentData) {
          console.log(`Mise à jour de l'étudiant #${studentId}:`, studentData);
          showNotification("Étudiant modifié", `Le compte de ${studentData.name} a été mis à jour.`, "success");
          return { success: true };
      }
      
      function deleteStudent(studentId, studentName) {
          console.log(`Suppression de l'étudiant #${studentId}: ${studentName}`);
          showNotification("Étudiant supprimé", `Le compte de ${studentName} a été supprimé.`, "success");
          return { success: true };
      }
      
      function getStudentStats(studentId) {
          console.log(`Statistiques de l'étudiant #${studentId}`);
          
          // Simuler des statistiques d'étudiant
          return {
              applications: 12,
              interviews: 5,
              offers: 2,
              wishlist: 8,
              applicationSuccess: 41.7, // % (5/12)
              viewRate: 75 // %
          };
      }
      
      // SFx 22-26 – Gestion des candidatures
      function addToWishlist(studentId, offerId) {
          console.log(`Ajout de l'offre #${offerId} à la wishlist de l'étudiant #${studentId}`);
          showNotification("Wishlist mise à jour", "L'offre a été ajoutée à la wishlist.", "success");
          return { success: true };
      }
      
      function removeFromWishlist(studentId, offerId) {
          console.log(`Retrait de l'offre #${offerId} de la wishlist de l'étudiant #${studentId}`);
          showNotification("Wishlist mise à jour", "L'offre a été retirée de la wishlist.", "success");
          return { success: true };
      }
      
      function getWishlist(studentId) {
          console.log(`Récupération de la wishlist de l'étudiant #${studentId}`);
          
          // Simuler une wishlist
          return [
              { id: 101, title: "Développeur Web Frontend", company: "Microsoft France" },
              { id: 105, title: "Marketing Digital", company: "L'Oréal" },
              { id: 108, title: "Data Analyst", company: "BNP Paribas" }
          ];
      }
      
      function applyToOffer(studentId, offerId, application) {
          console.log(`Candidature de l'étudiant #${studentId} à l'offre #${offerId}:`, application);
          showNotification("Candidature envoyée", "Votre candidature a été soumise avec succès.", "success");
          return { 
              success: true, 
              applicationId: Math.floor(Math.random() * 1000) + 500 
          };
      }
      
      function getStudentApplications(studentId) {
          console.log(`Récupération des candidatures de l'étudiant #${studentId}`);
          
          // Simuler des candidatures
          return [
              { 
                  id: 501, 
                  offerId: 101, 
                  title: "Développeur Web Frontend", 
                  company: "Microsoft France", 
                  status: "En attente", 
                  appliedAt: "2025-02-25" 
              },
              { 
                  id: 502, 
                  offerId: 103, 
                  title: "UX Designer", 
                  company: "Airbus", 
                  status: "Entretien", 
                  appliedAt: "2025-02-28" 
              }
          ];
      }
      
          // Exposer les fonctions au contexte global pour les appels depuis les templates
          window.searchCompany = searchCompany;
          window.createCompany = createCompany;
          window.updateCompany = updateCompany;
          window.rateCompany = rateCompany;
          window.deleteCompany = deleteCompany;
          
          window.searchOffer = searchOffer;
          window.createOffer = createOffer;
          window.updateOffer = updateOffer;
          window.deleteOffer = deleteOffer;
          window.getOfferStats = getOfferStats;
          
          window.searchPilot = searchPilot;
          window.createPilot = createPilot;
          window.updatePilot = updatePilot;
          window.deletePilot = deletePilot;
          
          window.searchStudent = searchStudent;
          window.createStudent = createStudent;
          window.updateStudent = updateStudent;
          window.deleteStudent = deleteStudent;
          window.getStudentStats = getStudentStats;
          
          window.addToWishlist = addToWishlist;
          window.removeFromWishlist = removeFromWishlist;
          window.getWishlist = getWishlist;
          window.applyToOffer = applyToOffer;
          window.getStudentApplications = getStudentApplications;
          
          // SFx 27 – Pagination
          window.paginateData = function(data, page = 1, perPage = 10) {
              const startIndex = (page - 1) * perPage;
              const endIndex = page * perPage;
              
              return {
                  total: data.length,
                  pages: Math.ceil(data.length / perPage),
                  currentPage: page,
                  data: data.slice(startIndex, endIndex)
              };
          };
      });
      
      // Service Worker pour le support PWA (Progressive Web App)
      if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
              navigator.serviceWorker.register('service-worker.js').then(registration => {
                  console.log('Service Worker enregistré avec succès:', registration.scope);
              }).catch(error => {
                  console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
              });
          });
      }