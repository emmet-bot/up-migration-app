# Universal Profile Authorize

An app that facilitates Universal Profile (UP) import between controller applications on LUKSO. Enables users to authorize new controllers on their UP, allowing them to seamlessly import their profile to a new wallet/app without losing access to their digital identity.

![LUKSO](https://lukso.network/assets/images/logo.svg)

## Features

- 🔍 **Profile Search** - Search for Universal Profiles using the LUKSO Envio Indexer
- 🔐 **Permission Management** - Select from preset permission levels or customize permissions
- 📱 **QR Code Generation** - Generate QR codes for easy cross-device authorization
- 🔗 **Deep Links** - Share authorization links via messaging apps
- ✅ **Transaction Verification** - Verify successful controller authorization on-chain
- 📦 **Static Export** - Deploy to any static hosting provider

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Web3**: viem + @lukso/up-provider + @erc725/erc725.js
- **GraphQL**: graphql-request (for Envio Indexer)
- **Testing**: Vitest + React Testing Library + Playwright

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- UP Browser Extension (for testing with real wallets)

### Installation

```bash
# Clone the repository
git clone https://github.com/lukso-network/service-up-authorize-website.git
cd service-up-authorize-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build static export
npm run build

# The output is in the 'out' directory
```

## Testing

```bash
# Run unit tests
npm run test

# Run unit tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run e2e tests (requires dev server or build)
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui
```

## How It Works

### Migration Flow

1. **Target Device (New App)**
   - User opens the mini-app in their new wallet/app
   - Connects their new wallet
   - Searches for their existing Universal Profile
   - Selects permission level for the new controller
   - Generates QR code or authorization link

2. **Source Device (Existing App)**
   - User scans QR code or opens authorization link
   - Reviews the authorization request
   - Connects their existing wallet (that controls the UP)
   - Approves the transaction to add the new controller

3. **Verification**
   - The mini-app verifies the controller was added on-chain
   - Both devices can now control the Universal Profile

### LSP6 Permissions

The app uses LSP6 (Key Manager) permissions to control access:

| Permission | Description |
|------------|-------------|
| SUPER_CALL | Call any contract without restrictions |
| SUPER_TRANSFERVALUE | Transfer native tokens without restrictions |
| SUPER_SETDATA | Write any data to the profile |
| SIGN | Sign messages on behalf of the profile |
| And more... | Full LSP6 permission support |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page - mode selection
│   ├── target/            # Target device flow (new app)
│   ├── authorize/         # Source device flow (existing app)
│   └── success/           # Migration complete page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── wallet/            # Wallet connection components
│   ├── search/            # Profile search components
│   ├── migration/         # Migration flow components
│   └── shared/            # Shared utilities
├── hooks/                 # React hooks
├── lib/                   # Utility libraries
│   ├── indexer/          # GraphQL client & queries
│   ├── lsp6/             # LSP6 transaction building
│   ├── auth-package/     # Auth package encode/decode
│   └── utils/            # General utilities
├── types/                 # TypeScript types
└── constants/            # Constants and configurations
```

## API Integrations

### LUKSO Envio Indexer

Used for searching Universal Profiles:

- **Mainnet**: `https://envio.lukso-mainnet.universal.tech/v1/graphql`
- **Testnet**: `https://envio.lukso-testnet.universal.tech/v1/graphql`

### UP RPC API

The `up_import` method is used to generate a new controller address in the target app.

## Environment Variables

```env
# Required for WalletConnect functionality
# Get your project ID from https://cloud.reown.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Override the base URL for authorization links
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### WalletConnect Setup

1. Go to [Reown Cloud](https://cloud.reown.com/) (formerly WalletConnect Cloud)
2. Create a new project
3. Copy your Project ID
4. Set it as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in your environment
5. For GitHub Pages deployment, add `WALLETCONNECT_PROJECT_ID` to your repository secrets

## Deployment

The app is configured for static export. Deploy the `out` directory to any static hosting:

- **Vercel**: Automatic Next.js support
- **Netlify**: Drag & drop the `out` folder
- **GitHub Pages**: Push `out` to gh-pages branch
- **IPFS**: Pin the `out` directory

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

MIT

## Links

- [LUKSO Documentation](https://docs.lukso.tech)
- [Universal Profile Cloud](https://universalprofile.cloud)
- [LSP6 Key Manager](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager)
- [UP Provider](https://docs.lukso.tech/tools/apis/up-rpc-api)
