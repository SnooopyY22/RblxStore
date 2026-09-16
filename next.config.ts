import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: "postgresql://postgres.mjlekzcrwerjdqbhozkd:Akooww1233%40@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true",
    DIRECT_URL: "postgresql://postgres.mjlekzcrwerjdqbhozkd:Akooww1233%40@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres",
    NEXTAUTH_SECRET: "f6c8d3b7e452a3b04c102a9b47cf83e9b1d35a7408f654e2d8329b31d4e0e5c8",
    NEXTAUTH_URL: "https://roblxstor.vercel.app",
    IMGBB_API_KEY: "4f007db7c08b15ad41cf88b4eb0a6a22",
  }
};

export default nextConfig;
