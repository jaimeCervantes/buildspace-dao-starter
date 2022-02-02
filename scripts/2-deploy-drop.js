import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

import { readFileSync } from 'fs';

const app = sdk.getAppModule('0x1168510d55F7f3EAE43b418Be9071e906e229573');
const image = readFileSync('scripts/assets/permacultureBlockchain.jpg');
const dropModuleProps = {
  name: "PermacultureDAO membership",
  description: "Your membership to participate in permaculture projects and get organic food when harvest starts",
  image,
  primarySaleRecipientAddress: ethers.constants.AddressZero
};

await deployDrop();

async function deployDrop() {
  try {
    const bundleDropModule = await app.deployBundleDropModule(dropModuleProps);
    printSuccessfulInfo(bundleDropModule);
  } catch(err) {
    console.log("failed to deploy bundleDrop module", err);
  }
}

async function printSuccessfulInfo({ address, getMetadata }) {
  console.log('✅ Successfully deployed bundleDrop module, address:', address);
  console.log('✅ bundleDrop metadata:', await getMetadata());
}