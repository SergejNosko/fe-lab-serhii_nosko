import {Controller} from '../../../../../src/app/components/timer/mvc/controller';

describe('Timer component controller', () => {
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

  it('addPomodoro method should invoke model addPomodoro method', () => {
    spyOn(controller.model, 'addPomodoro');

    controller.addPomodoro();

    expect(controller.model.addPomodoro).toHaveBeenCalled();
  });

  it('fillRemained method should invoke model fillRemainedPomodoros method', () => {
    spyOn(controller.model, 'fillRemainedPomodoros');

    controller.fillRemained();

    expect(controller.model.fillRemainedPomodoros).toHaveBeenCalled();
  });

  it('checkPomodoro method should invoke model checkPomodoros method', () => {
    spyOn(controller.model, 'checkPomodoros');

    controller.checkPomodoro();

    expect(controller.model.checkPomodoros).toHaveBeenCalled();
  });

  it('setEstimation method should invoke model setEstimation method', () => {
    spyOn(controller.model, 'setEstimation');

    controller.setEstimation(data);

    expect(controller.model.setEstimation).toHaveBeenCalled();
  });

  it('getData method return object', () => {

    expect(typeof controller.getData()).toEqual('object');
  });

  it('setData method should invoke model setData method', () => {
    spyOn(controller.model, 'setData');

    controller.setData(data);

    expect(controller.model.setData).toHaveBeenCalled();
  });
});
