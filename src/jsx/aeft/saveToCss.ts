import {compositionName, notify} from "./aeft-utils";

export const saveToCss = () => {
    const projectItems = app.project.items;

    if (!app?.project?.file?.parent) {
        alert("Project has not been saved!");
        return;
    }

    interface TransformConfig {
        position: [number, number],
        scale: [number, number],
        anchorPoint: [number, number],
    };

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
        const compName = compositionName(comp);
        const {top, left, width, height} = getLayerBounds(layer, comp.time);

        return `.${compName} .${layerName} {\n` +
          `  top: ${Math.round(top)}px;\n` +
          `  left: ${Math.round(left)}px;\n` +
          `  width: ${Math.round(width)}px;\n` +
          `  height: ${Math.round(height)}px;\n` +
          `}\n\n`;
    }

    function getLayerBounds(layer: AVLayer, time: number) {
        const rect = layer.sourceRectAtTime(time, true);

        const topLeft = layer.sourcePointToComp([rect.left, rect.top]);
        const bottomRight = layer.sourcePointToComp([rect.left + rect.width, rect.top + rect.height]);

        return {
            left: topLeft[0],
            top: topLeft[1],
            width: bottomRight[0] - topLeft[0],
            height: bottomRight[1] - topLeft[1]
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
