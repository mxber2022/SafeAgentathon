# PolyGlot - AI-Powered Content Translation Platform

PolyGlot is a revolutionary blockchain-powered platform that transforms digital content ownership and global accessibility. By combining NFT technology with AI-powered translations, we enable content creators to securely monetize their work across language barriers while maintaining full ownership and control.

## Features

### For Content Creators

- 🎨 Mint content as NFTs with built-in translation capabilities
- 💰 Earn royalties from both direct sales and translations
- 🔐 Maintain ownership rights across all language versions
- 🌍 Reach global audiences without language barriers

### For Users

- 📚 Access premium content in preferred languages
- 🏆 Purchase verifiable ownership of digital content
- 🤝 Support creators directly through transparent blockchain transactions
- 🛍️ Participate in a decentralized content marketplace

### Technical Features

- ⚡ Smart contract-based royalty distribution
- 🤖 AI-powered translation system
- 📱 Responsive, modern UI with dark mode
- 🔗 Built on Sei Network for scalability
- 🗄️ Supabase for secure data storage

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain**: Sei Network (EVM)
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Smart Contracts**: Solidity
- **State Management**: React Context
- **UI Components**: Custom components with Tailwind
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Metamask or compatible Web3 wallet

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mxber2022/SafeAgentathon.git
   cd SafeAgentathon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Smart Contract Setup

1. Deploy the smart contract to Sei Network
2. Update the contract address in `src/lib/contract.ts`

### Database Setup

1. Create a new Supabase project
2. Run the migration files in `supabase/migrations`
3. Update the Supabase credentials in your `.env` file

## Project Structure

```
polyglot/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utilities and configurations
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Global styles and Tailwind components
│   └── utils/         # Helper functions
├── supabase/
│   └── migrations/    # Database migrations
└── public/           # Static assets
```

## Key Features Implementation

### Content Minting

- Create NFTs with customizable royalty settings
- Support for multiple content types
- Automatic IPFS storage for content

### Translation System

- AI-powered content translation
- Royalty distribution for translations
- Quality assurance mechanisms

### Marketplace

- Browse and search content
- Filter by language and category
- Purchase and translation tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [polyglot.com](https://polyglot.com)
- Email: support@polyglot.com
- Twitter: [@polyglot](https://twitter.com/polyglot)

## Acknowledgments

- Built with [Supabase](https://supabase.com)
- Powered by [Sei Network](https://www.sei.io)
- Icons by [Lucide](https://lucide.dev)
