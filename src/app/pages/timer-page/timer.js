import Template from "./template/template.hbs";
import TemplateTimer from "../../components/timer/index";

export function Timer(data) {
    const root = document.getElementById("root");

    root.innerHTML = Template();

    TemplateTimer(data);
}
