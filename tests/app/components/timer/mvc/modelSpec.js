import {Model} from '../../../../../src/app/components/timer/mvc/model';
import {EventBus} from "../../../../../src/app/services/eventBus";
import Notification from "../../../../../src/app/components/notifications/index";
import Firebase from "../../../../../src/app/services/firebase";

describe('Timer component model', () => {
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
    model = new Model(data);
  });

  describe('addPomodoro method', () => {

    beforeEach(() => {
      model = new Model(data);
    });

    it(' should return true if number of the pomodoros is less then 5', () => {

      expect(model.addPomodoro()).toBeTruthy();
    });

    it(' should return false if number of the pomodoros is bigger of equal to 5', () => {

      data.estimationTotal = 5;

      let div = document.createElement('div');
      div.id = 'root';

      document.body.appendChild(div);

      model = new Model(data);

      expect(model.addPomodoro()).toBeFalsy();
    });
  });

  describe('setEstimation method ', () => {

    it('should set new status according to passed data', () => {
      spyOn(model, 'setEstimation').and.callThrough();

      model.setEstimation({status: 'done'});

      expect(model.data.pomodoros[0].status).not.toBe('none');
    });
  });

  describe('checkPomodoros method ', () => {

    beforeEach(() => {
      model = new Model(data);
    });

    it('should return false if at least one pomodoro hasn\'t done or failed', () => {

      expect(model.checkPomodoros()).toBeFalsy();
    });

    it('should return false if at least one pomodoro hasn\'t done or failed', () => {

      model.fillRemainedPomodoros();

      expect(model.checkPomodoros()).toBeTruthy();
    });
  });

  describe('fillRemainedPomodoros method', () => {

    beforeEach(() => {
      model = new Model(data);
    });

    it(' should set a value of the estimationUsed property equal to the estimationTotal', () => {

      model.fillRemainedPomodoros();

      expect(model.data.estimationUsed).toEqual(model.data.estimationTotal);
    });
  });

  describe('setData method ', () => {

    beforeEach(() => {
      model = new Model(data);
    });

    it('should set new data and invoke EventBus.dispatch method', () => {
      spyOn(EventBus, 'dispatch');
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
        estimationUsed: 2, //this field is changed
        priority: 2
      };

      model.setData(data);

      expect(model.data.estimationUsed).toEqual(data.estimationUsed);

      expect(EventBus.dispatch).toHaveBeenCalled();
    });
  });
});
