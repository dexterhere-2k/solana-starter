import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("3yCUn4eUGzTioECVMntwzqWGdcUxYCvqsh66TWgi5wvB");

// Recipient address
const to = new PublicKey("9mTSeBpZbmUSbTtvN31Gdcsp2szaFh6ahESa2hm1aHg4");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ata=await getOrCreateAssociatedTokenAccount(connection,keypair,mint,keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        const ata2 = await getOrCreateAssociatedTokenAccount(
          connection,
          keypair,
          mint,
          to,
        );

        // Transfer the new token to the "toTokenAccount" we just created
        const sig=await transfer(connection,keypair,ata.address,ata2.address,keypair.publicKey,new BN(1))
        console.log(`Signature is ${sig}`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();