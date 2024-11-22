// Uçak bilgileri (örnek)
const aircraftData = [
    {
        "kuyrukKodu": "TC-123",
        "parkPozisyonu": "P1",
        "gelisSaati": "10:30",
        "arizaAciklamasi": "Motor arızası",
        "gidisTarihi": "2024-11-24 15:00",
        "calisanEkip": "Ekip A",
        "durum": "Arızalı",
        "konum": { lat: 40.975, lng: 29.029 } // Harita koordinatları
    },
    {
        "kuyrukKodu": "TC-456",
        "parkPozisyonu": "P2",
        "gelisSaati": "12:00",
        "arizaAciklamasi": "Sorun yok",
        "gidisTarihi": "2024-11-25 17:00",
        "calisanEkip": "Ekip B",
        "durum": "Hazır",
        "konum": { lat: 40.976, lng: 29.030 }
    }
];

// Listeyi güncelle
function updateAircraftList() {
    const tbody = document.querySelector('#aircraftTable tbody');
    tbody.innerHTML = '';  // Varolan veriyi temizle
    aircraftData.forEach(aircraft => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aircraft.kuyrukKodu}</td>
            <td>${aircraft.parkPozisyonu}</td>
            <td>${aircraft.gelisSaati}</td>
            <td>${aircraft.arizaAciklamasi}</td>
            <td>${aircraft.gidisTarihi}</td>
            <td>${aircraft.calisanEkip}</td>
            <td>${aircraft.durum}</td>
        `;
        tbody.appendChild(row);
    });
}

// Harita üzerinde uçakları göster
function initMap() {
    const mapOptions = {
        center: { lat: 40.975, lng: 29.029 },
        zoom: 15
    };
    const map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

    // Uçakların her birini haritada pin olarak ekle
    aircraftData.forEach(aircraft => {
        const marker = new google.maps.Marker({
            position: aircraft.konum,
            map: map,
            title: aircraft.kuyrukKodu
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <strong>${aircraft.kuyrukKodu}</strong><br>
                Park Pozisyonu: ${aircraft.parkPozisyonu}<br>
                Durum: ${aircraft.durum}<br>
                Geliş Saati: ${aircraft.gelisSaati}<br>
                Arıza: ${aircraft.arizaAciklamasi}
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Sekme geçişi
document.getElementById('listTab').addEventListener('click', function() {
    document.getElementById('list').classList.add('active');
    document.getElementById('map').classList.remove('active');
    document.getElementById('listTab').classList.add('active');
    document.getElementById('mapTab').classList.remove('active');
});

document.getElementById('mapTab').addEventListener('click', function() {
    document.getElementById('map').classList.add('active');
    document.getElementById('list').classList.remove('active');
    document.getElementById('mapTab').classList.add('active');
    document.getElementById('listTab').classList.remove('active');
});

// Sayfa yüklendiğinde listeyi ve haritayı güncelle
window.onload = function() {
    updateAircraftList();
    initMap();
};
