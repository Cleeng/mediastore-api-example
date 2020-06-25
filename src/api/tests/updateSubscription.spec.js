import updateSubscription from 'api/Customer/updateSubscription';

describe('updateSubscription', () => {
  it('should calls remote endpoint with authorization token', done => {
    const mockToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiOTUzODAwMDE5Iiwib2ZmZXJJZCI6IlM4NzczNjU4MjBfWlcifQ.BIkzQFE40F6Ig510zaw4aGDa-T0qcrQrWJU8yg3vQvYmjIdVip_9jGxVDA68TT7EF5VmLkTOvEQ-YdLLpygiyCgmncPM_dBvFBx13dwpji2aojqz03hWwHxfYlxQEbMFOiro80XBapmcJQh4kMaZNpQHE9Axx3ooHuOGPXrDy2SzVZTSW3-tG2AoSdkGWVmXBcngDUZjdZdBO9R8j4S1sZ3KxAtWexUHjOmiZos-OOTihp5aFutxm1Faq5qD7f19xBopQ-j3T3gr06oAbcdIyPF8pTUlEmRU1MuFMcMlpVtwPG-P5LoJ_W7fbF7HI-B3DyYHcSXNAehVB54_ETd34g';
    const mockResponse = { foo: 'ok' };
    jest.spyOn(Storage.prototype, 'setItem');

    jest.spyOn(global, 'fetch').mockImplementation(
      async (url, { headers: { Authorization } }) =>
        new Promise((resolve, reject) => {
          if (Authorization === `Bearer ${mockToken}`) {
            resolve({
              json: () => mockResponse
            });
          } else {
            reject();
          }
        })
    );

    localStorage.setItem('CLEENG_AUTH_TOKEN', mockToken);
    updateSubscription().then(res => {
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('should fails on remote call error', done => {
    const mockError = new Error('error');
    const mockFetch = jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

    updateSubscription().catch(err => {
      expect(mockFetch).toHaveBeenCalled();
      expect(err).toEqual(mockError);
      done();
    });
  });
});
