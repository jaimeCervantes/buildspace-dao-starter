import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule('0x989BAd4F17E96d38a1B073CcE2461f9722f2282c');

const nfts = [
  {
    name: 'Harvest',
    description: 'This NFT will give you acces to your harvest',
    image: readFileSync('scripts/assets/harvest.jpg')
  }
];

(async function() {
  try {
    await bundleDrop.createBatch(nfts);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch(err) {
    console.error("failed to create the new NFT", error);
  }
})();