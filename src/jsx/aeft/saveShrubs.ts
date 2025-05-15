import {
    AeftLayerType,
    aeftLayerType,
    compositionName,
} from "./aeft-utils";

export const saveShrubs = () => {
    const projectItems = app.project.items;

    if (!app?.project?.file?.parent) {
        alert("Project has not been saved!");
        return;
    }

    const rootDirectory = app.project.file.parent;
    const shrubsDirectory = rootDirectory.fsName + "/" + "shrubs";

    for (let i = 1; i <= projectItems.length; i++) {
        const comp = projectItems[i];
        if (comp instanceof CompItem) {
            let shrubCss = "";
            shrubCss += saveCompositionAsCss(comp);
            for (let j = 1; j <= comp.numLayers; j++) {
                const layer = comp.layer(j);
                const type: AeftLayerType = aeftLayerType(layer);
                if (
                  type === "Video"
                  || type === "Image"
                  || type === "Text"
                ) {
                    shrubCss += saveLayerAsCss(comp, layer as AVLayer);
                }
            }
            const compName = compositionName(comp);
            saveShrubCss(compName, shrubCss);
        }
    }

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
        new Folder(shrubsDirectory).execute();
    }

    function createFolder(path: string): Folder {
        const outputFolder = new Folder(path);
        if (!outputFolder.exists) {
            outputFolder.create();
        }
        return outputFolder;
    }

    function createFile(path: string, name: string, content: string): File {
        const folder = createFolder(path);
        const file = new File(folder.fsName + "/" + name);
        file.open("w");
        file.write(content);
        file.close();
        return file;
    }

    function saveShrubCss(shrub: string, css: string) {
        if (css) {
            if (createFile(shrubsDirectory + "/" + shrub, "index.css", css)) {
                openStylesDirectory();
            }
        } else {
            alert("Empty!");
        }
    }
};
