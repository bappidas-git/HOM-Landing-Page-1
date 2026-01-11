/**
 * Context barrel export for Nambiar District 25
 * Centralized exports for all context providers and hooks
 */

// Auth Context
export {
  default as AuthContext,
  AuthProvider,
  useAuthContext,
  withAuth,
} from './AuthContext';

// UI Context
export {
  default as UIContext,
  UIProvider,
  useUIContext,
} from './UIContext';

// Lead Form Context
export {
  default as LeadFormContext,
  LeadFormProvider,
  useLeadFormContext,
} from './LeadFormContext';

/**
 * Combined providers wrapper component
 * Wraps the application with all necessary context providers
 */
export const AppProviders = ({ children }) => {
  // Import providers dynamically to avoid circular dependencies
  const { AuthProvider } = require('./AuthContext');
  const { UIProvider } = require('./UIContext');
  const { LeadFormProvider } = require('./LeadFormContext');

  return (
    <AuthProvider>
      <UIProvider>
        <LeadFormProvider>
          {children}
        </LeadFormProvider>
      </UIProvider>
    </AuthProvider>
  );
};
