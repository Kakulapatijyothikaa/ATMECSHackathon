let users = []; 
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Check if user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('User already exists! Please log in.');
    } else {
        // Register new user
        users.push({ username, password });
        alert('Registration successful! Please log in.');
        showLogin();
    }
});

// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check for user credentials
    const user = users.find(user => user.username === email && user.password === password);
    if (user) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

function showMedicalImaging() {
    hideAllSections();
    document.getElementById('medical-imaging-section').style.display = 'block';
}

function showPersonalizedTreatment() {
    hideAllSections();
    document.getElementById('personalized-treatment-section').style.display = 'block';
}

function showVirtualAssistant() {
    hideAllSections();
    document.getElementById('virtual-assistant-section').style.display = 'block';
}

function showDrugDiscovery() {
    hideAllSections();
    document.getElementById('drug-discovery-section').style.display = 'block';
}

function showRegistration() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('registration-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('registration-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard-section').style.display = 'block';
}
function showLogin123() {
    hideAllSections(); // Hide all other sections first
    document.getElementById('login-section').style.display = 'block'; // Show login section
}



// Medical Imaging Analysis
async function analyzeImage() {
    const imageUpload = document.getElementById('image-upload');
    if (imageUpload.files.length === 0) {
        alert('Please upload an image.');
        return;
    }

    const data = new FormData();
    data.append('file', imageUpload.files[0]);

    try {
        const result = await analyzeData(data);
        document.getElementById('image-analysis-result').innerHTML = `<p><strong>Analysis Result:</strong> ${result}</p>`;
    } catch (error) {
        alert('Error analyzing image.');
    }
}

function generateTreatment() {
    const medicalHistory = document.getElementById('medical-history').value;
    const geneticInfo = document.getElementById('genetic-info').value;
    const lifestyle = document.getElementById('lifestyle').value;

    setTimeout(() => {
        document.getElementById('treatment-result').innerHTML = `
            <p>Recommended Treatment Plan based on provided data:</p>
            <ul>
                <li>Medical History: ${medicalHistory}</li>
                <li>Genetic Information: ${geneticInfo}</li>
                <li>Lifestyle Factors: ${lifestyle}</li>
                <li><strong>Suggested Treatment:</strong> Chemotherapy with XYZ drug</li>
            </ul>
        `;
    }, 1500);
}

// Virtual Assistant Simulation
function askAssistant() {
    const query = document.getElementById('assistant-query').value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a question for the assistant.');
        return;
    }

    let response = '';
    if (query.includes('hi')) {
        response = 'Hello! How can I assist you today?';
    } else if (query.includes('bye')) {
        response = 'Goodbye! Have a great day!';
    } else {
        response = `You asked: "${query}". Here’s some information... (simulated response)`;
    }

    document.getElementById('assistant-response').innerHTML = `<p><strong>Response:</strong> ${response}</p>`;
}

// Drug Discovery Simulation
function discoverDrug() {
    // Simulate a drug discovery process
    setTimeout(() => {
        const result = "New drug discovered: Drug ABC with potential for XYZ disease.";
        document.getElementById('drug-discovery-result').innerHTML = `<p><strong>Drug Discovery:</strong> A potential compound has been identified for cancer treatment, with a success rate of 85% in simulations.
 ${result}</p>`;
    }, 1500);
}

// Function to hide all sections
function hideAllSections() {
    const sections = [
        'medical-imaging-section',
        'personalized-treatment-section',
        'virtual-assistant-section',
        'drug-discovery-section',
        'dashboard-section',
        'login-section',
        'registration-section'
    ];
    
    sections.forEach(section => {
        document.getElementById(section).style.display = 'none';
    });
}
