const { inputToConfig } = require("@ethereum-waffle/compiler")
const { ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

// Let variable = true
//Let someVar = variable ? "yes" : "no"

//if (variable) { someVar = "yes"} else {someVar = "no"}

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          beforeEach(async function () {
              let deployer
              let fundMe
              const sendValue = ethers.utils.parseEther("1")
              beforeEach(async function () {
                  deployer = (await getNamedAccounts()).deployer
                  fundMe = await ethers.getContract("FundMe", deployer)
              })

              inputToConfig(
                  "allows people to fund and withdraw",
                  async function () {
                      await fundMe.fund({ value: senValue })
                      await fundMe.withdraw()
                      const endingBalance = await fundMe.provider.getBalance(
                          fundMe.address
                      )
                      assert.equal(endingBalance.toString(), "0")
                  }
              )
          })
      })
