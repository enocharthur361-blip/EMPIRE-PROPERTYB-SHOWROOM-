// Dashboard JS

// Initialize Dashboard
let currentUser = null;
let userListings = [];

document.addEventListener('DOMContentLoaded', function() {
    currentUser = checkAuth();
    loadDashboard();
    setupEventListeners();
});

function loadDashboard() {
    document.getElementById('userName').textContent = currentUser.name;
    updatePlanBadge();
    loadUserListings();
    updateStats();
}

function updatePlanBadge() {
    const planText = currentUser.subscription.plan === 'premium' ? 'Premium Plan' : 'Free Plan';
    document.getElementById('userPlan').textContent = planText;
    
    const freeBtn = document.getElementById('freeBtn');
    if (currentUser.subscription.plan === 'free') {
        freeBtn.disabled = true;
        freeBtn.textContent = 'Current Plan';
    } else {
        freeBtn.disabled = false;
        freeBtn.textContent = 'Downgrade';
    }
}

function setupEventListeners() {
    const uploadArea = document.getElementById('uploadArea');
    
    uploadArea.addEventListener('click', () => {
        document.getElementById('mediaFiles').click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = '';
    });
}

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update header
    const titles = {
        'overview': 'Dashboard Overview',
        'listings': 'My Property Listings',
        'create-listing': 'Create New Listing',
        'subscription': 'Subscription Plans',
        'team': 'Team Management',
        'analytics': 'Property Analytics'
    };
    
    document.getElementById('sectionTitle').textContent = titles[sectionName];
    
    // Handle section-specific logic
    if (sectionName === 'listings') {
        loadListings();
    } else if (sectionName === 'team') {
        loadTeamManagement();
    } else if (sectionName === 'analytics') {
        loadAnalytics();
    }
}

function loadUserListings() {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    userListings = listings.filter(l => l.userId === currentUser.id);
    
    const recentListings = userListings.slice(0, 3);
    const container = document.getElementById('recentListings');
    
    if (recentListings.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No listings yet. Create your first listing!</p>';
        return;
    }
    
    container.innerHTML = recentListings.map(listing => createListingCard(listing)).join('');
}

function loadListings() {
    const container = document.getElementById('listingsContainer');
    
    if (userListings.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No listings yet. Create your first listing!</p>';
        return;
    }
    
    container.innerHTML = userListings.map(listing => createListingCard(listing)).join('');
}

function createListingCard(listing) {
    return `
        <div class="listing-card">
            <div class="listing-image">${listing.type === 'apartment' ? '🏢' : listing.type === 'villa' ? '🏰' : '🏘️'}</div>
            <div class="listing-info">
                <h3>${listing.title}</h3>
                <div class="listing-price">AED ${listing.price}</div>
                <div class="listing-location">📍 ${listing.location}</div>
                <div class="listing-actions">
                    <button class="btn-edit" onclick="editListing(${listing.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteListing(${listing.id})">Delete</button>
                </div>
            </div>
        </div>
    `;
}

function handleCreateListing(event) {
    event.preventDefault();
    
    // Check listing limit for free users
    if (currentUser.subscription.plan === 'free' && userListings.length >= 5) {
        alert('You have reached the listing limit for the Free plan. Please upgrade to Premium.');
        switchSection('subscription');
        return;
    }
    
    const listing = {
        id: Date.now(),
        userId: currentUser.id,
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        location: document.getElementById('location').value,
        bedrooms: document.getElementById('bedrooms').value || 0,
        bathrooms: document.getElementById('bathrooms').value || 0,
        sqft: document.getElementById('sqft').value || 0,
        description: document.getElementById('description').value,
        amenities: getSelectedAmenities(),
        media: getUploadedMedia(),
        views: 0,
        inquiries: 0,
        createdAt: new Date().toISOString()
    };
    
    // Save listing
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    listings.push(listing);
    localStorage.setItem('listings', JSON.stringify(listings));
    
    // Update user listings count
    currentUser.subscription.listingsUsed++;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Listing created successfully!');
    document.getElementById('listingForm').reset();
    loadDashboard();
    switchSection('listings');
}

function getSelectedAmenities() {
    const checkboxes = document.querySelectorAll('.amenities-list input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function getUploadedMedia() {
    // In a real application, this would upload to a server
    // For now, we're just storing file names
    const files = document.getElementById('mediaFiles').files;
    return Array.from(files).map(f => f.name);
}

function handleFileUpload(event) {
    const files = event.target.files;
    const preview = document.getElementById('mediaPreview');
    preview.innerHTML = '';
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = e.target.result;
                preview.appendChild(video);
            }
        };
        reader.readAsDataURL(file);
    });
}

function editListing(id) {
    alert('Edit functionality coming soon!');
}

function deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        const listings = JSON.parse(localStorage.getItem('listings')) || [];
        const filtered = listings.filter(l => l.id !== id);
        localStorage.setItem('listings', JSON.stringify(filtered));
        loadDashboard();
        alert('Listing deleted successfully!');
    }
}

function updateStats() {
    const totalListings = userListings.length;
    const totalViews = userListings.reduce((sum, l) => sum + (l.views || 0), 0);
    const totalInquiries = userListings.reduce((sum, l) => sum + (l.inquiries || 0), 0);
    
    document.getElementById('totalListings').textContent = totalListings;
    document.getElementById('totalViews').textContent = totalViews;
    document.getElementById('totalInquiries').textContent = totalInquiries;
    document.getElementById('subscriptionStatus').textContent = currentUser.subscription.plan === 'premium' ? 'Premium Plan' : 'Free Plan';
}

function changePlan(plan) {
    if (plan === 'free') {
        currentUser.subscription.plan = 'free';
        currentUser.subscription.features = {
            analysis: false,
            prioritySupport: false,
            videoUpload: false
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updatePlanBadge();
        alert('You have downgraded to the Free plan.');
    }
}

function upgradeToPremium() {
    // Integrate with PayPal
    initiatePayPalPayment();
}

function initiatePayPalPayment() {
    // Create PayPal payment link
    // For demo purposes, we'll simulate the payment
    const paypalLink = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=EMPIRE+Premium+Plan&amount=99.00&currency_code=AED&return=${window.location.origin}/dashboard.html&cancel_return=${window.location.origin}/dashboard.html`;
    
    // For now, simulate payment success
    setTimeout(() => {
        currentUser.subscription.plan = 'premium';
        currentUser.subscription.status = 'active';
        currentUser.subscription.features = {
            analysis: true,
            prioritySupport: true,
            videoUpload: true,
            bulkUpload: true
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updatePlanBadge();
        alert('Welcome to Premium! Enjoy unlimited listings and advanced features.');
        switchSection('overview');
    }, 2000);
    
    // Uncomment below for real PayPal integration
    // window.open(paypalLink, '_blank');
}

function loadTeamManagement() {
    const teamSection = document.getElementById('teamSection');
    
    if (currentUser.role !== 'broker') {
        teamSection.innerHTML = '<p>Team management is only available for Brokers/Agencies.</p>';
        return;
    }
    
    teamSection.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; border: 2px solid #d4af37;">
            <h3 style="color: #0a0e27; margin-bottom: 20px;">Add Team Member</h3>
            <form onsubmit="addTeamMember(event)">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <input type="text" id="memberName" placeholder="Team Member Name" required>
                    <input type="email" id="memberEmail" placeholder="Team Member Email" required>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%;">Add Member</button>
            </form>
            
            <h3 style="color: #0a0e27; margin-top: 30px; margin-bottom: 20px;">Team Members</h3>
            <div id="teamList"></div>
        </div>
    `;
    
    loadTeamList();
}

function addTeamMember(event) {
    event.preventDefault();
    alert('Team member invitation sent!');
}

function loadTeamList() {
    const teamMembers = currentUser.teamMembers || [];
    const teamList = document.getElementById('teamList');
    
    if (teamMembers.length === 0) {
        teamList.innerHTML = '<p style="color: #666;">No team members yet.</p>';
        return;
    }
    
    teamList.innerHTML = teamMembers.map(member => `
        <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
            <p style="color: #0a0e27; font-weight: 700;">${member.name}</p>
            <p style="color: #666; font-size: 14px;">${member.email}</p>
        </div>
    `).join('');
}

function loadAnalytics() {
    const analyticsContent = document.getElementById('analyticsContent');
    
    if (currentUser.subscription.plan !== 'premium') {
        analyticsContent.innerHTML = '<div style="background: white; padding: 40px; border-radius: 15px; border: 2px solid #d4af37; text-align: center;"><p style="color: #666; margin-bottom: 20px;">Advanced analytics is a Premium feature.</p><button class="btn-primary" onclick="switchSection(\'subscription\')" style="width: auto;">Upgrade to Premium</button></div>';
        return;
    }
    
    analyticsContent.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; border: 2px solid #d4af37;">
            <h3 style="color: #0a0e27; margin-bottom: 20px;">Your Analytics Dashboard</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                    <p style="color: #666; margin-bottom: 10px;">Average Views per Listing</p>
                    <p style="color: #d4af37; font-size: 28px; font-weight: 900;">450</p>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                    <p style="color: #666; margin-bottom: 10px;">Conversion Rate</p>
                    <p style="color: #d4af37; font-size: 28px; font-weight: 900;">8.5%</p>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                    <p style="color: #666; margin-bottom: 10px;">Inquiry Response Time</p>
                    <p style="color: #d4af37; font-size: 28px; font-weight: 900;">2hrs</p>
                </div>
            </div>
        </div>
    `;
}