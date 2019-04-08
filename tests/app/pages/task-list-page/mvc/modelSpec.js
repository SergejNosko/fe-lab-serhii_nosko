import {Model} from '../../../../../src/app/pages/task-list-page/mvc/model';
import {EventBus} from "../../../../../src/app/services/eventBus";
import Notification from "../../../../../src/app/components/notifications/index";

describe('Task list page model', () => {
  const notifications = Notification();

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
    model = new Model([data]);
  });

  it('removeTasks method should delete selected tasks', () => {

    model.setTasksToRemove(1, 'select');

    model.removeTasks();

    expect(model.data.length).toEqual(0);
  });

  it('removeTasks method should clear tasksToRemove array', () => {

    model.setTasksToRemove(1, 'select');

    model.removeTasks();

    expect(model.tasksToRemove.length).toEqual(0);
  });

  it('setData method should add new task to data array', () => {

    let data = {
      id: 2,
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

    model.setData(data);

    expect(model.data.length).toEqual(2);

    expect(model.data[1]).toBe(data);
  });

    it('setData method should modify existing task if its id equal to parameter id', () => {

      let data = {
        id: 1,
        title: 'title',
        description: 'desccription',
        createdDate: Date.now(),
        startDate: null,
        deadline: Date.parse('May 12, 2017'),
        isActive: null,
        categoryId: 'education',
        estimationTotal: 3,
        estimationUsed: 1,
        priority: 2
      };

      model.setData(data);

      expect(model.data[0]).toEqual(data);
    });

    it('setData method should show error message if number of tasks with startDate equal to \'today\' is bigger or equal to 5', () => {
      let data = {
        startDate: Date.now(),
        deadline: Date.parse('May 12, 2017'),
        isActive: null
      };

      for(let i = 0; i < 5; i++){
        data.id = i + 1;
        model.setData(data);
      }

      let oldData = model.data;

      data.id = 6;
      model.setData(data);

      expect(model.data).toEqual(oldData);
    });

    it('setTasksToRemove should remove task from tasksToRemove array if type parameter is equal to \'deselect\'', () => {

      model.setTasksToRemove(1, 'select');

      model.setTasksToRemove(1, 'deselect');

      expect(model.tasksToRemove.length).toEqual(0);
    });
});
