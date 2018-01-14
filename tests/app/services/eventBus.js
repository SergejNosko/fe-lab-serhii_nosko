import {EventBus} from "../../../src/app/services/eventBus";

describe('EventBus service', () => {

  it('remove method should clean an existing listener', () => {

    EventBus.add('listener', () => {});

    EventBus.remove('listener');

    expect(EventBus.listeners['listener']).toEqual([]);

  });

  it('dispatch method should call listener callback property according to the type parameter', () => {
    EventBus.add('listener', () => {});

    spyOn(EventBus.listeners['listener'][0], 'callback').and.callThrough();

    EventBus.dispatch('listener');

    expect(EventBus.listeners['listener'][0].callback).toHaveBeenCalled();

  });
});
