/**
 * Admin Users Page
 * Manage users and their roles
 */

import AdminLayout from '@/components/admin/AdminLayout/AdminLayout';
import { UserManagement } from '@/components/admin/UserManagement';
import { withAuth } from '@/context/AuthContext';
import { MODULES } from '@/lib/constants/permissions';

const UsersPage = () => {
  return (
    <AdminLayout title="Users">
      <UserManagement />
    </AdminLayout>
  );
};

// Protect the page - only admins can access user management
export default withAuth(UsersPage, {
  requiredModule: MODULES.USERS,
  requireEdit: true, // Only admins have full access to users module
});
