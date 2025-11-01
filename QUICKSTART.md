# 🚀 PrivacyLedger Quick Start Guide

## Prerequisites

- Node.js 18 or higher installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Constellation Stargazer Wallet (optional for demo)

## Installation

```bash
# Navigate to project directory
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at: **http://localhost:3000**

## Testing the Application

### 1. Initial Load
- Open http://localhost:3000 in your browser
- You should see the PrivacyLedger landing page with 3 consent records

### 2. Wallet Connection (Simulated)
- Click "Connect Wallet" button in the header
- Status will change to "Connected ✓" (green badge)
- This simulates Constellation Network connection

### 3. Consent Management
- Navigate to "Consent Management" tab
- Try granting or revoking consent for different types:
  - Marketing Emails
  - Analytics Cookies
  - Third-party Sharing
  - Location Data
- Watch new entries appear in "Consent History" with:
  - Timestamp
  - Status (Granted/Revoked)
  - Blockchain hash (simulated)

### 4. Data Subject Rights
- Click "Data Subject Rights" tab
- Test GDPR rights:
  - **Right to Access**: Request a copy of your data
  - **Right to Portability**: Export your data
  - **Right to Erasure**: Request data deletion
- Click action buttons to see confirmation messages

### 5. Audit Dashboard
- Click "Audit Dashboard" tab
- View compliance metrics:
  - Compliance Score: 98%
  - Active Data Requests
  - Blockchain verification details
  - Network information (Constellation Hypergraph)

## Key Features to Demo

### ✅ Hackathon Requirements Met

1. **Constellation Integration**: Simulated HGTP protocol usage
2. **LegalTech Use Case**: GDPR consent and data rights management
3. **Working Demo**: Fully functional UI with state management
4. **Open Source**: MIT License
5. **Professional Design**: Modern, responsive, accessible UI

### 🎯 Prize Categories

- **Best LegalTech DApp**: GDPR automation with immutable proof
- **Best RegTech Tool**: Compliance dashboard and audit trails
- **Best Use of Metagraph**: Ready for custom blockchain deployment

## Constellation Network Features Demonstrated

### HGTP Protocol
- All consent records are "validated" through Hypergraph Transfer Protocol
- DAG-based data validation simulated
- Blockchain hashes generated for each transaction

### Feeless Architecture
- No gas fees required (Constellation's unique advantage)
- Unlimited scalability
- Accessible to all users

### Zero-Trust Verification
- Immutable audit trails
- Cryptographic proof of consent
- Regulator-friendly architecture

## Project Structure

```
my-app/
├── app/
│   ├── page.tsx          # Main application UI
│   ├── layout.tsx        # App layout and metadata
│   └── globals.css       # Global styles
├── lib/
│   └── constellation.ts  # Constellation SDK integration
├── hooks/
│   └── useConstellation.ts  # React hook for Constellation
├── README.md             # Comprehensive documentation
├── SUBMISSION.md         # Hackathon submission guide
├── QUICKSTART.md         # This file
├── LICENSE               # MIT License
└── package.json          # Dependencies
```

## Technology Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Blockchain**: Constellation Hypergraph (simulated)
- **Protocol**: HGTP (Hypergraph Transfer Protocol)
- **Architecture**: Metagraph-ready design

## Demo Script for Video

### 0:00 - 0:15: Introduction
- "PrivacyLedger solves GDPR compliance using Constellation Network"
- Show landing page and stats

### 0:15 - 0:45: Connect & Record Consent
- Connect wallet (simulated)
- Record 2-3 consent records
- Show blockchain hashes
- Explain immutability

### 0:45 - 1:05: Data Subject Rights
- Exercise a GDPR right (Access or Erasure)
- Show automated request
- Explain legal compliance

### 1:05 - 1:45: Audit Dashboard
- Show compliance metrics
- Display blockchain verification
- Explain regulatory benefits
- Highlight Constellation integration

### 1:45 - 2:00: Conclusion
- "Powered by Constellation Hypergraph"
- "Feeless, scalable, immutable"
- "Open source for everyone"

## Next Steps

### For Hackathon Submission

1. ✅ Record 2-minute demo video
2. ✅ Create GitHub repository
3. ✅ Prepare presentation slides
4. ✅ Document Constellation integration

### For Production

1. Deploy to Constellation testnet
2. Integrate real Stargazer Wallet
3. Connect to actual Hypergraph
4. Deploy custom metagraph
5. Scale to enterprise use cases

## Troubleshooting

### Port already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check TypeScript version
npx tsc --version
```

## Support

- **Constellation Docs**: https://docs.constellationnetwork.io
- **GitHub Issues**: [Your Repository URL]/issues
- **Community**: Constellation Network Discord

---

**Ready to showcase decentralized GDPR compliance! 🎉**
