# Supabase Authentication Troubleshooting Guide

## Issue: Signup Form Not Working

### Problem
Users cannot sign up - the form doesn't accept email/password and no users appear in Supabase.

### Root Cause
**Supabase requires email confirmation by default.** When a user signs up, Supabase sends a confirmation email and doesn't create a session until the email is confirmed.

### Solution: Disable Email Confirmation

You need to disable email confirmation in the Supabase dashboard:

#### Steps:

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/cturiwpzxiwxdmetanzp

2. **Open Authentication Settings**
   - Click "Authentication" in the left sidebar
   - Click "Providers" tab
   - Find "Email" provider

3. **Disable Email Confirmation**
   - Look for "Confirm email" toggle
   - **Turn it OFF** (disable it)
   - This allows users to sign up without email verification

4. **Save Changes**
   - Click "Save" button
   - Changes take effect immediately

### Alternative: Enable Email Confirmation (Production)

If you want to keep email confirmation enabled (recommended for production):

1. **Configure Email Templates**
   - Go to Authentication > Email Templates
   - Customize the confirmation email
   - Set up SMTP settings (or use Supabase's default)

2. **Update AuthContext to Handle Confirmation**
   - The code already handles this case
   - Shows message: "Please check your email to confirm your account"
   - User must click link in email before they can log in

3. **Test Email Flow**
   - Sign up with a real email address
   - Check inbox for confirmation email
   - Click confirmation link
   - Then log in

### Debugging Steps

#### 1. Check Browser Console

After deploying the debug changes (commit abfc7d6), open browser console and look for:

```
[Supabase] Initializing client with URL: https://cturiwpzxiwxdmetanzp.supabase.co
[Supabase] Client initialized successfully
[Auth] Starting signup for: user@example.com
[Auth] Signup response: { data: {...}, error: null }
```

#### 2. Check for Errors

Look for error messages like:
- "Email confirmation required"
- "Invalid email or password"
- "User already registered"
- Network errors (CORS, connection refused)

#### 3. Verify Supabase Connection

Test the connection manually:

```javascript
// Open browser console on your deployed site
console.log(window.supabase); // Should show Supabase client object
```

#### 4. Check Network Tab

- Open DevTools > Network tab
- Try to sign up
- Look for requests to `supabase.co`
- Check if they're succeeding (200) or failing (400, 500)

### Common Issues

#### Issue 1: CORS Errors

**Symptom**: Console shows CORS policy errors

**Solution**: 
- Supabase should allow all origins by default
- If you see CORS errors, check Supabase dashboard > Settings > API
- Ensure your deployment URL is allowed

#### Issue 2: Invalid API Key

**Symptom**: "Invalid API key" or "Unauthorized" errors

**Solution**:
- Verify the anon key in `src/lib/supabase.ts` matches your project
- Get the correct key from: Dashboard > Settings > API > anon public key

#### Issue 3: Email Already Exists

**Symptom**: "User already registered" error

**Solution**:
- Check Supabase dashboard > Authentication > Users
- Delete test users if needed
- Or try logging in instead of signing up

### Testing After Fix

1. **Deploy the changes** (commit abfc7d6 is already pushed)

2. **Open your deployed site**

3. **Open browser console** (F12 or Cmd+Option+I)

4. **Try to sign up**:
   - Name: Test User
   - Email: test@example.com
   - Password: testpassword123

5. **Check console logs**:
   - Should see `[Auth] Starting signup for: test@example.com`
   - Should see `[Auth] Signup successful` or error details

6. **Check Supabase dashboard**:
   - Go to Authentication > Users
   - Should see the new user appear

### Quick Fix Checklist

- [ ] Disable email confirmation in Supabase dashboard
- [ ] Deploy latest code (commit abfc7d6)
- [ ] Clear browser cache and reload
- [ ] Open browser console
- [ ] Try signup with test credentials
- [ ] Check console for detailed logs
- [ ] Verify user appears in Supabase dashboard

### Need More Help?

If signup still doesn't work after disabling email confirmation:

1. **Share console logs** - Copy all `[Auth]` and `[Supabase]` logs
2. **Share network errors** - Check Network tab for failed requests
3. **Check Supabase logs** - Dashboard > Logs > Auth logs

### Production Recommendations

Once testing is complete:

1. **Re-enable email confirmation** for security
2. **Set up custom email templates** for branding
3. **Configure SMTP** for reliable email delivery
4. **Add password reset flow** (not yet implemented)
5. **Add email verification resend** (not yet implemented)

---

**Current Status**: Debug logging added (commit abfc7d6)
**Next Step**: Disable email confirmation in Supabase dashboard
**Expected Result**: Signup should work immediately without email verification
