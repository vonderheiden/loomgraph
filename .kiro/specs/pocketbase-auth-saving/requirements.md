# Requirements Document: PocketBase Authentication and Banner Saving

## Introduction

This specification defines the requirements for implementing user authentication and banner persistence in LoomGraph using PocketBase as the backend service. The feature enables users to create accounts, authenticate via email/password or Google OAuth2, and save their generated webinar banners to the cloud for future access.

## Glossary

- **PocketBase**: Open-source backend service providing authentication, database, and file storage capabilities
- **Auth_System**: The authentication subsystem managing user identity and sessions
- **Banner_Storage**: The subsystem responsible for persisting banner data and images
- **User_Session**: An authenticated user's active connection state
- **OAuth2**: Open standard for access delegation, used for Google authentication
- **Banner_Metadata**: Structured data describing a banner (title, dimensions, speaker info, timestamps)
- **Export_Flow**: The user workflow from banner creation to download/save
- **Auth_Modal**: UI component for signup/login interactions
- **User_Menu**: UI component displaying user account options when authenticated

## Requirements

### Requirement 1: Email/Password Authentication

**User Story:** As a user, I want to sign up and log in with email and password, so that I can securely access my saved banners.

#### Acceptance Criteria

1. WHEN a user provides valid email and password for signup, THE Auth_System SHALL create a new user account in PocketBase
2. WHEN a user provides valid credentials for login, THE Auth_System SHALL authenticate the user and establish a User_Session
3. WHEN a user provides invalid credentials, THE Auth_System SHALL return a descriptive error message and prevent authentication
4. WHEN a user's email is already registered, THE Auth_System SHALL prevent duplicate account creation and return an appropriate error
5. THE Auth_System SHALL validate email format before submission
6. THE Auth_System SHALL enforce minimum password requirements (minimum 8 characters)
7. WHEN authentication succeeds, THE Auth_System SHALL store the authentication token securely in browser storage

### Requirement 2: Google OAuth2 Authentication

**User Story:** As a user, I want to sign in with my Google account, so that I can quickly access the application without creating a new password.

#### Acceptance Criteria

1. WHEN a user clicks "Sign in with Google", THE Auth_System SHALL initiate the OAuth2 flow with Google
2. WHEN Google authentication succeeds, THE Auth_System SHALL create or retrieve the user account in PocketBase
3. WHEN Google authentication fails, THE Auth_System SHALL display an error message and allow retry
4. THE Auth_System SHALL handle OAuth2 callback redirects correctly
5. WHEN a user authenticates via Google, THE Auth_System SHALL establish a User_Session equivalent to email/password authentication

### Requirement 3: Session Persistence

**User Story:** As a user, I want to remain logged in when I refresh the page, so that I don't have to re-authenticate repeatedly.

#### Acceptance Criteria

1. WHEN a page loads, THE Auth_System SHALL check for a valid stored authentication token
2. WHEN a valid token exists, THE Auth_System SHALL restore the User_Session automatically
3. WHEN a token is expired or invalid, THE Auth_System SHALL clear the stored token and require re-authentication
4. THE Auth_System SHALL persist authentication state across browser sessions
5. WHEN a user closes and reopens the browser, THE Auth_System SHALL restore the User_Session if the token is still valid

### Requirement 4: Logout Functionality

**User Story:** As a user, I want to log out of my account, so that I can secure my session when using shared devices.

#### Acceptance Criteria

1. WHEN a user clicks logout, THE Auth_System SHALL invalidate the current User_Session
2. WHEN logout completes, THE Auth_System SHALL clear all stored authentication tokens
3. WHEN logout completes, THE Auth_System SHALL redirect the user to an unauthenticated state
4. THE Auth_System SHALL handle logout errors gracefully and ensure local state is cleared

### Requirement 5: Banner Saving to PocketBase

**User Story:** As a user, I want to save my generated banners to the cloud, so that I can access them later and maintain a library of my work.

#### Acceptance Criteria

1. WHEN an authenticated user saves a banner, THE Banner_Storage SHALL upload the banner image to PocketBase file storage
2. WHEN saving a banner, THE Banner_Storage SHALL store Banner_Metadata including title, dimensions, speaker information, and creation timestamp
3. WHEN saving a banner, THE Banner_Storage SHALL associate the banner with the authenticated user's account
4. WHEN a banner save succeeds, THE Banner_Storage SHALL return a confirmation to the user
5. WHEN a banner save fails, THE Banner_Storage SHALL display an error message and allow retry
6. THE Banner_Storage SHALL generate the banner image using the existing html-to-image export functionality
7. WHEN saving a banner, THE Banner_Storage SHALL preserve all form data as structured metadata

### Requirement 6: Authentication-Protected Export

**User Story:** As a user, I want the export/save functionality to require authentication, so that my banners are securely stored under my account.

#### Acceptance Criteria

1. WHEN an unauthenticated user clicks export or save, THE Export_Flow SHALL display the Auth_Modal
2. WHEN a user completes authentication in the Auth_Modal, THE Export_Flow SHALL proceed with the save operation
3. WHEN an authenticated user clicks export or save, THE Export_Flow SHALL proceed directly without showing the Auth_Modal
4. THE Export_Flow SHALL maintain the current local download functionality alongside cloud saving
5. WHEN a save operation completes, THE Export_Flow SHALL trigger both cloud save and local download

### Requirement 7: Authentication UI Components

**User Story:** As a user, I want a clean and intuitive authentication interface, so that I can easily sign up or log in without confusion.

#### Acceptance Criteria

1. THE Auth_Modal SHALL display options for email/password and Google OAuth2 authentication
2. THE Auth_Modal SHALL toggle between signup and login modes
3. THE Auth_Modal SHALL display validation errors inline with form fields
4. THE Auth_Modal SHALL show loading states during authentication operations
5. THE Auth_Modal SHALL be dismissible without completing authentication
6. THE Auth_Modal SHALL follow the Bento design system aesthetic
7. WHEN authentication succeeds, THE Auth_Modal SHALL close automatically

### Requirement 8: User Menu and Account Display

**User Story:** As an authenticated user, I want to see my account status and access logout functionality, so that I can manage my session.

#### Acceptance Criteria

1. WHEN a user is authenticated, THE User_Menu SHALL display in the application header
2. THE User_Menu SHALL show the user's email or name
3. THE User_Menu SHALL provide a logout button
4. WHEN a user is not authenticated, THE User_Menu SHALL not be visible
5. THE User_Menu SHALL follow the Bento design system aesthetic
6. THE User_Menu SHALL be accessible via keyboard navigation

### Requirement 9: Error Handling and User Feedback

**User Story:** As a user, I want clear feedback when authentication or saving operations fail, so that I can understand and resolve issues.

#### Acceptance Criteria

1. WHEN an authentication error occurs, THE Auth_System SHALL display a user-friendly error message
2. WHEN a network error occurs, THE Auth_System SHALL indicate connectivity issues
3. WHEN a banner save fails, THE Banner_Storage SHALL display the specific error reason
4. THE Auth_System SHALL distinguish between client-side validation errors and server errors
5. WHEN an operation is in progress, THE Auth_System SHALL display loading indicators
6. THE Auth_System SHALL provide actionable error messages (e.g., "Email already registered - try logging in")

### Requirement 10: PocketBase Collection Schema

**User Story:** As a system administrator, I want properly structured database collections, so that banner data is organized and queryable.

#### Acceptance Criteria

1. THE Banner_Storage SHALL use a "banners" collection with fields: user (relation), title (text), image (file), dimension (text), metadata (JSON), created (datetime)
2. THE Banner_Storage SHALL enforce user relation constraints to prevent orphaned banners
3. THE Banner_Storage SHALL validate dimension values against allowed options (landscape, square, portrait)
4. THE Banner_Storage SHALL store metadata as valid JSON
5. THE Banner_Storage SHALL automatically set creation timestamps
6. THE PocketBase configuration SHALL enable file storage for banner images

### Requirement 11: Security and Token Management

**User Story:** As a user, I want my authentication tokens stored securely, so that my account cannot be compromised.

#### Acceptance Criteria

1. THE Auth_System SHALL store authentication tokens in localStorage with appropriate security considerations
2. THE Auth_System SHALL not expose tokens in URLs or console logs
3. THE Auth_System SHALL validate tokens before making authenticated requests
4. THE Auth_System SHALL handle token expiration gracefully and prompt re-authentication
5. THE Auth_System SHALL use HTTPS for all PocketBase communication
6. THE Auth_System SHALL follow PocketBase SDK security best practices

### Requirement 12: Backward Compatibility

**User Story:** As an existing user, I want all current banner generation features to continue working, so that the authentication feature doesn't disrupt my workflow.

#### Acceptance Criteria

1. WHEN authentication is added, THE Export_Flow SHALL maintain the existing local download functionality
2. THE Banner_Storage SHALL not modify existing banner generation logic
3. THE Auth_System SHALL not interfere with real-time preview updates
4. THE Auth_System SHALL not break existing form validation
5. WHEN a user is unauthenticated, THE Export_Flow SHALL still allow local downloads after authentication
6. THE Auth_System SHALL integrate without requiring changes to existing banner templates
