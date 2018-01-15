import Timer from "../../../../src/app/pages/timer-page/index";
import TemplateTimer from "../../../../src/app/components/timer/index";

describe('Timer main file', () => {
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

  it("Timer function shouldn't throw errors", () => {

    expect(() => {
      Timer(data);
    }).not.toThrow();
  });
});
