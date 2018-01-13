import {Model} from '../../../../../src/app/components/single-task/mvc/model';
import {EventBus} from "../../../../../src/app/services/eventBus";

describe('Single task model: ', () => {
  let model;
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
    model = new Model(data);
  });

  it('setData method should set task data and invoke EventBus.dispatch method', () => {
    spyOn(EventBus, 'dispatch');

    model.setData(data);

    expect(EventBus.dispatch).toHaveBeenCalled();

  });

  it('sendTaskToRemove method should invoke EventBus.dispatch method', () => {
    spyOn(EventBus, 'dispatch');

    model.sendTaskToRemove(data);

    expect(EventBus.dispatch).toHaveBeenCalled();

  });

  it('removeTask method should invoke EventBus.dispatch method', () => {
    spyOn(EventBus, 'dispatch');

    model.removeTask(data);

    expect(EventBus.dispatch).toHaveBeenCalled();

  });

});
