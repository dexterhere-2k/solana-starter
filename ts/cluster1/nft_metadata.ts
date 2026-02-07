import wallet from "../../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        
        const image =
          "https://gateway.irys.xyz/CrydU34P5gLWXSWwQmi1YofPXvyfcyH6Q8gVjFhfH9ti";
        const metadata = {
          name: "MyXrug",
          symbol: "MXR",
          description: "By dexter",
          image,
          attributes: [{ trait_type: "RUG", value: "cool" }],
          properties: {
            files: [
              {
                type: "image/png",
                uri: image,
              },
            ],
          },
          creators: [
            {
              "address": "3HeKEkXiMSrj2evzPiiCnfs5dFUG7fEuCV4AhvXQm4pP",
              "share":100,
              
            },
          ],
        };
        const myUri =await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
