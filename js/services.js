// Company Service
export const CompanyService = {
    search(query) {
        console.log(`Recherche d'entreprise: ${query}`);
        return [
            { id: 1, name: "Microsoft France", sector: "Technologie", city: "Paris", rating: 4.8 },
            { id: 2, name: "Orange", sector: "Télécommunications", city: "Paris", rating: 4.2 },
            { id: 3, name: "Airbus", sector: "Aéronautique", city: "Toulouse", rating: 4.7 }
        ].filter(company => 
            company.name.toLowerCase().includes(query.toLowerCase()) || 
            company.sector.toLowerCase().includes(query.toLowerCase()) ||
            company.city.toLowerCase().includes(query.toLowerCase())
        );
    },

    create(companyData) {
        console.log("Création d'entreprise:", companyData);
        return { 
            success: true, 
            id: Math.floor(Math.random() * 1000) + 100 
        };
    },

    update(companyId, companyData) {
        console.log(`Mise à jour de l'entreprise #${companyId}:`, companyData);
        return { success: true };
    },

    delete(companyId) {
        console.log(`Suppression de l'entreprise #${companyId}`);
        return { success: true };
    },

    rate(companyId, rating, comment) {
        console.log(`Évaluation de l'entreprise #${companyId}: ${rating}/5`, comment);
        return { success: true };
    }
};

// Offer Service
export const OfferService = {
    search(query) {
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
    },

    create(offerData) {
        console.log("Création d'offre:", offerData);
        return { 
            success: true, 
            id: Math.floor(Math.random() * 1000) + 100 
        };
    },

    update(offerId, offerData) {
        console.log(`Mise à jour de l'offre #${offerId}:`, offerData);
        return { success: true };
    },

    delete(offerId) {
        console.log(`Suppression de l'offre #${offerId}`);
        return { success: true };
    },

    getStats(filters = {}) {
        return {
            totalOffers: 128,
            byMonth: {
                labels: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin'],
                values: [45, 52, 68, 78, 85, 92]
            },
            bySector: {
                labels: ['Tech', 'Finance', 'Marketing'],
                values: [35, 20, 15]
            }
        };
    }
};

// Student Service
export const StudentService = {
    search(query) {
        return [
            { id: 301, name: "Clara Rousseau", email: "c.rousseau@example.com", program: "Master 2" },
            { id: 302, name: "Maxime Dupont", email: "m.dupont@example.com", program: "Licence 3" },
            { id: 303, name: "Julie Bernard", email: "j.bernard@example.com", program: "Master 1" }
        ].filter(student => 
            student.name.toLowerCase().includes(query.toLowerCase()) || 
            student.email.toLowerCase().includes(query.toLowerCase())
        );
    },

    create(studentData) {
        console.log("Création d'étudiant:", studentData);
        return { 
            success: true, 
            id: Math.floor(Math.random() * 1000) + 300 
        };
    },

    update(studentId, studentData) {
        console.log(`Mise à jour de l'étudiant #${studentId}:`, studentData);
        return { success: true };
    },

    delete(studentId) {
        console.log(`Suppression de l'étudiant #${studentId}`);
        return { success: true };
    },

    getStats(studentId) {
        return {
            applications: 12,
            interviews: 5,
            offers: 2,
            wishlist: 8,
            applicationSuccess: 41.7,
            viewRate: 75
        };
    }
};

// Pilot Service
export const PilotService = {
    search(query) {
        return [
            { id: 201, name: "Pierre Martin", email: "p.martin@example.com", department: "Info" },
            { id: 202, name: "Marie Dubois", email: "m.dubois@example.com", department: "Marketing" }
        ].filter(pilot => 
            pilot.name.toLowerCase().includes(query.toLowerCase()) || 
            pilot.email.toLowerCase().includes(query.toLowerCase())
        );
    },

    create(pilotData) {
        console.log("Création de pilote:", pilotData);
        return { 
            success: true, 
            id: Math.floor(Math.random() * 1000) + 200 
        };
    },

    update(pilotId, pilotData) {
        console.log(`Mise à jour du pilote #${pilotId}:`, pilotData);
        return { success: true };
    },

    delete(pilotId) {
        console.log(`Suppression du pilote #${pilotId}`);
        return { success: true };
    }
};

// Application Service
export const ApplicationService = {
    create(studentId, offerId, applicationData) {
        console.log(`Nouvelle candidature - Étudiant #${studentId}, Offre #${offerId}`);
        return { 
            success: true, 
            id: Math.floor(Math.random() * 1000) + 400 
        };
    },

    getForStudent(studentId) {
        return [
            { 
                id: 501, 
                offerId: 101, 
                title: "Développeur Web Frontend", 
                company: "Microsoft France", 
                status: "En attente", 
                appliedAt: "2025-02-25" 
            }
        ];
    },

    updateStatus(applicationId, status) {
        console.log(`Mise à jour du statut de la candidature #${applicationId}: ${status}`);
        return { success: true };
    }
};

// Utils Service
export const UtilsService = {
    paginateData(data, page = 1, perPage = 10) {
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        
        return {
            total: data.length,
            pages: Math.ceil(data.length / perPage),
            currentPage: page,
            data: data.slice(startIndex, endIndex)
        };
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};