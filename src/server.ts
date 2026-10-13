import 'dotenv/config';
import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '0.0.0.0';

const app = await buildApp();
try {
  await app.listen({ port, host });
  app.log.info({ host, port }, 'DailyBet API started');
} catch (error) {
  app.log.error(error, 'Failed to start DailyBet API');
  process.exit(1);
}
