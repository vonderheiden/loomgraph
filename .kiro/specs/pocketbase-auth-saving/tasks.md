# Implementation Plan: PocketBase Authentication and Banner Saving

## Overview

This implementation adds user authentication and banner persistence to LoomGraph using PocketBase. The approach follows a layered implementation strategy: first establishing the PocketBase connection and authentication foundation, then building the UI components, and finally integrating with the existing export functionality. Each task builds incrementally to ensure the feature can be validated at each step.

## Tasks

- [ ] 1. Set up PocketBase infrastructure and dependencies
  - Install PocketBase JavaScript SDK (`pocketbase` package)
  - Install fast-check for property-based testing (`fast-check` package, dev dependency)
  - Create PocketBase service singleton with client configuration
  - Create TypeScript type definitions for auth and banner models
  - Set up environment variable for PocketBase URL
  - _Requirements: 1.1, 1.2, 5.1, 11.5_

- [ ] 2. Implement core authentication context and services
  - [ ] 2.1 Create AuthContext with state management
    - Implement AuthProvider component with user state, loading state, and error state
    - Add auth state initialization on mount with token validation
    - Subscribe to PocketBase authStore changes for reactive updates
    - _Requirements: 1.1, 1.2, 3.1, 3.2_
  
  - [ ] 2.2 Implement email/password authentication methods
    - Add signup method with account creation and auto-login
    - Add login method with password authentication
    - Add error handling with user-friendly messages
    - Add token storage verification
    - _Requirements: 1.1, 1.2, 1.3, 1.7_
  
  - [ ]* 2.3 Write property tests for email/password authentication
    - **Property 1: Account Creation with Valid Credentials**
    - **Property 2: Authentication with Valid Credentials**
    - **Property 3: Authentication Rejection for Invalid Credentials**
    - **Property 4: Token Storage After Successful Authentication**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.5, 1.6, 1.7**
  
  - [ ] 2.4 Implement session management methods
    - Add logout method with token cleanup
    - Add refreshAuth method for token validation
    - Add clearError utility method
    - _Requirements: 3.3, 4.1, 4.2, 4.3_
  
  - [ ]* 2.5 Write property tests for session management
    - **Property 7: Session Restoration from Valid Token**
    - **Property 8: Invalid Token Cleanup**
    - **Property 9: Complete Logout State Cleanup**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3**

- [ ] 3. Checkpoint - Verify authentication foundation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement OAuth2 authentication flow
  - [ ] 4.1 Add Google OAuth2 initiation method
    - Implement loginWithGoogle method to fetch OAuth providers
    - Store provider data in localStorage for callback
    - Generate and redirect to Google auth URL
    - _Requirements: 2.1, 2.4_
  
  - [ ] 4.2 Create OAuth callback handler
    - Implement handleOAuthCallback method to parse URL parameters
    - Verify state parameter to prevent CSRF
    - Complete authentication with OAuth code
    - Clean up localStorage and redirect to app
    - _Requirements: 2.2, 2.4, 2.5_
  
  - [ ] 4.3 Create OAuthCallback page component
    - Create route component for /oauth-callback
    - Display loading state during processing
    - Handle and display OAuth errors
    - Redirect to main app on success
    - _Requirements: 2.2, 2.3_
  
  - [ ]* 4.4 Write property tests for OAuth2 flow
    - **Property 5: OAuth2 Account Creation or Retrieval**
    - **Property 6: OAuth2 Callback Parameter Handling**
    - **Validates: Requirements 2.2, 2.4**

- [ ] 5. Implement banner storage service
  - [ ] 5.1 Create banner storage service functions
    - Implement saveBanner function with FormData upload
    - Implement getUserBanners function with filtering
    - Implement getBannerImageUrl helper function
    - Add error handling for upload failures
    - _Requirements: 5.1, 5.2, 5.3, 5.7_
  
  - [ ]* 5.2 Write property tests for banner storage
    - **Property 10: Banner Save with File Upload**
    - **Property 11: Banner Metadata Round-Trip**
    - **Property 12: Banner User Association**
    - **Property 23: Dimension Value Validation**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.7, 10.3**

- [ ] 6. Build authentication UI components
  - [ ] 6.1 Create AuthModal component
    - Build modal overlay with backdrop and close button
    - Implement mode toggle between signup and login
    - Create email/password form with validation
    - Add "Sign in with Google" button
    - Display error messages inline with fields
    - Show loading states during auth operations
    - Style with Bento design system
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.7_
  
  - [ ]* 6.2 Write unit tests for AuthModal
    - Test mode toggle functionality
    - Test form validation display
    - Test modal dismissal
    - Test auto-close on success
    - _Requirements: 7.2, 7.3, 7.5, 7.7_
  
  - [ ] 6.3 Create UserMenu component
    - Build dropdown menu with user avatar/icon trigger
    - Display user email or name
    - Add logout button with click handler
    - Implement conditional rendering based on auth state
    - Add keyboard navigation support
    - Style with Bento design system
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6_
  
  - [ ]* 6.4 Write property tests for UserMenu
    - **Property 19: User Menu Conditional Rendering**
    - **Property 20: User Menu Data Display**
    - **Validates: Requirements 8.1, 8.2, 8.4**

- [ ] 7. Checkpoint - Verify UI components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Integrate authentication with export flow
  - [ ] 8.1 Enhance ExportButton component
    - Add auth state check before export
    - Show AuthModal for unauthenticated users
    - Implement performExport function with banner save
    - Maintain local download alongside cloud save
    - Add success/error toast notifications
    - Display loading state during save operation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [ ]* 8.2 Write property tests for export flow
    - **Property 13: Auth-Gated Export Flow**
    - **Property 14: Authenticated Export Direct Flow**
    - **Property 15: Dual Export Functionality**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
  
  - [ ]* 8.3 Write integration tests for complete export flow
    - Test unauthenticated user export journey
    - Test authenticated user export journey
    - Test OAuth flow integration with export
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9. Add error handling and user feedback
  - [ ] 9.1 Implement comprehensive error handling
    - Add error message mapping for auth errors
    - Add error message mapping for save errors
    - Implement network error detection and messaging
    - Add loading indicators for async operations
    - Distinguish client vs server errors in messages
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 9.2 Write property tests for error handling
    - **Property 21: Error Message Clarity**
    - **Property 22: Loading State Display**
    - **Validates: Requirements 9.1, 9.3, 9.5, 9.6**

- [ ] 10. Implement security measures
  - [ ] 10.1 Add token security validations
    - Verify tokens not exposed in URLs
    - Verify tokens not logged to console
    - Add token validation before authenticated requests
    - Implement token expiration handling with re-auth prompt
    - Verify HTTPS protocol for all PocketBase requests
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [ ]* 10.2 Write property tests for security measures
    - **Property 24: Token Security**
    - **Property 25: Token Validation Before Requests**
    - **Property 26: HTTPS Protocol Enforcement**
    - **Validates: Requirements 11.2, 11.3, 11.5**

- [ ] 11. Verify backward compatibility
  - [ ] 11.1 Test existing features remain unchanged
    - Verify real-time preview updates work with auth integration
    - Verify form validation continues to work
    - Verify banner generation logic unchanged
    - Verify all banner templates render correctly
    - Verify local download works for unauthenticated users (after auth)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_
  
  - [ ]* 11.2 Write property tests for backward compatibility
    - **Property 27: Backward Compatibility - Preview Updates**
    - **Property 28: Backward Compatibility - Form Validation**
    - **Validates: Requirements 12.3, 12.4**

- [ ] 12. Update application routing and layout
  - [ ] 12.1 Add OAuth callback route
    - Add /oauth-callback route to router configuration
    - Wire up OAuthCallback component
    - _Requirements: 2.4_
  
  - [ ] 12.2 Integrate UserMenu into app header
    - Add UserMenu component to App.tsx or header component
    - Position in top-right corner
    - Ensure responsive behavior
    - _Requirements: 8.1_
  
  - [ ] 12.3 Wrap app with AuthProvider
    - Add AuthProvider to App.tsx component tree
    - Ensure it wraps all components needing auth state
    - Verify context is accessible throughout app
    - _Requirements: 1.1, 1.2_

- [ ] 13. Final checkpoint and manual testing
  - Ensure all tests pass, ask the user if questions arise.
  - Run complete manual testing checklist from design document
  - Verify all user journeys work end-to-end
  - Test error scenarios and edge cases
  - Verify security measures are in place
  - Check TypeScript diagnostics with getDiagnostics tool
  - Run `npm run build` to verify production build
  - Run `npm run lint` to verify code quality

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across random inputs
- Unit tests validate specific examples and edge cases
- Integration tests verify complete user flows work end-to-end
- Manual testing checklist ensures real-world usability before deployment
