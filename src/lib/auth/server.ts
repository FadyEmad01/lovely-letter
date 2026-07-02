import { createNeonAuth } from "@neondatabase/auth/next/server";

let _auth: ReturnType<typeof createNeonAuth> | null = null;

export const auth = new Proxy({} as ReturnType<typeof createNeonAuth>, {
  get(_, prop) {
    if (!_auth) {
      _auth = createNeonAuth({
        baseUrl: process.env.NEON_AUTH_BASE_URL!,
        cookies: {
          secret: process.env.NEON_AUTH_COOKIE_SECRET!,
        },
      });
    }
    return _auth[prop as keyof ReturnType<typeof createNeonAuth>];
  },
});
