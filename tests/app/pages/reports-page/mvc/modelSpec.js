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

  /*it('getTodayData should call some array methods inside itself', () => {

    let arr = [data];

    spyOn(arr, 'filter');
    spyOn(arr, 'reduce');

    spyOn(model, 'getTodayData').and.callFake(() => {
      const currentWeekStart = model.getCurrentWeek();
      const currentWeekEnd = model.getCurrentWeek();
      currentWeekEnd.setDate(currentWeekStart.getDate() + 7);

      let numberOfTasks = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

      let data = arr
        .filter((item) => {
          const taskDate = new Date(item.startDate);
          const currentDate = taskDate.getDate();

          console.log(taskDate, currentDate);

          return currentDate >= currentWeekStart.getDate() && currentDate <= currentWeekEnd.getDate();
        });
      data.reduce((prev, item) => {
          const taskDay = new Date(item.startDate).getDay();

          if(tooltip === "pomodoro"){
            prev[item.priority - 1][taskDay] += item.estimationTotal;
          }
          else {
            prev[item.priority - 1][taskDay]++;
          }

          return prev;
        }, numberOfTasks);

      return data;
    });

    let dailyTasks = model.getTodayData('title');

  });*/

  it('getWeekData method should return two-dimensional array of numbers', () => {

    let weekTasks = model.getWeekData('tooltip');

    expect(Array.isArray(weekTasks)).toBeTruthy();

    expect(weekTasks.length).toEqual(5);
  });


  it('getMonthData method should return two-dimensional array', () => {

    let monthTasks = model.getMonthData('tooltip');

    expect(Array.isArray(monthTasks)).toBeTruthy();

    expect(monthTasks.length).toEqual(5);
  });
});
