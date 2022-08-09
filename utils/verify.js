const { run } = require("hardhat")
async function verify(contractAddress, args) {
    //const verify = async (contractAddress, args) => { The same thing
    console.log("verifying contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
