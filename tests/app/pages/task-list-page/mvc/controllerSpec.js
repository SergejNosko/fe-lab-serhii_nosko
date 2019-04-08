import {Controller} from '../../../../../src/app/pages/task-list-page/mvc/controller';

describe('Task list page controller', () => {
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
    controller = new Controller([data]);
  });

  it('sendData method should invoke model setData method', () => {
    spyOn(controller.model, 'setData');

    controller.sendData(data);

    expect(controller.model.setData).toHaveBeenCalled();
  });

  it('getRemovedTasksLength method should invoke model getRemovedTasksLength method', () => {
    spyOn(controller.model, 'getRemovedTasksLength');

    controller.getRemovedTasksLength();

    expect(controller.model.getRemovedTasksLength).toHaveBeenCalled();
  });

  it('getRemovedTasksLength should return a length of the model tasksToRemove array', () => {

    controller.setRemovedTask(1, 'select');

    expect(typeof controller.getRemovedTasksLength()).toEqual('number');
  });

  it('sendRemoveRequest method should invoke model removeTasks method', () => {

    spyOn(controller.model, 'removeTasks');

    controller.sendRemoveRequest();

    expect(controller.model.removeTasks).toHaveBeenCalled();
  });

  it('receiveData method should invoke model getData method', () => {

    spyOn(controller.model, 'getData');

    controller.receiveData();

    expect(controller.model.getData).toHaveBeenCalled();
  });

  it('receiveData should return an array ', () => {

    expect(Array.isArray(controller.receiveData({isActive: null}))).toBeTruthy();
  });
});
