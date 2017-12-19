import {View} from './view';

export default function SingleTask(data, type) {
    const view = new View(data, type);

    return view.render();
};
