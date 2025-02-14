import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0x60155DF180066aD68ee39D64B5AeBF1440971Ccf';

export const CONTRACT_ABI = [
  'function safeMint(address to, string memory uri) public',
  'function purchaseTranslation(string memory contentId, string memory language, address creator, uint256 creatorShare, uint256 agentShare) public payable returns (bool)'
];

export async function mintNFT(address: string, uri: string) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    const tx = await contract.safeMint(address, uri);
    const receipt = await tx.wait();
    
    // Convert any BigInt values to strings in the receipt
    const sanitizedReceipt = JSON.parse(JSON.stringify(receipt, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
    
    return sanitizedReceipt;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}
export async function purchaseTranslation(
  contentId: string,
  language: string,
  creator: string,
  creatorShare: number,
  agentShare: number
) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Fixed price of 0.01 ETH
    const price = ethers.parseEther('0.01');

    // Use BigInt directly for shares
    const creatorShareBN = BigInt(creatorShare);
    const agentShareBN = BigInt(agentShare);

    const tx = await contract.purchaseTranslation(
      contentId,
      language,
      creator,
      creatorShareBN,
      agentShareBN,
      { 
        value: price
      }
    );
    
    const receipt = await tx.wait();

    // Convert any BigInt values to strings in the receipt
    const sanitizedReceipt = JSON.parse(JSON.stringify(receipt, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return sanitizedReceipt;
  } catch (error: any) {
    // Check if the error message contains 'eth_getTransactionCount'
    const errorMessage = error?.error?.message || error?.message || '';

    if (errorMessage.includes('eth_getTransactionCount')) {
      console.warn('Ignoring eth_getTransactionCount error:', errorMessage);
      return; // Simply ignore the error and return undefined
    }

    console.error('Error purchasing translation:', errorMessage);
  //  throw error; // Rethrow other errors
  }
}

