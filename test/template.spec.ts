import {expect} from 'chai';

describe('Test Class Block', () => {
  before(() => {
    // runs before all tests in this block
  });

  after(() => {
    // runs after all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  describe('Test 1 #get_all', () => {
    it('Should get all', () => {
      expect(true).to.equal(true);
    });
  });
});
