export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //NEXT
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      //SUPABASE
      SUPABASE_SERVICE_ROLE_KEY: string;
      SUPABASE_ACCESS_TOKEN: string;
      //STRIPE
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
    }
  }
}
