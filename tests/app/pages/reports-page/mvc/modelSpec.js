import {Model} from '../../../../../src/app/pages/reports-page/mvc/model';

describe('Reports page model', () => {

  let model;
  let data = {
    id: 1,
    title: 'title',
    description: 'desccription',
    createdDate: Date.now(),
    startDate: null,
    deadline: Date.parse('January 14, 2018'),
    isActive: false,
    categoryId: 'work',
    estimationTotal: 3,
    estimationUsed: 0,
    priority: 2
  };

  beforeEach(() => {
    model = new Model([data]);
  });

  it('getTodayData mehtod should return an array of numbers', () => {

    let dailyTasks = model.getTodayData('title');

    expect(Array.isArray(dailyTasks)).toBeTruthy();

    expect(dailyTasks.length).toEqual(5);

  });

  it('getWeekData method should return two-dimensional array of numbers', () => {

    let weekTasks = model.getWeekData('pomodoro');

    expect(Array.isArray(weekTasks)).toBeTruthy();

    expect(weekTasks.length).toEqual(5);
  });


  it('getMonthData method should return two-dimensional array', () => {

    let monthTasks = model.getMonthData('pomodoro');

    expect(Array.isArray(monthTasks)).toBeTruthy();

    expect(monthTasks.length).toEqual(5);
  });
});
