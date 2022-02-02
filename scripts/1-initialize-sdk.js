import  { ThirdwebSDK } from '@3rdweb/sdk';
import ethers from 'ethers';

import dotenv from 'dotenv';

dotenv.config();


const privateKey = process.env.PRIVATE_KEY;
const alchemyApiUrl = process.env.ALCHEMY_API_URL;

if (!privateKey) {
  console.log('Private key not found.');
}

if (!alchemyApiUrl) {
  console.log('Alchemy API URL not found.');
}

const provider = ethers.getDefaultProvider(alchemyApiUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const sdk = new ThirdwebSDK(wallet);

(async function() {
  try {
    const apps = await sdk.getApps();
    console.log(apps);
    console.log("Your first app address is:", apps[0].address);
  } catch(err) {
    console.log('Failed to get apps from  the sdk', err);
    process.exit(1)
  }
})();

export default sdk;