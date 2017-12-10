import {View} from './view';

export default function SingleTask(data) {
    const view = new View(data);

    return view.render();
};