import {
    AeftLayerType,
    aeftLayerType,
    compositionName,
} from "./aeft-utils";

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
            cssData += saveCompositionAsCss(comp);
            for (let j = 1; j <= comp.numLayers; j++) {
                const layer = comp.layer(j);
                const type: AeftLayerType = aeftLayerType(layer);
                if (
                  type === "Video"
                  || type === "Image"
                  || type === "Text"
                ) {
                    cssData += saveLayerAsCss(comp, layer as AVLayer);
                }
            }
        }
    }

    saveUsCss(cssData);

    interface AbsoluteBlock {
        left: number,
        top: number,
        width: number,
        height: number,
    }

    function saveCompositionAsCss(comp: CompItem) {
        const compName = compositionName(comp);
        return `.${compName} {\n` +
          `  width: ${comp.width}px;\n` +
          `  height: ${comp.height}px;\n` +
          `}\n\n`;
    }

    function saveLayerAsCss(comp: CompItem, layer: AVLayer) {
        const layerName = layer.name.replace(/\s+/g, '-').toLowerCase();
        const compName = compositionName(comp);
        const {top, left, width, height} = absoluteBlock(layer, comp.time);
        return `.${compName} .${layerName} {\n` +
          `  left: ${left}px;\n` +
          `  top: ${top}px;\n` +
          `  width: ${width}px;\n` +
          `  height: ${height}px;\n` +
          `}\n\n`;
    }

    function absoluteBlock(layer: AVLayer, time: number): AbsoluteBlock {
        const rect = layer.sourceRectAtTime(time, true);
        const topLeft = layer.sourcePointToComp([rect.left, rect.top]);
        const bottomRight = layer.sourcePointToComp([rect.left + rect.width, rect.top + rect.height]);
        return {
            left: Math.round(topLeft[0]),
            top: Math.round(topLeft[1]),
            width: Math.round(bottomRight[0] - topLeft[0]),
            height: Math.round(bottomRight[1] - topLeft[1]),
        };
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
