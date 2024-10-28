const { before, beforeEach, describe, it } = require("node:test");
const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { interfaceVal, bytecode } = require("../compile");

describe("Inbox", () => {
	let provider: any;
	let web3: any;
	let accounts: string[];
	let inbox: any;

	before(async () => {
		provider = ganache.provider();
		web3 = new Web3(provider);
	});

	beforeEach(async () => {
		accounts = await web3.eth.getAccounts();

		console.log("Bytecode:", bytecode); // Verifikasi bytecode

		inbox = await new web3.eth.Contract(interfaceVal)
			.deploy({
				data: `0x${bytecode}`,
				arguments: [448311094383],
			})
			.send({ from: accounts[0], gas: "30000000" }); // Tingkatkan gas limit
	});

	it("should deploy a contract", () => {
		assert.ok(inbox.options.address);
	});

	it("has a default message", async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 448311094383);
	});

	it("can change the message", async () => {
		await inbox.methods.setMessage(5544332211).send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 5544332211);
	});
});
