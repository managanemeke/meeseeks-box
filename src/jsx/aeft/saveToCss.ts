import {compositionName} from "./aeft-utils";

export const saveToCss = () => {
    const projectItems = app.project.items;

    if (!app?.project?.file?.parent) {
        alert("Project has not been saved!");
        return;
    }

    const rootDirectory = app.project.file.parent;
    const stylesDirectory = rootDirectory.fsName + "/" + "styles";

    let cssData = "";

    for (let i = 1; i <= projectItems.length; i++) {
        const comp = projectItems[i];
        if (comp instanceof CompItem) {
            for (let j = 1; j <= comp.numLayers; j++) {
                const layer = comp.layer(j);
                if (!(layer instanceof AVLayer)) {
                    continue;
                }
                cssData += saveLayerAsCss(comp, layer);
            }
        }
    }

    saveUsCss(cssData);

    function saveLayerAsCss(comp: CompItem, layer: AVLayer) {
        const layerName = layer.name.replace(/\s+/g, '-').toLowerCase();
        const scale = layer.transform.scale.value;
        const position = layer.transform.position.value;
        const anchor = layer.transform.anchorPoint.value;

        let width = layer.sourceRectAtTime(comp.time, false).width * scale[0] / 100;
        let height = layer.sourceRectAtTime(comp.time, false).height * scale[1] / 100;
        width = Math.round(width);
        height = Math.round(height);

        let topMargin = position[1] - (height / 2) - (anchor[1] * scale[1] / 100 - anchor[1]);
        let leftMargin = position[0] - (width / 2) - (anchor[0] * scale[0] / 100 - anchor[0]);
        topMargin = Math.round(topMargin);
        leftMargin = Math.round(leftMargin);

        const compName = compositionName(comp);

        return "." + compName + " " + "." + layerName + " {\n" +
          "  position: absolute;\n" +
          "  top: " + topMargin + "px;\n" +
          "  left: " + leftMargin + "px;\n" +
          "  width: " + width + "px;\n" +
          "  height: " + height + "px;\n" +
          "}\n\n";
    }

    function openStylesDirectory() {
        new Folder(stylesDirectory).execute();
    }

    function saveUsCss(cssData: string) {
        if (cssData) {
            const outputFolder = new Folder(stylesDirectory);
            if (!outputFolder.exists) {
                outputFolder.create();
            }
            const file = new File(outputFolder.fsName + "/" + "us.css");
            file.open("w");
            file.write(cssData);
            file.close();
            openStylesDirectory();
        } else {
            alert("Empty!");
        }
    }
};
