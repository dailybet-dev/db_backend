import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

export async function buildApp(): Promise<FastifyInstance> {
  const env = envSchema.parse(process.env);
  const app = Fastify({ logger: { level: env.NODE_ENV === 'production' ? 'info' : 'debug' }, trustProxy: env.NODE_ENV === 'production' });

  await app.register(helmet);
  await app.register(cors, { origin: env.CORS_ORIGINS.split(',').map((origin) => origin.trim()), credentials: true });
  await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });

  app.get('/health', async () => ({ service: 'dailybet-api', status: 'ok', mode: 'integration-pending' }));
  app.get('/api/v1', async () => ({ name: 'DailyBet API', version: 'v1', status: 'scaffold', message: 'Real betting, wallet and provider routes are not enabled.' }));

  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, 'Request failed');
    const statusCode = error.statusCode && error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500;
    reply.status(statusCode).send({ error: statusCode === 500 ? 'Internal server error' : error.message, requestId: request.id });
  });
  return app;
}
