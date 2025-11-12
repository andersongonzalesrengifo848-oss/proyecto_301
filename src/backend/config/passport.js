import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const avatar = profile.photos?.[0]?.value || null;

        // 🔍 Buscar por googleId (usa findFirst por si aún no es único)
        let user = await prisma.user.findFirst({
          where: { googleId },
        });

        if (!user) {
          // Buscar si ya existe por email
          user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) {
            // Si ya existe por email, actualiza con su googleId y avatar
            user = await prisma.user.update({
              where: { email },
              data: { googleId, avatar },
            });
          } else {
            // Si no existe, crea un nuevo usuario
            user = await prisma.user.create({
              data: {
                email,
                name: profile.displayName,
                googleId,
                avatar,
              },
            });
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("⚠️ Error en estrategia Google:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
