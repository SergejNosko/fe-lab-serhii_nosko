import Firebase from '../../../src/app/services/firebase';

describe('Firebase service', () => {

  it('getData method should return a Promise', () => {

    expect(Firebase.getData() instanceof Promise).toBeTruthy();
  });
});
