# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Features

LoomGraph implements comprehensive security measures:

### ✅ Implemented Security Controls

1. **Content Security Policy (CSP)**
   - Prevents XSS attacks
   - Restricts script sources
   - Blocks inline scripts (except necessary ones)
   - Prevents frame embedding

2. **Security Headers**
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: Restricts geolocation, microphone, camera
   - Strict-Transport-Security (production only)

3. **Input Sanitization**
   - All user inputs sanitized before storage
   - HTML tag removal
   - Script pattern detection
   - Event handler blocking

4. **File Upload Security**
   - Magic number validation (prevents MIME type spoofing)
   - File size limits (5MB for headshots, 2MB for logos)
   - Image dimension validation (max 4000x4000px)
   - Allowed types: JPG, PNG only

5. **Secret Management**
   - No secrets in Git repository
   - Environment variables for sensitive data
   - .env files excluded from version control
   - MCP configuration properly isolated

## Known Security Considerations

### Development Dependencies

**esbuild vulnerability (CVE-2024-XXXX)**
- **Severity**: Moderate
- **Scope**: Development only
- **Impact**: None in production builds
- **Status**: Monitoring for fix
- **Mitigation**: Vulnerability only affects development server, not production builds

The esbuild vulnerability allows websites to send requests to the development server. This is:
- **Not exploitable in production** (esbuild not included in production bundle)
- **Low risk in development** (requires developer to visit malicious site while dev server running)
- **Mitigated by**: Running dev server on localhost only

We are monitoring this issue and will update when a fix is available that doesn't introduce breaking changes.

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@loomgraph.com (or create a private security advisory on GitHub).

**Please do NOT create public issues for security vulnerabilities.**

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Time

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 30 days
  - Low: Next release

## Security Best Practices for Deployment

### Environment Variables

Never commit these files:
- `.env`
- `.env.local`
- `.env.production`
- Any file containing secrets

Always use `.env.example` as a template.

### Supabase Integration (Phase 2)

When implementing Supabase:
1. **Never expose service role key** - Use anon key only in client
2. **Verify RLS policies** - Test that users can only access their own data
3. **Server-side validation** - Don't trust client-side validation alone
4. **Rate limiting** - Implement to prevent abuse
5. **Audit logging** - Track all data access

### Production Deployment

1. **Use HTTPS only** - Configure HSTS
2. **Enable security headers** - Use render.yaml configuration
3. **Monitor logs** - Set up error tracking
4. **Regular updates** - Keep dependencies current
5. **Security scans** - Run OWASP ZAP or similar tools

## Security Audit History

| Date | Auditor | Score | Status |
|------|---------|-------|--------|
| 2026-01-22 | Kiro AI | 9/10 | ✅ Passed |

Latest audit: `.kiro/specs/loomgraph-banner-generator/SECURITY-AUDIT-2026-01-22.md`

## Compliance

- ✅ OWASP Top 10 addressed
- ✅ CSP Level 2 implemented
- ✅ No secrets in repository
- ✅ Input validation implemented
- ✅ File upload security enhanced

## Security Roadmap

### Phase 2 (Supabase Integration)
- [ ] Authentication security
- [ ] Rate limiting
- [ ] CAPTCHA implementation
- [ ] Audit logging
- [ ] Session management

### Future
- [ ] Automated security scanning
- [ ] Penetration testing
- [ ] Bug bounty program
- [ ] SOC 2 compliance

## Contact

For security concerns: security@loomgraph.com  
For general issues: https://github.com/vonderheiden/loomgraph/issues

---

**Last Updated**: January 22, 2026  
**Security Score**: 9/10 (Excellent)
