/**
 * Context barrel export for Nambiar District 25
 * Centralized exports for all context providers and hooks
 */

// Auth Context - only export components and hooks, not the context object itself
export {
  AuthProvider,
  useAuthContext,
  withAuth,
} from './AuthContext';

// UI Context - only export components and hooks, not the context object itself
export {
  UIProvider,
  useUIContext,
} from './UIContext';

// Lead Form Context - only export components and hooks, not the context object itself
export {
  LeadFormProvider,
  useLeadFormContext,
} from './LeadFormContext';

// Import providers at module level for Fast Refresh compatibility
import { AuthProvider as AuthProviderComponent } from './AuthContext';
import { UIProvider as UIProviderComponent } from './UIContext';
import { LeadFormProvider as LeadFormProviderComponent } from './LeadFormContext';

/**
 * Combined providers wrapper component
 * Wraps the application with all necessary context providers
 */
export const AppProviders = ({ children }) => {
  return (
    <AuthProviderComponent>
      <UIProviderComponent>
        <LeadFormProviderComponent>
          {children}
        </LeadFormProviderComponent>
      </UIProviderComponent>
    </AuthProviderComponent>
  );
};
