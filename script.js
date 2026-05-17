/* ============================================
   EMPIRE PROPERTY SHOWROOM - JavaScript
   Dubai Real Estate Website
   ============================================ */

// Property Data
const properties = [
    {
        id: 1,
        title: "Luxury Marina Apartment",
        price: "AED 850,000",
        type: "apartment",
        category: "buy",
        location: "Dubai Marina",
        bedrooms: 2,
        bathrooms: 2,
        sqft: "1,200",
        image: "🏢",
        description: "Stunning 2-bedroom apartment with panoramic marina views. Modern amenities, smart home features, and premium finishing.",
        amenities: ["Marina View", "Gym", "Pool", "Parking", "Security", "Elevator"]
    },
    {
        id: 2,
        title: "Palm Jumeirah Luxury Villa",
        price: "AED 4,500,000",
        type: "villa",
        category: "offplan",
        location: "Palm Jumeirah",
        bedrooms: 5,
        bathrooms: 4,
        sqft: "4,500",
        image: "🏰",
        description: "Exclusive off-plan villa on Palm Jumeirah with private beach access, infinity pool, and state-of-the-art design.",
        amenities: ["Private Beach", "Infinity Pool", "Home Theater", "Spa", "Wine Cellar", "Smart Home"]
    },
    {
        id: 3,
        title: "JBR Beach Apartment",
        price: "AED 3,800/month",
        type: "apartment",
        category: "rent",
        location: "Jumeirah Beach Residence",
        bedrooms: 1,
        bathrooms: 1,
        sqft: "650",
        image: "🏖️",
        description: "Cozy 1-bedroom apartment steps from the beach. Fully furnished with modern amenities and beach access.",
        amenities: ["Beach Access", "Furnished", "Pool", "Gym", "Parking", "WiFi"]
    },
    {
        id: 4,
        title: "Emirates Hills Luxury Villa",
        price: "AED 8,500,000",
        type: "villa",
        category: "buy",
        location: "Emirates Hills",
        bedrooms: 7,
        bathrooms: 6,
        sqft: "8,000",
        image: "👑",
        description: "Palatial villa in prestigious Emirates Hills with panoramic views, lush gardens, and luxury amenities.",
        amenities: ["Golf Course View", "Tennis Court", "Private Pool", "Sauna", "Guest House", "Theater"]
    },
    {
        id: 5,
        title: "DAMAC Off-Plan Townhouse",
        price: "AED 1,800,000",
        type: "townhouse",
        category: "offplan",
        location: "DAMAC Hills",
        bedrooms: 3,
        bathrooms: 3,
        sqft: "2,200",
        image: "🏘️",
        description: "Modern off-plan townhouse in DAMAC Hills with luxury finishes, community amenities, and flexible payment plans.",
        amenities: ["Community Pool", "Gym", "Park", "Security", "Payment Plan", "Maid's Room"]
    },
    {
        id: 6,
        title: "Downtown Dubai Studio",
        price: "AED 450,000",
        type: "studio",
        category: "buy",
        location: "Downtown Dubai",
        bedrooms: 0,
        bathrooms: 1,
        sqft: "450",
        image: "🏙️",
        description: "Compact studio apartment in prime Downtown Dubai location. Perfect for investment or first-time buyers.",
        amenities: ["Burj Khalifa View", "Pool", "Gym", "Parking", "Elevator", "Security"]
    },
    {
        id: 7,
        title: "Arabian Ranches Villa",
        price: "AED 2,200/month",
        type: "villa",
        category: "rent",
        location: "Arabian Ranches",
        bedrooms: 4,
        bathrooms: 3,
        sqft: "3,200",
        image: "🌳",
        description: "Beautiful villa in Arabian Ranches community with garden, pool, and exclusive amenities.",
        amenities: ["Private Pool", "Garden", "Golf Course", "Equestrian", "Community Center", "Security"]
    },
    {
        id: 8,
        title: "Business Bay Office Apartment",
        price: "AED 2,100,000",
        type: "apartment",
        category: "buy",
        location: "Business Bay",
        bedrooms: 3,
        bathrooms: 2,
        sqft: "1,800",
        image: "💼",
        description: "Premium 3-bedroom apartment in Business Bay. Ideal for professionals and families with easy access to business district.",
        amenities: ["City View", "Gym", "Pool", "Parking", "Shopping", "Restaurants"]
    },
    {
        id: 9,
        title: "Bluewaters Island Luxury Apartment",
        price: "AED 1,950,000",
        type: "apartment",
        category: "offplan",
        location: "Bluewaters Island",
        bedrooms: 2,
        bathrooms: 2,
        sqft: "1,400",
        image: "🌊",
        description: "Stunning off-plan apartment on Bluewaters Island with waterfront views and exclusive island amenities.",
        amenities: ["Waterfront View", "Ferris Wheel Access", "Beach", "Shopping", "Dining", "Entertainment"]
    },
    {
        id: 10,
        title: "The Sustainability City Townhouse",
        price: "AED 1,500,000",
        type: "townhouse",
        category: "buy",
        location: "Sustainability City",
        bedrooms: 3,
        bathrooms: 2,
        sqft: "1,900",
        image: "🌱",
        description: "Eco-friendly townhouse in Dubai's first sustainable community with green spaces and eco-conscious design.",
        amenities: ["Green Space", "Solar Panels", "Community Farm", "Organic Market", "Parks", "Trail"]
    },
    {
        id: 11,
        title: "Dubai Sports City Apartment",
        price: "AED 2,400/month",
        type: "apartment",
        category: "rent",
        location: "Dubai Sports City",
        bedrooms: 2,
        bathrooms: 2,
        sqft: "1,100",
        image: "⚽",
        description: "Modern apartment in Dubai Sports City with access to sports facilities, gyms, and entertainment venues.",
        amenities: ["Sports Facilities", "Gym", "Pool", "Stadium View", "Restaurants", "Retail"]
    },
    {
        id: 12,
        title: "Creekside Luxury Penthouse",
        price: "AED 6,200,000",
        type: "apartment",
        category: "buy",
        location: "Dubai Creek Harbour",
        bedrooms: 4,
        bathrooms: 3,
        sqft: "3,100",
        image: "✨",
        description: "Luxury penthouse overlooking Dubai Creek with stunning architecture, panoramic views, and premium finishes.",
        amenities: ["Creek View", "Rooftop Terrace", "Infinity Pool", "Spa", "Concierge", "Private Elevator"]
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProperties(properties);
});

// Display Properties Function
function displayProperties(propertiesToDisplay) {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';

    if (propertiesToDisplay.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <div class="no-results-icon">🏠</div>
                <p>No properties found. Please try a different search.</p>
            </div>
        `;
        return;
    }

    propertiesToDisplay.forEach(property => {
        const categoryClass = `category-${property.category}`;
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-image">${property.image}</div>
            <div class="property-details">
                <div class="property-header">
                    <div class="property-title">${property.title}</div>
                    <span class="property-category ${categoryClass}">${property.category}</span>
                </div>
                <div class="property-price">${property.price}</div>
                <div class="property-location">📍 ${property.location}</div>
                <div class="property-specs">
                    <div class="spec">
                        <span class="spec-value">${property.bedrooms}</span>
                        <span class="spec-label">Bedrooms</span>
                    </div>
                    <div class="spec">
                        <span class="spec-value">${property.bathrooms}</span>
                        <span class="spec-label">Bathrooms</span>
                    </div>
                    <div class="spec">
                        <span class="spec-value">${property.sqft}</span>
                        <span class="spec-label">Sq Ft</span>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="btn-details" onclick="viewPropertyDetails(${property.id})">View Details</button>
                    <button class="btn-contact" onclick="contactWhatsApp('${property.title}')">Contact</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// View Property Details Function
function viewPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');

    const amenitiesHTML = property.amenities
        .map(amenity => `<li>${amenity}</li>`)
        .join('');

    modalBody.innerHTML = `
        <div class="property-image" style="height: 300px; margin-bottom: 20px;">${property.image}</div>
        
        <div class="modal-property-title">${property.title}</div>
        <div class="modal-property-price">${property.price}</div>

        <div class="modal-section">
            <h3>📍 Location & Details</h3>
            <div class="modal-specs">
                <div class="modal-spec-item">
                    <strong>Location:</strong> ${property.location}
                </div>
                <div class="modal-spec-item">
                    <strong>Type:</strong> ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </div>
                <div class="modal-spec-item">
                    <strong>Category:</strong> ${property.category.charAt(0).toUpperCase() + property.category.slice(1)}
                </div>
                <div class="modal-spec-item">
                    <strong>Size:</strong> ${property.sqft} Sq Ft
                </div>
                <div class="modal-spec-item">
                    <strong>Bedrooms:</strong> ${property.bedrooms}
                </div>
                <div class="modal-spec-item">
                    <strong>Bathrooms:</strong> ${property.bathrooms}
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3>📝 Description</h3>
            <p>${property.description}</p>
        </div>

        <div class="modal-section">
            <h3>✨ Amenities</h3>
            <ul class="amenities-list">
                ${amenitiesHTML}
            </ul>
        </div>

        <div class="modal-section">
            <h3>📞 Contact Us</h3>
            <p style="margin-bottom: 10px;">Interested in this property? Get in touch with our team:</p>
            <button class="btn btn-contact" style="width: 100%; margin-bottom: 10px;" onclick="contactWhatsApp('${property.title}')">
                💬 Contact via WhatsApp
            </button>
            <button class="btn btn-primary" style="width: 100%;" onclick="contactPhone()">
                ☎️ Call Us
            </button>
        </div>
    `;

    modal.classList.add('show');
}

// Close Modal Function
function closeModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('propertyModal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// Filter Properties Function
function filterProperties() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filtered = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchInput) ||
                             property.location.toLowerCase().includes(searchInput);
        const matchesType = typeFilter === '' || property.type === typeFilter;
        const matchesCategory = categoryFilter === '' || property.category === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
    });

    displayProperties(filtered);
}

// Reset Filters Function
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    displayProperties(properties);
}

// WhatsApp Contact Function
function contactWhatsApp(propertyTitle) {
    const phoneNumber = '+971543225393';
    const message = `Hi! I'm interested in the "${propertyTitle}" property. Please provide more information.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Phone Contact Function
function contactPhone() {
    window.location.href = 'tel:+971543225393';
}

// Handle Contact Form Submit
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const phoneNumber = '+971543225393';
    const whatsappMessage = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest}
Message: ${message}
    `.trim();
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form
    event.target.reset();
    alert('Thank you! Your message has been sent via WhatsApp. Our team will contact you shortly.');
}

// Search on Enter key
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.id === 'searchInput') {
        filterProperties();
    }
});