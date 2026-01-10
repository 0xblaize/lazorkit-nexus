# ⚡ Lazorkit Nexus: Passkey & Gasless Starter

Lazorkit Nexus is a high-performance Solana starter template designed to onboard users in seconds. By combining **Biometric Passkeys** with **Gasless Transactions**, this template removes the two biggest friction points in Web3: seed phrases and gas fees.

🚀 **[Live Demo on Vercel](https://lazorkit-nexus.vercel.app/)** 🎥 **[Watch the Demo Video](https://your-loom-link.com)**

---

## ✨ Key Features

- **Seedless Onboarding**: Create a Smart Wallet using device biometrics (FaceID/TouchID) via WebAuthn.
- **Gasless Transactions**: Sponsored transfers and interactions using the Kora Paymaster (Devnet).
- **Fee Abstraction**: Built-in support for paying gas fees in USDC instead of SOL.
- **Real-time UX**: Live SOL balance tracking and instant "View on Explorer" links for every transaction.
- **Developer First**: Clean, documented code with reusable React components.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Lucide Icons
- **Web3**: @lazorkit/wallet SDK, @solana/web3.js
- **Network**: Solana Devnet
- **Gas Sponsorship**: Kora Paymaster

---

## 🚀 Quick Start

### 1. Clone & Install
bash
git clone [https://github.com/0xblaize/lazorkit-nexus.git](https://github.com/0xblaize/lazorkit-nexus)
cd lazorkit-nexus
npm install 


2. Configure Environment
Create a .env.local file in the root directory:

Code snippet

NEXT_PUBLIC_RPC_URL=[https://api.devnet.solana.com](https://api.devnet.solana.com)
NEXT_PUBLIC_PAYMASTER_URL=[https://kora.devnet.lazorkit.com](https://kora.devnet.lazorkit.com)

3. Run Development Server
Bash

npm run dev
📂 Project Structure
/src/components: UI components (ConnectButton, TransferButton, etc.)

/src/providers: LazorProvider context for global wallet state.

/src/app: Next.js App Router pages and global styles.

/tutorials: Step-by-step guides for Auth and Gasless implementation.

🤝 Contributing
Feel free to open issues or PRs to improve the template!

📜 License
Distributed under the MIT License.


---

## 🏗️ Architecture Structure
Include this section in your README or a separate `ARCHITECTURE.md` file to show the judges you understand the system design.

### **System Workflow**
The architecture follows a **Hybrid Account Abstraction** model.



1.  **Identity Layer (Passkey)**: 
    * Uses **WebAuthn** to generate a cryptographic keypair bound to the user's hardware.
    * The public key is mapped to a **Smart Wallet** (Program Derived Address) on Solana.
2.  **Execution Layer (SDK)**: 
    * The `@lazorkit/wallet` SDK captures the user's signature and bundles the transaction instructions into a "Chunk."
3.  **Relay Layer (Paymaster)**: 
    * The transaction is sent to the **Kora Paymaster URL**.
    * The Paymaster verifies the request and signs the transaction as the **Fee Payer**.
4.  **On-Chain Layer**: 
    * The transaction is broadcast to the **Solana Devnet**.
    * The Lazorkit Program validates the smart wallet signature and executes the internal instructions (e.g., SOL Transfer).

### **Folder Hierarchy**
```text
lazorkit-nexus/
├── src/
│   ├── app/              # Next.js Layout & Pages
│   ├── components/       # UI Logic (Buttons, Balance Display)
│   ├── providers/        # Lazor SDK Initialization
│   └── styles/           # Tailwind Global CSS
├── tutorials/            # Mandatory Bounty Documentation
│   ├── 01-auth.md        # How to implement Passkeys
│   └── 02-gasless.md     # How to implement Sponsorship
├── .env.local            # Configuration (RPC & Paymaster)
└── tailwind.config.ts    # Styling Configuration
