import beforeMaskedValueChange from './beforeMaskChanges';

describe('beforeMaskedValueChange', () => {
  let newState;
  let oldState;
  let userInput;
  const selection = { start: null, end: null };

  beforeEach(() => {
    newState = { value: '', selection };
    oldState = { value: '', selection };
    userInput = '';
  });

  afterEach(() => {
    newState = { value: '', selection };
    oldState = { value: '', selection };
    userInput = '';
  });

  it('should validate day input', () => {
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      newState
    );
    newState = { value: '3', selection };
    oldState = { value: '', selection };
    userInput = '3';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      newState
    );
    newState = { value: '33/', selection };
    oldState = { value: '3', selection };
    userInput = '3';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      oldState
    );
    newState = { value: '31/', selection };
    oldState = { value: '3', selection };
    userInput = '1';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      newState
    );
  });

  it('should validate month input', () => {
    newState = { value: '12/13/', selection };
    oldState = { value: '12/1', selection };
    userInput = '3';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      oldState
    );
    newState = { value: '31/12/', selection };
    oldState = { value: '31/1', selection };
    userInput = '2';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      newState
    );
    newState = { value: '10/05', selection };
    oldState = { value: '10/0', selection };
    userInput = '5';
    expect(beforeMaskedValueChange(newState, oldState, userInput)).toEqual(
      newState
    );
  });
});
