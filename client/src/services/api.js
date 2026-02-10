const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Blog Posts API
export const postsAPI = {
  // Get all published posts
  getAll: () => apiCall('/api/posts'),

  // Get single post by ID
  getById: (id) => apiCall(`/api/posts/${id}`),

  // Get post by slug
  getBySlug: (slug) => apiCall(`/api/posts/slug/${slug}`),

  // Create new post (admin only)
  create: (postData, token) =>
    apiCall('/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }),

  // Update post (admin only)
  update: (id, postData, token) =>
    apiCall(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }),

  // Delete post (admin only)
  delete: (id, token) =>
    apiCall(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Contact Form API
export const contactAPI = {
  // Submit contact form
  submit: (contactData) =>
    apiCall('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),

  // Get all submissions (admin only)
  getAll: (token) =>
    apiCall('/api/contact', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Delete submission (admin only)
  delete: (id, token) =>
    apiCall(`/api/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// Auth API
export const authAPI = {
  // Login
  login: (credentials) =>
    apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Get current user
  getMe: (token) =>
    apiCall('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};