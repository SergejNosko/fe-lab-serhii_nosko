import {Router} from '../../src/app/router';

describe('Router', () => {
  let router = new Router();

  it('add method should add new route according to the parameters', () => {

    let path = 'Path';
    let component = {};

    router.add(path, component);

    expect(router.routes[path]).toEqual(component);

  });

  it('Remove method should remove route according to the path parameter', () => {

    router.remove('Path');

    expect(router.routes['Path']).toBeUndefined();
  });

  it('changeRootPath method should change rootPath field according to the path parameter', () => {

    router.changeRootPath('Path');

    expect(router.root).toEqual('Path');
  });
});
