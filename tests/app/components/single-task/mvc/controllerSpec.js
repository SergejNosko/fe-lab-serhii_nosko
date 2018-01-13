import {Controller} from '../../../../../src/app/components/single-task/mvc/controller';

describe('Single task controller :', () => {
  let controller;
  let data = {
    id: 1,
    title: 'title',
    description: 'desccription',
    createdDate: Date.now(),
    startDate: null,
    deadline: Date.parse('May 12, 2017'),
    isActive: null,
    categoryId: 'work',
    estimationTotal: 3,
    estimationUsed: 0,
    priority: 2
  };

  beforeEach(() => {
    controller = new Controller(data);
  });

  it('sendData method should invoke model setData method', () => {
    spyOn(controller.model, 'setData');

    controller.sendData(data);

    expect(controller.model.setData).toHaveBeenCalled();
  });

  it('setTaskToRemove method should invoke model sendTaskToRemove method', () => {
    spyOn(controller.model, 'sendTaskToRemove');

    controller.setTaskToRemove();

    expect(controller.model.sendTaskToRemove).toHaveBeenCalled();
  });

  it('immediateRemove method should invoke model sendTaskToRemove and removeTask methods', () => {
    spyOn(controller.model, 'sendTaskToRemove');
    spyOn(controller.model, 'removeTask');

    controller.immediateRemove();

    expect(controller.model.sendTaskToRemove).toHaveBeenCalled();
    expect(controller.model.removeTask).toHaveBeenCalled();
  });

  it('receiveData method should return object', () => {

    expect(typeof controller.receiveData()).toEqual('object');
  });

});
