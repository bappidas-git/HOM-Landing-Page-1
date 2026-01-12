/**
 * Users API Service
 * Handles user management CRUD operations
 */

import axiosInstance, { apiRequest } from './axiosInstance';

const USERS_ENDPOINT = '/users';
const ROLES_ENDPOINT = '/roles';

/**
 * Get all users
 * @param {Object} params - Query parameters
 * @returns {Promise} API response with users array
 */
export const getUsers = async (params = {}) => {
  return apiRequest(() => axiosInstance.get(USERS_ENDPOINT, { params }));
};

/**
 * Get user by ID
 * @param {number|string} id - User ID
 * @returns {Promise} API response with user data
 */
export const getUserById = async (id) => {
  return apiRequest(() => axiosInstance.get(`${USERS_ENDPOINT}/${id}`));
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise} API response with user data
 */
export const getUserByEmail = async (email) => {
  const response = await apiRequest(() =>
    axiosInstance.get(USERS_ENDPOINT, { params: { email } })
  );

  if (response.success && response.data?.length > 0) {
    return { success: true, data: response.data[0] };
  }

  return { success: false, error: 'User not found' };
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise} API response with created user
 */
export const createUser = async (userData) => {
  // Check if email already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser.success) {
    return { success: false, error: 'Email already exists' };
  }

  // Generate avatar URL based on initials
  const initials = userData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['1976d2', '9c27b0', '4caf50', 'ff9800', 'f44336', '00bcd4'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const newUser = {
    ...userData,
    avatar: `https://placehold.co/100x100/${randomColor}/ffffff?text=${initials}`,
    isActive: userData.isActive !== undefined ? userData.isActive : true,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };

  return apiRequest(() => axiosInstance.post(USERS_ENDPOINT, newUser));
};

/**
 * Update an existing user
 * @param {number|string} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} API response with updated user
 */
export const updateUser = async (id, userData) => {
  // If email is being changed, check if new email already exists
  if (userData.email) {
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser.success && existingUser.data.id !== parseInt(id, 10)) {
      return { success: false, error: 'Email already exists' };
    }
  }

  // Update avatar if name changed
  if (userData.name) {
    const initials = userData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const colors = ['1976d2', '9c27b0', '4caf50', 'ff9800', 'f44336', '00bcd4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    userData.avatar = `https://placehold.co/100x100/${randomColor}/ffffff?text=${initials}`;
  }

  return apiRequest(() => axiosInstance.patch(`${USERS_ENDPOINT}/${id}`, userData));
};

/**
 * Delete a user
 * @param {number|string} id - User ID
 * @returns {Promise} API response
 */
export const deleteUser = async (id) => {
  // Prevent deleting the main admin user
  if (parseInt(id, 10) === 1) {
    return { success: false, error: 'Cannot delete the primary admin user' };
  }

  return apiRequest(() => axiosInstance.delete(`${USERS_ENDPOINT}/${id}`));
};

/**
 * Toggle user active status
 * @param {number|string} id - User ID
 * @param {boolean} isActive - New active status
 * @returns {Promise} API response
 */
export const toggleUserStatus = async (id, isActive) => {
  // Prevent deactivating the main admin user
  if (parseInt(id, 10) === 1 && !isActive) {
    return { success: false, error: 'Cannot deactivate the primary admin user' };
  }

  return apiRequest(() =>
    axiosInstance.patch(`${USERS_ENDPOINT}/${id}`, { isActive })
  );
};

/**
 * Get all roles
 * @returns {Promise} API response with roles array
 */
export const getRoles = async () => {
  return apiRequest(() => axiosInstance.get(ROLES_ENDPOINT));
};

/**
 * Update user password
 * @param {number|string} id - User ID
 * @param {string} newPassword - New password
 * @returns {Promise} API response
 */
export const updateUserPassword = async (id, newPassword) => {
  return apiRequest(() =>
    axiosInstance.patch(`${USERS_ENDPOINT}/${id}`, { password: newPassword })
  );
};

/**
 * Get users by role
 * @param {string} role - Role name
 * @returns {Promise} API response with users array
 */
export const getUsersByRole = async (role) => {
  return apiRequest(() =>
    axiosInstance.get(USERS_ENDPOINT, { params: { role } })
  );
};

/**
 * Get active users count
 * @returns {Promise} Count of active users
 */
export const getActiveUsersCount = async () => {
  const response = await apiRequest(() =>
    axiosInstance.get(USERS_ENDPOINT, { params: { isActive: true } })
  );

  if (response.success) {
    return { success: true, count: response.data.length };
  }

  return { success: false, count: 0 };
};

/**
 * Search users by name or email
 * @param {string} query - Search query
 * @returns {Promise} API response with matching users
 */
export const searchUsers = async (query) => {
  const response = await getUsers();

  if (response.success) {
    const lowerQuery = query.toLowerCase();
    const filtered = response.data.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
    return { success: true, data: filtered };
  }

  return response;
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getRoles,
  updateUserPassword,
  getUsersByRole,
  getActiveUsersCount,
  searchUsers,
};
