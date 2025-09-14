This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Using Docker (Recommended)

The easiest way to get started is using Docker:

```bash
# Development mode with hot reloading
docker-compose --profile dev up

# Or production mode
docker-compose --profile prod up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker

This project includes Docker configuration for easy development and deployment. See [DOCKER.md](./DOCKER.md) for detailed Docker usage instructions.

### Quick Docker Commands

```bash
# Development
docker compose --profile dev up

# Production
docker compose --profile prod up --build

# With Nginx (Production)
docker compose --profile prod --profile nginx up --build

# Or use the convenience script
./docker-scripts.sh dev      # Start development
./docker-scripts.sh prod     # Start production
./docker-scripts.sh stop     # Stop all containers
./docker-scripts.sh help     # Show all commands
```

## 🚀 **Vercel Deployment (Existing)**

**⚠️ Important:** This project already has automatic deployment to Vercel set up through the Vercel platform. The Docker setup is for **local development only** and won't affect your existing Vercel deployment.

### Current Flow:
```
GitHub Push → Vercel Platform → Automatic Deployment ✅
```

### Docker Integration (Local Only):
```
Local Development → Docker → Testing → GitHub Push → Vercel ✅
```

**Files that won't affect Vercel deployment:**
- `Dockerfile` - Only for local development
- `docker-compose.yml` - Only for local development  
- `nginx.conf` - Only for local production testing
- `vercel.json` - Optional Vercel config (can be removed if not needed)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
