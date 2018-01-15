import TaskList from "../../../../src/app/pages/task-list-page/index";
import Firebase from "../../../../src/app/services/firebase";

describe("Reports page main file", () => {

  it("Report function shouldn't throw an error", () => {

    expect(() => {
      TaskList();
    }).not.toThrowError(Error);
  });

  it("Report function should invoke firebase getData method", (done) => {
    spyOn(Firebase, 'getData').and.callThrough();

    let report = setTimeout(() => {
      TaskList();

      done();

      expect(Firebase.getData).toHaveBeenCalled();
    }, 2000);

  });
});
