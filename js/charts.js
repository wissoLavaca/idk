export function initCharts() {
    initOffersChart();
    initStudentsStatsChart();
}

function initOffersChart() {
    const offersChartElem = document.getElementById('offersChart');
    if (!offersChartElem) return;

    const ctx = offersChartElem.getContext('2d');
    
    // Create gradients
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    
    const gradientSecondary = ctx.createLinearGradient(0, 0, 0, 400);
    gradientSecondary.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
    gradientSecondary.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

    const offersChart = new Chart(ctx, {
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
        options: getChartOptions()
    });

    // Initialize filter buttons
    initChartFilters(offersChart);
}

function initStudentsStatsChart() {
    const studentsStatsChartElem = document.getElementById('studentsStatsChart');
    if (!studentsStatsChartElem) return;

    const ctx = studentsStatsChartElem.getContext('2d');

    // Create gradients
    const gradients = [
        createGradient(ctx, '16, 185, 129'), // Success
        createGradient(ctx, '245, 158, 11'), // Warning
        createGradient(ctx, '239, 68, 68')   // Danger
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Master 2', 'Master 1', 'Licence 3', 'Licence Pro'],
            datasets: [
                {
                    label: 'Avec stage',
                    data: [72, 65, 58, 78],
                    backgroundColor: gradients[0],
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                },
                {
                    label: 'En recherche',
                    data: [25, 28, 38, 18],
                    backgroundColor: gradients[1],
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sans recherche',
                    data: [3, 7, 4, 4],
                    backgroundColor: gradients[2],
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: getChartOptions(true)
    });
}

function createGradient(ctx, rgb) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `rgba(${rgb}, 0.7)`);
    gradient.addColorStop(1, `rgba(${rgb}, 0.1)`);
    return gradient;
}

function getChartOptions(isBarChart = false) {
    return {
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
                    },
                    callback: function(value) {
                        return isBarChart ? value + '%' : value;
                    }
                }
            }
        }
    };
}

function initChartFilters(chart) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateFilterButtons(this);
            updateChartData(chart, parseInt(this.getAttribute('data-period')));
        });
    });
}

function updateFilterButtons(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600/50');
        btn.classList.add('bg-slate-700/50', 'hover:bg-slate-600/50');
    });
    
    activeButton.classList.remove('bg-slate-700/50', 'hover:bg-slate-600/50');
    activeButton.classList.add('bg-blue-600/50');
}

function updateChartData(chart, period) {
    let newLabels, newData1, newData2;

    switch(period) {
        case 30:
            newLabels = ['1', '5', '10', '15', '20', '25', '30'];
            newData1 = [12, 19, 15, 20, 18, 25, 30];
            newData2 = [25, 32, 30, 45, 40, 48, 52];
            break;
        case 90:
            newLabels = ['Jan', 'Fév', 'Mars'];
            newData1 = [45, 52, 68];
            newData2 = [120, 145, 160];
            break;
        default:
            newLabels = ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
            newData1 = [45, 52, 68, 78, 85, 92, 90, 85, 110, 128, 142, 155];
            newData2 = [120, 145, 160, 180, 190, 210, 200, 195, 250, 280, 310, 340];
    }

    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData1;
    chart.data.datasets[1].data = newData2;
    chart.update();
}

export { initCharts };