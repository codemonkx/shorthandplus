// Shorthand Plus Unified API Client Service

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '') || '/api';

function getToken() {
  try {
    return localStorage.getItem('shorthand_jwt_token');
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) {
      localStorage.setItem('shorthand_jwt_token', token);
    } else {
      localStorage.removeItem('shorthand_jwt_token');
    }
  } catch {}
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401 && !endpoint.includes('/auth/login')) {
        // If token expired, clear token
        setToken(null);
      }
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Authentication
  auth: {
    register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    getMe: () => request('/auth/me'),
    updateProfile: (payload) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),
    changePassword: (payload) => request('/auth/change-password', { method: 'POST', body: JSON.stringify(payload) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (payload) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
    verifyAdminPin: (passcode) => request('/auth/verify-admin-pin', { method: 'POST', body: JSON.stringify({ passcode }) }),
    logout: () => {
      setToken(null);
      try {
        localStorage.removeItem('shorthand_current_user');
        sessionStorage.removeItem('shorthand_admin_authenticated');
      } catch {}
    }
  },

  // Courses
  courses: {
    getAll: () => request('/courses'),
    create: (course) => request('/courses', { method: 'POST', body: JSON.stringify(course) }),
    update: (id, course) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(course) }),
    delete: (id) => request(`/courses/${id}`, { method: 'DELETE' })
  },

  // Payments & Razorpay
  payment: {
    getKey: () => request('/payment/key'),
    createOrder: (planId, amount, customerInfo = {}) => request('/payment/create-order', { method: 'POST', body: JSON.stringify({ planId, amount, ...customerInfo }) }),
    verifyPayment: (payload) => request('/payment/verify', { method: 'POST', body: JSON.stringify(payload) })
  },

  // Enrollments & Access Gating
  enrollments: {
    getMy: () => request('/enrollments/my'),
    checkAccess: (target) => request(`/enrollments/check-access/${target || 'general'}`)
  },

  // Tests & Submissions
  tests: {
    getAll: (type) => request(`/tests${type ? `?type=${type}` : ''}`),
    getAdminAll: () => request('/tests/admin/all'),
    getById: (id) => request(`/tests/${id}`),
    getAttempts: (id) => request(`/tests/${id}/attempts`),
    create: (test) => request('/tests', { method: 'POST', body: JSON.stringify(test) }),
    update: (id, test) => request(`/tests/${id}`, { method: 'PUT', body: JSON.stringify(test) }),
    togglePublish: (id) => request(`/tests/${id}/toggle-publish`, { method: 'PATCH' }),
    delete: (id) => request(`/tests/${id}`, { method: 'DELETE' }),

    // Two-Stage Controlled Assessment Sessions
    startAssessment: (id) => request(`/tests/${id}/start-assessment`, { method: 'POST' }),
    completeListening: (sessionId) => request(`/tests/assessment-session/${sessionId}/complete-listening`, { method: 'POST' }),
    getSessionStatus: (sessionId) => request(`/tests/assessment-session/${sessionId}/status`),
    submitAssessment: (sessionId, payload) => request(`/tests/assessment-session/${sessionId}/submit`, { method: 'POST', body: JSON.stringify(payload) }),

    submitResult: (result) => request('/tests/submit-result', { method: 'POST', body: JSON.stringify(result) }),
    getMyHistory: () => request('/tests/my-history'),
    getLeaderboard: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/tests/leaderboard${query ? `?${query}` : ''}`);
    }
  },

  // Live Classes
  classes: {
    getLive: () => request('/classes/live'),
    scheduleLive: (cls) => request('/classes/live', { method: 'POST', body: JSON.stringify(cls) }),
    toggleLive: (id) => request(`/classes/live/${id}/toggle-live`, { method: 'PUT' }),
    deleteLive: (id) => request(`/classes/live/${id}`, { method: 'DELETE' })
  },

  // Administration
  admin: {
    getStats: () => request('/admin/stats'),
    getStudents: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/admin/students${query ? `?${query}` : ''}`);
    },
    toggleStudentStatus: (id) => request(`/admin/students/${id}/status`, { method: 'PUT' }),
    extendStudentPass: (id, days = 30) => request(`/admin/students/${id}/extend-pass`, { method: 'POST', body: JSON.stringify({ days }) }),
    resetStudentPassword: (id, newPassword) => request(`/admin/students/${id}/reset-password`, { method: 'POST', body: JSON.stringify({ newPassword }) }),
    deleteStudent: (id) => request(`/admin/students/${id}`, { method: 'DELETE' }),
    getTransactions: () => request('/admin/transactions'),
    getAnnouncements: () => request('/admin/announcements'),
    createAnnouncement: (payload) => request('/admin/announcements', { method: 'POST', body: JSON.stringify(payload) }),
    deleteAnnouncement: (id) => request(`/admin/announcements/${id}`, { method: 'DELETE' }),
    uploadAudio: (payload) => request('/admin/upload-audio', { method: 'POST', body: JSON.stringify(payload) }),
    getResultsCsvUrl: () => `${API_BASE}/admin/export-results-csv`
  }
};

export default api;
