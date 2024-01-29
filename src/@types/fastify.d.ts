import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    getCurrentUser: (request: FastifyRequest, reply: FastifyReply) => Promise<User | undefined>;
    signOut: (reply: FastifyReply) => void;
  }
}