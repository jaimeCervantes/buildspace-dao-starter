import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x1168510d55F7f3EAE43b418Be9071e906e229573");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      name: "Permaculture DAO Governance Token",
      symbol: "PECU",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();