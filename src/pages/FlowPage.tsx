import React from 'react';
import { FileText, Lock, Key, Globe2, Coins, Code } from 'lucide-react';
import { MermaidDiagram } from '../components/flow/MermaidDiagram';

export function FlowPage() {
  const contentCreationFlow = `
    flowchart TB
      subgraph Creation
        A[Creator] -->|Upload| B[Content]
        B -->|Store| C[IPFS]
        C -->|Metadata| D[NFT Contract]
        D -->|Mint| E[Original NFT]
      end
  `;

  const translationFlow = `
    flowchart TB
      subgraph Translation
        A[User] -->|Request| B[Translation]
        B -->|Process| C[AI Service]
        C -->|Generate| D[Translation]
        D -->|Encrypt| E[Encrypted Content]
        E -->|Store| F[IPFS]
        F -->|Update| G[NFT Metadata]
      end
  `;

  const encryptionFlow = `
    flowchart TB
      subgraph Encryption
        A[Translation] -->|Input| B[AES-256-GCM]
        B -->|Encrypt| C[Encrypted Content]
        D[User Public Key] -->|RSA| E[Encrypted Key]
        C --> F[Store]
        E --> F
        F -->|Update| G[NFT Metadata]
      end
  `;

  const royaltyFlow = `
    flowchart TB
      subgraph Royalties
        A[Purchase] -->|Payment| B[Smart Contract]
        B -->|85%| C[Creator]
        B -->|15%| D[Platform]
        B -->|Record| E[Ledger]
      end
  `;

  // Sample metadata for visualization
  const sampleMetadata = {
    name: "Technical Documentation v1",
    description: "Comprehensive guide for blockchain development",
    image: "ipfs://Qm...",
    external_url: "https://app.polyglot.ai/content/123",
    attributes: [
      {
        trait_type: "Content Type",
        value: "Technical"
      },
      {
        trait_type: "Original Language",
        value: "English"
      }
    ],
    properties: {
      translations: [
        {
          language: "Spanish",
          encrypted_content: "0x...", // Encrypted IPFS hash
          translator: "0x123...",
          public_key: "0x456...",
          timestamp: "2025-02-14T12:00:00Z"
        }
      ],
      creator: "0x789...",
      creator_share: 85,
      agent_share: 15,
      version: "1.0"
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-surface-200/50 border border-surface-300/50 text-surface-700">
            <FileText className="w-4 h-4 mr-2 text-brand-500" />
            <span className="text-sm font-medium">System Architecture</span>
          </div>
          <h1 className="text-4xl font-bold text-surface-900 mb-4">
            PolyGlot Flow Diagram
          </h1>
          <p className="text-xl text-surface-700 max-w-2xl mx-auto">
            Understanding the content creation, translation, and encryption process
          </p>
        </div>

        {/* Flow Diagrams */}
        <div className="space-y-8">
          <MermaidDiagram 
            chart={contentCreationFlow} 
            title="Step 1: Content Creation Flow"
          />
          
          <MermaidDiagram 
            chart={translationFlow} 
            title="Step 2: Translation Request Flow"
          />
          
          <MermaidDiagram 
            chart={encryptionFlow} 
            title="Step 3: Encryption Process Flow"
          />
          
          <MermaidDiagram 
            chart={royaltyFlow} 
            title="Step 4: Royalty Distribution Flow"
          />
        </div>

        {/* Sample Metadata */}
        <div className="mt-12 bg-surface-100 rounded-2xl p-8 border border-surface-200">
          <h2 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Code className="w-5 h-5 text-brand-500" />
            </div>
            Sample Metadata Structure
          </h2>
          <div className="bg-surface-200 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-surface-700 whitespace-pre-wrap">
              {JSON.stringify(sampleMetadata, null, 2)}
            </pre>
          </div>
        </div>

        {/* Security Notes */}
        <div className="mt-8 bg-surface-100 rounded-2xl p-8 border border-surface-200">
          <h2 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-brand-500" />
            </div>
            Security Implementation
          </h2>
          <div className="space-y-4">
            <div className="bg-surface-200 rounded-xl p-6">
              <h3 className="font-bold text-surface-900 mb-3">Encryption Process</h3>
              <p className="text-surface-700 mb-4">
                The translation content is encrypted using the user's public key through the following process:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-surface-700">
                <li>Generate a random symmetric key for AES-256-GCM encryption</li>
                <li>Encrypt the translation content using the symmetric key</li>
                <li>Encrypt the symmetric key using the user's public key (RSA)</li>
                <li>Store the encrypted content and encrypted key in metadata</li>
                <li>Only the user with the corresponding private key can decrypt</li>
              </ol>
            </div>
            
            <div className="bg-surface-200 rounded-xl p-6">
              <h3 className="font-bold text-surface-900 mb-3">Access Control</h3>
              <ul className="list-disc list-inside space-y-2 text-surface-700">
                <li>Content is encrypted per-user using their public key</li>
                <li>Each translation purchase creates a unique encrypted version</li>
                <li>Smart contract verifies ownership before allowing decryption</li>
                <li>Private keys never leave the user's wallet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}