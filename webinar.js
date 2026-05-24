/**
 * EMPIRE Property Showroom - Live Webinar Integration
 * Zoom Webinar & Meeting Integration for 24/7 Property Shows
 */

// ==================== CONFIGURATION ====================
const ZOOM_CONFIG = {
    // Replace with your Zoom API credentials
    apiKey: 'YOUR_ZOOM_API_KEY',
    apiSecret: 'YOUR_ZOOM_API_SECRET',
    clientId: 'YOUR_ZOOM_CLIENT_ID',
    
    // Meeting/Webinar Configuration
    meetingId: null,
    userName: 'Property Viewer',
    password: '',
    leaveUrl: 'https://empire-property.com',
};

// Sample properties data for showcase
const PROPERTIES = [
    {
        id: 1,
        name: 'Luxury Penthouse - Downtown',
        price: '$2,500,000',
        location: 'Downtown District',
        bedrooms: 4,
        bathrooms: 3,
        sqft: '3,500 sq ft',
        image: 'https://via.placeholder.com/300x200?text=Penthouse',
        description: 'Stunning penthouse with panoramic city views'
    },
    {
        id: 2,
        name: 'Family Home - Suburbs',
        price: '$850,000',
        location: 'Green Valley',
        bedrooms: 5,
        bathrooms: 3,
        sqft: '4,200 sq ft',
        image: 'https://via.placeholder.com/300x200?text=Family+Home',
        description: 'Spacious family home with large backyard'
    },
    {
        id: 3,
        name: 'Modern Condo - Waterfront',
        price: '$1,200,000',
        location: 'Waterfront Marina',
        bedrooms: 3,
        bathrooms: 2,
        sqft: '2,100 sq ft',
        image: 'https://via.placeholder.com/300x200?text=Condo',
        description: 'Contemporary condo with water views and amenities'
    },
    {
        id: 4,
        name: 'Historic Estate - Countryside',
        price: '$1,800,000',
        location: 'Rolling Hills',
        bedrooms: 6,
        bathrooms: 4,
        sqft: '5,800 sq ft',
        image: 'https://via.placeholder.com/300x200?text=Estate',
        description: 'Beautiful historic estate on 5 acres'
    }
];

// ==================== STATE MANAGEMENT ====================
let webinarState = {
    isJoined: false,
    meetingStartTime: null,
    participantCount: 0,
    recordingEnabled: false,
    currentProperty: PROPERTIES[0],
    messages: []
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Webinar Interface Initialized');
    
    // Initialize UI
    initializeUI();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load properties gallery
    loadPropertiesGallery();
    
    // Start update loop
    startStatusUpdates();
    
    // Initialize Zoom SDK (when API key is configured)
    if (ZOOM_CONFIG.apiKey !== 'YOUR_ZOOM_API_KEY') {
        initializeZoomSDK();
    } else {
        updateStatus('Configuration Required', 'error');
        console.warn('Zoom API credentials not configured. Please set your API credentials in webinar.js');
    }
});

// ==================== ZOOM SDK INITIALIZATION ====================
function initializeZoomSDK() {
    try {
        // Initialize Zoom SDK with your credentials
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        
        console.log('Zoom SDK initialized');
        updateStatus('Ready to Connect', 'success');
    } catch (error) {
        console.error('Error initializing Zoom SDK:', error);
        updateStatus('Connection Error', 'error');
    }
}

// ==================== WEBINAR CONTROLS ====================
function joinMeeting() {
    if (!ZOOM_CONFIG.meetingId) {
        showAlert('Meeting ID not configured. Please add meeting details.', 'warning');
        return;
    }

    try {
        // Generate signature (this should be done server-side in production)
        const signature = generateZoomSignature();
        
        // Join meeting
        ZoomMtg.init({
            leaveUrl: ZOOM_CONFIG.leaveUrl,
            isSupportAV: true,
            success: (success) => {
                console.log('Zoom init success');
                
                ZoomMtg.join({
                    signature: signature,
                    meetingNumber: ZOOM_CONFIG.meetingId,
                    userName: ZOOM_CONFIG.userName,
                    apiKey: ZOOM_CONFIG.apiKey,
                    userEmail: '',
                    passWord: ZOOM_CONFIG.password,
                    tk: '',
                    success: (success) => {
                        console.log('Joined meeting successfully');
                        webinarState.isJoined = true;
                        webinarState.meetingStartTime = new Date();
                        updateStatus('Connected to Meeting', 'success');
                        document.getElementById('joinMeetingBtn').textContent = 'Leave Meeting';
                    },
                    error: (error) => {
                        console.error('Failed to join meeting:', error);
                        updateStatus('Failed to Connect', 'error');
                    }
                });
            },
            error: (error) => {
                console.error('Zoom init error:', error);
                updateStatus('SDK Error', 'error');
            }
        });
    } catch (error) {
        console.error('Error joining meeting:', error);
        updateStatus('Connection Error', 'error');
    }
}

function leaveMeeting() {
    try {
        webinarState.isJoined = false;
        document.getElementById('joinMeetingBtn').textContent = 'Join Meeting';
        updateStatus('Disconnected', 'info');
        console.log('Left meeting');
    } catch (error) {
        console.error('Error leaving meeting:', error);
    }
}

function toggleRecording() {
    webinarState.recordingEnabled = !webinarState.recordingEnabled;
    const recordBtn = document.getElementById('recordBtn');
    
    if (webinarState.recordingEnabled) {
        recordBtn.classList.add('recording');
        recordBtn.textContent = '⏹ Stop Recording';
        showAlert('Recording started - Session will be saved', 'success');
    } else {
        recordBtn.classList.remove('recording');
        recordBtn.textContent = '🔴 Enable Recording';
        showAlert('Recording stopped', 'info');
    }
}

function scheduleSession() {
    const schedule = prompt('Enter session details (e.g., "June 25, 2:00 PM - Penthouse Tour")', 'June 25, 2:00 PM');
    if (schedule) {
        showAlert(`Session scheduled: ${schedule}`, 'success');
        // In production, this would save to a database
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    document.getElementById('joinMeetingBtn').addEventListener('click', () => {
        if (webinarState.isJoined) {
            leaveMeeting();
        } else {
            joinMeeting();
        }
    });

    document.getElementById('recordBtn').addEventListener('click', toggleRecording);
    document.getElementById('scheduleBtn').addEventListener('click', scheduleSession);
    
    // Chat functionality
    document.getElementById('sendChatBtn').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Property selection from gallery
    document.addEventListener('click', (e) => {
        if (e.target.closest('.property-card')) {
            const propertyCard = e.target.closest('.property-card');
            const propertyId = parseInt(propertyCard.dataset.propertyId);
            selectProperty(propertyId);
        }
    });
}

// ==================== CHAT FUNCTIONALITY ====================
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;

    const messageObj = {
        sender: ZOOM_CONFIG.userName,
        text: message,
        timestamp: new Date(),
        isUser: true
    };

    webinarState.messages.push(messageObj);
    addChatMessageToUI(messageObj);
    chatInput.value = '';

    // Simulate response (in production, this would be real-time chat)
    setTimeout(() => {
        const response = {
            sender: 'EMPIRE Agent',
            text: generateAgentResponse(message),
            timestamp: new Date(),
            isUser: false
        };
        webinarState.messages.push(response);
        addChatMessageToUI(response);
    }, 1000);
}

function addChatMessageToUI(messageObj) {
    const chatMessages = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${messageObj.isUser ? 'user' : 'agent'}`;
    messageEl.innerHTML = `
        <strong>${messageObj.sender}:</strong> ${messageObj.text}
        <span class="timestamp">${messageObj.timestamp.toLocaleTimeString()}</span>
    `;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAgentResponse(userMessage) {
    const responses = [
        'Great question! Let me share more about this property.',
        'I can schedule a private tour for you if you\'d like.',
        'Would you like to know more about the financing options?',
        'This property is perfect for your needs. Shall we arrange a viewing?',
        'Thanks for your interest! Any other questions about the property?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// ==================== PROPERTIES MANAGEMENT ====================
function loadPropertiesGallery() {
    const gallery = document.getElementById('propertiesGallery');
    gallery.innerHTML = '';

    PROPERTIES.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.dataset.propertyId = property.id;
        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.name}">
            <div class="property-card-content">
                <h4>${property.name}</h4>
                <p class="price">${property.price}</p>
                <p class="details">${property.bedrooms} bed | ${property.bathrooms} bath | ${property.sqft}</p>
                <p class="location">📍 ${property.location}</p>
                <button class="view-btn">View Property</button>
            </div>
        `;
        gallery.appendChild(propertyCard);
    });
}

function selectProperty(propertyId) {
    const property = PROPERTIES.find(p => p.id === propertyId);
    if (property) {
        webinarState.currentProperty = property;
        updatePropertyInfo();
        
        // Highlight selected property
        document.querySelectorAll('.property-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-property-id="${propertyId}"]`).classList.add('active');
        
        console.log('Property selected:', property.name);
    }
}

function updatePropertyInfo() {
    const prop = webinarState.currentProperty;
    document.getElementById('propertyName').textContent = prop.name;
    document.getElementById('propertyPrice').textContent = `Price: ${prop.price}`;
    document.getElementById('propertyLocation').textContent = `Location: ${prop.location}`;
}

// ==================== UI UPDATES ====================
function initializeUI() {
    updatePropertyInfo();
    updateSessionInfo();
}

function updateSessionInfo() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
    document.getElementById('participantCount').textContent = webinarState.participantCount;
    
    if (webinarState.meetingStartTime) {
        const duration = Math.floor((now - webinarState.meetingStartTime) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        document.getElementById('sessionDuration').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function updateStatus(status, type = 'info') {
    const statusEl = document.getElementById('statusText');
    statusEl.textContent = status;
    statusEl.className = `status-${type}`;
}

function startStatusUpdates() {
    setInterval(updateSessionInfo, 1000);
    setInterval(() => {
        // Simulate participant count changes
        if (webinarState.isJoined) {
            webinarState.participantCount = Math.floor(Math.random() * 50) + 1;
        }
    }, 5000);
}

// ==================== UTILITIES ====================
function generateZoomSignature() {
    // NOTE: In production, this signature should be generated server-side
    // This is a simplified example. Use your backend to generate secure signatures.
    console.warn('Signature generation simplified. Use server-side generation in production.');
    return 'SIGNATURE_TOKEN';
}

function showAlert(message, type = 'info') {
    // Simple alert - in production, use a better notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message);
}

// ==================== EXPORTS FOR TESTING ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        joinMeeting,
        leaveMeeting,
        toggleRecording,
        scheduleSession,
        sendChatMessage,
        selectProperty
    };
}
