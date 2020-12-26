// load dependencies
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

// Load compiled artifacts
const Box = artifacts.require('Box');

contract('Box', function([ owner, other ]) {

  // use large integers ('big numbers')
  const value = new BN('42');

  beforeEach(async function() {
    // Deploy a new Box contract for each test
    this.box = await Box.new({ from: owner });
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // store a value
    await this.box.store(value, { from: owner });

    // Test if the returned value is the same one
    // use large integer comparisons
    expect(await this.box.retrieve()).to.be.bignumber.equal(value);
  });

  it('store emits an event', async function() {
    const receipt = await this.box.store(value, { from: owner });

    // test that a ValueChanged event was emitted with the new value
    expectEvent(receipt, 'ValueChanged', { newValue: value});
  });

  it('non owner cannot store a value', async function() {
    await expectRevert(
      this.box.store(value, { from: other }),
      'Ownable: caller is not the owner'
    );
  });
});