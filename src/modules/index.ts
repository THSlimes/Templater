import Loading from "../common/Loading";
Loading.onceDOMContentLoaded()
.then(() => {

    const template = document.getElementsByName("my-template")[0] as HTMLTemplateElement;
    
    const pasteArea = document.getElementById("paste-area") as HTMLDivElement;
    pasteArea.appendChild(template.content.cloneNode(true));

});