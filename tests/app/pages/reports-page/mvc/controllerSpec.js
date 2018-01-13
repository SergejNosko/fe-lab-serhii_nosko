import {Controller} from '../../../../../src/app/pages/reports-page/mvc/controller';

describe('Reports page controller', () => {
  let controller;
  let data = {
    id: 1,
    title: 'title',
    description: 'desccription',
    createdDate: Date.now(),
    startDate: null,
    deadline: Date.parse('May 12, 2017'),
    isActive: false,
    categoryId: 'work',
    estimationTotal: 3,
    estimationUsed: 0,
    priority: 2
  };

  beforeEach(() => {
    controller = new Controller([data]);
  });

  it('receiveData method should invoke model method getTodayData if type parameter equal to \'day\'', () => {
    spyOn(controller.model, 'getTodayData');

    controller.receiveData('day', 'tooltip');

    expect(controller.model.getTodayData).toHaveBeenCalled();
  });

  it('receiveData method should invoke model method getWeekData if type parameter equal to \'week\'', () => {
    spyOn(controller.model, 'getWeekData');

    controller.receiveData('week', 'tooltip');

    expect(controller.model.getWeekData).toHaveBeenCalled();
  });

  it('receiveData method should invoke model method getMonthData if type parameter equal to \'month\'', () => {
    spyOn(controller.model, 'getMonthData');

    controller.receiveData('month', 'tooltip');

    expect(controller.model.getMonthData).toHaveBeenCalled();
  });
});
