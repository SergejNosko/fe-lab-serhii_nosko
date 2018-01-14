import SingleTask from "../../../../src/app/components/single-task/index";

describe('Single task component main file', () => {

  it('Single task function should return a string', () => {

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

    let task = SingleTask(data, 'global');

    expect(typeof task).toEqual('string');

  });

});
