//import
//main function
//calling of main function

// function deployFunc(hre) {
//     console.log("Hi")
//      hre.getNamedAccounts()
//      hre.deployments
// }

// module.exports.default = deployFunc

//Using a nameless async function, both are fine

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre
//     hre.getNamedAccounts
//     hre.deployments
// }
const { getNamedAccounts, deployments, network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    //same thing
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainID is X use address Y

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    // if (developmentChains.includes(network.name)) {
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =
            networkConfig[chainId]["ethUsdPriceFeedAddress"]
        // ethUsdPriceFeedAddress = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    }
    //if the contract doesn't exist, we deploy a minimal version for our local testing

    //What happens when we want to change chains
    //when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put pricefeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
    log("---------------------------------------")
}
module.exports.tags = ["all", "fundme"]
