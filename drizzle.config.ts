import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'd1-http',
  out: './src/lib/database/migrations',
  schema: './src/lib/database/schema',
});
