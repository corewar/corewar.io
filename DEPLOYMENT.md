# Deployment Guide for Netlify

This monorepo is configured to deploy both the marketing site (`corewar-public`) and the game app (`corewar-app`) to Netlify as a single deployment.

## Deployment Structure

- **`/`** → Marketing site (`corewar-public`)
- **`/app`** → Game/Editor app (`corewar-app`)

## Netlify Configuration

The `netlify.toml` file is already configured with:
- Build command: `pnpm run build:unified`
- Publish directory: `build`
- Routing rules for both packages

## Deployment Steps

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Netlify will automatically detect the `netlify.toml` configuration

2. **Build Process**
   - Netlify will run `pnpm run build:unified`
   - This builds both packages and creates the unified structure
   - Marketing site goes to root `/`
   - Game app goes to `/app`

3. **Routing**
   - All routes are handled by the respective `index.html` files
   - Client-side routing works for both packages

## Local Testing

To test the deployment locally:

```bash
# Build the unified package
pnpm run build:unified

# Serve the build directory
npx serve -s build -p 3000

# Test the routes
# http://localhost:3000/          → Marketing site
# http://localhost:3000/app       → Game app
```

## CTA Links

The "Play Now" buttons in the marketing site now point to `/app` instead of the old `app/editor/src` path.

## Troubleshooting

- **Build fails**: Make sure all dependencies are installed with `pnpm install`
- **Routing issues**: Check that the `netlify.toml` file is in the root directory
- **Static assets**: Both packages build to their respective directories and are copied to the unified build
