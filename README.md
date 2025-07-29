# KMT Discovery Dashboard

<div align="center">

![KMT Discovery](./public/placeholder-logo.svg)

**A comprehensive platform for discovering and managing business opportunities across Africa**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-Latest-purple?style=flat-square)](https://next-auth.js.org/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained-Yes-green?style=flat-square)](https://github.com/Christian-Ishimwe/kmt-discovery-dashboard/graphs/commit-activity)

</div>

## 🌍 About KMT Discovery

KMT Discovery Dashboard is a modern web application designed to facilitate business opportunities discovery and network building across African markets. The platform connects investors, entrepreneurs, tourists, and industry experts through a comprehensive dashboard interface.

### ✨ Key Features

- **🎯 Opportunity Management**: Track and manage investment opportunities across 54 African countries
- **🤝 Network Building**: Connect with professionals, investors, and entrepreneurs
- **📊 Analytics Dashboard**: Comprehensive insights and data visualization
- **✉️ Invitation System**: Role-based user invitations and management
- **🔐 Secure Authentication**: NextAuth.js integration with role-based access control
- **📱 Responsive Design**: Mobile-first design with modern UI components
- **🌙 Dark Mode Support**: Built-in theme switching capabilities

## 🚀 Tech Stack

### Frontend
- **[Next.js 15.2](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Authentication & State
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Data Visualization
- **[Recharts](https://recharts.org/)** - Charts and data visualization
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Clone the Repository
```bash
git clone https://github.com/Christian-Ishimwe/kmt-discovery-dashboard.git
cd kmt-discovery-dashboard
```

### Install Dependencies
```bash
pnpm install
# or
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Email Configuration (for invitations)
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@kmtdiscovery.rw
```

### Run Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎭 Demo Accounts

The application comes with pre-configured demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kmtdiscovery.rw | password123 |
| Editor | editor@kmtdiscovery.rw | password123 |
| Country Manager | manager@kmtdiscovery.rw | password123 |
| Investor | investor@kmtdiscovery.rw | password123 |
| Tourist | tourist@kmtdiscovery.rw | password123 |

## 📱 Features Overview

### Dashboard
- Real-time statistics and KPIs
- Investment volume tracking
- Country coverage analytics
- Recent opportunities feed

### Opportunities Management
- Browse investment opportunities
- Filter by sector, location, and investment size
- Detailed opportunity profiles
- Status tracking

### Network
- Professional connections
- User profiles and roles
- Connection requests
- Industry experts directory

### Invitation System
- Role-based user invitations
- Email invitation workflow
- Invitation status tracking
- User role management

### Settings
- Profile management
- Notification preferences
- Account security
- Theme customization

## 🏗️ Project Structure

```
kmt-discovery-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── auth/             # Authentication
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── ui/              # UI component library
│   └── auth-provider.tsx # Authentication provider
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Type checking
pnpm type-check   # Run TypeScript compiler
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@kmtdiscovery.rw
- 🐛 Issues: [GitHub Issues](https://github.com/Christian-Ishimwe/kmt-discovery-dashboard/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Christian-Ishimwe/kmt-discovery-dashboard/discussions)

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for hosting and deployment
- The open-source community for the amazing tools and libraries

---

<div align="center">

**Built with ❤️ for African Innovation**

[Website](https://kmtdiscovery.rw) • [Documentation](https://docs.kmtdiscovery.rw) • [Blog](https://blog.kmtdiscovery.rw)

</div>
