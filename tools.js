// Tools JavaScript - Mortgage Calculator, Property Comparison, Virtual Tour

// ==========================================
// MORTGAGE CALCULATOR
// ==========================================

function calculateAndDisplay(event) {
    event.preventDefault();
    
    const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    
    // Validation
    if (downPayment >= propertyPrice) {
        alert('Down payment must be less than property price!');
        return;
    }
    
    // Calculate
    const result = calculateMortgage(propertyPrice, downPayment, interestRate, loanTerm);
    
    // Display results
    document.getElementById('loanAmount').textContent = `AED ${result.loanAmount.toLocaleString()}`;
    document.getElementById('monthlyPayment').textContent = `AED ${result.monthlyPayment.toLocaleString()}`;
    document.getElementById('totalPayment').textContent = `AED ${result.totalPayment.toLocaleString()}`;
    document.getElementById('totalInterest').textContent = `AED ${result.totalInterest.toLocaleString()}`;
    
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function calculateMortgage(propertyPrice, downPayment, interestRate, loanTerm) {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return {
        propertyPrice: propertyPrice,
        downPayment: downPayment,
        loanAmount: principal,
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(monthlyPayment * numberOfPayments),
        totalInterest: Math.round((monthlyPayment * numberOfPayments) - principal),
        interestRate: interestRate,
        loanTerm: loanTerm
    };
}

// ==========================================
// PROPERTY COMPARISON
// ==========================================

function initializePropertySelector() {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const select = document.getElementById('propertySelect');
    
    if (!select) return;
    
    listings.forEach(listing => {
        const option = document.createElement('option');
        option.value = listing.id;
        option.textContent = `${listing.title} - AED ${listing.price.toLocaleString()} (${listing.location})`;
        select.appendChild(option);
    });
}

function addPropertiesToCompare() {
    const select = document.getElementById('propertySelect');
    const selectedIds = Array.from(select.selectedOptions).map(opt => parseInt(opt.value));
    
    if (selectedIds.length < 2) {
        alert('Please select at least 2 properties to compare');
        return;
    }
    
    if (selectedIds.length > 4) {
        alert('You can compare a maximum of 4 properties');
        return;
    }
    
    compareProperties(selectedIds);
}

function compareProperties(propertyIds) {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const properties = listings.filter(l => propertyIds.includes(l.id));
    
    // Update table headers
    const headerRow = document.getElementById('propertyHeaders');
    headerRow.innerHTML = '<th>Criteria</th>';
    
    properties.forEach((prop, index) => {
        const th = document.createElement('th');
        th.innerHTML = `<strong>${prop.title}</strong><br>${prop.location}`;
        headerRow.appendChild(th);
    });
    
    // Update table data
    properties.forEach((prop, index) => {
        document.getElementById(`price-${index}`).textContent = `AED ${prop.price.toLocaleString()}`;
        document.getElementById(`beds-${index}`).textContent = prop.bedrooms || '-';
        document.getElementById(`baths-${index}`).textContent = prop.bathrooms || '-';
        document.getElementById(`sqft-${index}`).textContent = prop.sqft || '-';
        document.getElementById(`location-${index}`).textContent = prop.location;
        
        const pricePerSqft = prop.sqft ? Math.round(prop.price / prop.sqft) : '-';
        document.getElementById(`pricePerSqft-${index}`).textContent = 
            pricePerSqft !== '-' ? `AED ${pricePerSqft}` : '-';
    });
    
    document.getElementById('comparisonTable').style.display = 'block';
}

// Initialize on page load
if (document.getElementById('propertySelect')) {
    document.addEventListener('DOMContentLoaded', initializePropertySelector);
}

// ==========================================
// VIRTUAL TOUR
// ==========================================

let currentMediaIndex = 0;
let tourMedia = [];

function initializeVirtualTour() {
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');
    
    if (!tourId) return;
    
    const tours = JSON.parse(localStorage.getItem('virtualTours')) || [];
    const tour = tours.find(t => t.id == tourId);
    
    if (!tour) return;
    
    tourMedia = tour.media || [];
    currentMediaIndex = 0;
    
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const listing = listings.find(l => l.id === tour.listingId);
    
    if (listing) {
        document.getElementById('tourTitle').textContent = `Virtual Tour - ${listing.title}`;
    }
    
    displayMedia();
}

function displayMedia() {
    if (tourMedia.length === 0) return;
    
    const media = tourMedia[currentMediaIndex];
    
    if (media.type === 'image') {
        document.getElementById('tourImage').style.display = 'block';
        document.getElementById('tourVideo').style.display = 'none';
        document.getElementById('tourImage').src = media.url;
    } else if (media.type === 'video') {
        document.getElementById('tourImage').style.display = 'none';
        document.getElementById('tourVideo').style.display = 'block';
        document.getElementById('videoSource').src = media.url;
        document.getElementById('tourVideo').load();
    }
    
    document.getElementById('mediaTitle').textContent = media.title || 'Property Media';
    document.getElementById('mediaDescription').textContent = media.description || '';
    document.getElementById('mediaCounter').textContent = `${currentMediaIndex + 1} of ${tourMedia.length}`;
}

function nextMedia() {
    if (currentMediaIndex < tourMedia.length - 1) {
        currentMediaIndex++;
        displayMedia();
    }
}

function previousMedia() {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
        displayMedia();
    }
}

function goBack() {
    window.history.back();
}

if (document.getElementById('tourTitle')) {
    document.addEventListener('DOMContentLoaded', initializeVirtualTour);
}