**Authentication**

Overview
- Authentication uses JSON Web Tokens signed with `process.env.JWT_SECRET`.
- Tokens are issued at registration and login and set as an HTTP-only cookie named `token`.
- The server also accepts `Authorization: Bearer <token>` in request headers.

Mechanics
- `auth.middleware.js` extracts the token from `req.cookies.token` or from the `Authorization` header.
- Tokens are verified with `jwt.verify(token, JWT_SECRET)` and decoded payload is attached as `req.user`.
- Logout (`/api/auth/logout`) creates a blacklist entry in `blacklistTokens` so the same token cannot be used again; `auth.middleware.js` checks this blacklist and denies blacklisted tokens.

Security notes
- Cookies are set `httpOnly` and with `sameSite: 'lax'`. In production `secure` is enabled when `NODE_ENV === 'production'`.
- There is no refresh-token flow; tokens are short-lived by default (`1d`) and can be extended with `rememberMe` to `30d` at login.
- Blacklisting requires storage and eventually cleanup; consider TTL indexes to automatically remove tokens after their expiry.

Errors
- 401 responses are returned for missing, invalid, expired or blacklisted tokens.
