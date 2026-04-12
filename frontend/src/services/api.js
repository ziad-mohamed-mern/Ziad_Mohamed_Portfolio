const API_BASE_URL = 'https://ziadmohamed-upb2d9vu.b4a.run/api/v1';

/**
 * Fetch all skills from the backend
 */
export const fetchSkills = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/skill`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.skills || [];
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

/**
 * Fetch all projects/products from the backend
 */
export const fetchProjects = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/product`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

/**
 * Fetch about information from the backend
 */
export const fetchAbout = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/about`, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Return the first/latest about entry
        return data.about && data.about.length > 0 ? data.about[0] : null;
    } catch (error) {
        console.error('Error fetching about:', error);
        throw error;
    }
};

/**
 * Fetch a single product/project by ID
 * @param {string} id - The product ID
 */
export const fetchProjectById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.product || null;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

/**
 * Send a contact message to the backend
 * @param {Object} messageData - Object containing name, email, and message
 */
export const sendMessage = async (messageData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
