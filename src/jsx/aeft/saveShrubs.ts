import {
    isAVLayer,
    AeftLayerType,
    aeftLayerType,
    compositionName,
} from "./aeft-utils";
import {
    PROJECT_REON_SHRUBS,
} from "../lib/config";
import {
    SHRUBS,
} from "../../shared/lib/config";

export const saveShrubs = () => {
    const projectItems = app.project.items;

    /* @ts-ignore */
    if (!app?.project?.file?.parent) {
        alert("Project has not been saved!");
        return;
    }

    const shrubsDirectory = PROJECT_REON_SHRUBS;

    for (let i = 1; i <= projectItems.length; i++) {
        const comp = projectItems[i];
        if (
          comp instanceof CompItem
          && comp.parentFolder.name.toLowerCase() === SHRUBS
        ) {
            let shrubCss = "";
            shrubCss += saveCompositionAsCss(comp);
            for (let j = 1; j <= comp.numLayers; j++) {
                const layer = comp.layer(j);
                const type: AeftLayerType = aeftLayerType(layer);
                if (
                  layer.enabled
                  && isAVLayer(layer)
                  && (
                      type === "Video"
                      || type === "Image"
                      || type === "Text"
                  )
                ) {
                    shrubCss += saveLayerAsCss(comp, layer as AVLayer);
                }
            }
            const compName = compositionName(comp);
            saveShrubCss(compName, shrubCss);
        }
    }

    interface AeftLayer {
        composition: string,
        layer: string,
        type: AeftLayerType,
        area: AeftLayerArea,
    }

    interface AeftLayerArea {
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

    function aeftLayerAsCss(aeftLayer: AeftLayer): string {
        const {composition, layer} = aeftLayer;
        const {top, left, width, height} = aeftLayer.area;
        return `.${composition} .${layer} {\n` +
          `  left: ${left}px;\n` +
          `  top: ${top}px;\n` +
          `  width: ${width}px;\n` +
          `  height: ${height}px;\n` +
          `}\n\n`;
    }

    function aeftLayer(comp: CompItem, layer: AVLayer): AeftLayer {
        return {
            composition: compositionName(comp),
            layer: layer.name,
            type: aeftLayerType(layer),
            area: aeftLayerArea(layer, comp.time),
        };
    }

    function saveLayerAsCss(comp: CompItem, layer: AVLayer) {
        return aeftLayerAsCss(aeftLayer(comp, layer));
    }

    function aeftLayerArea(layer: AVLayer, time: number): AeftLayerArea {
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
        /* @ts-ignore */
        const file = new File(folder.fsName + "/" + name);
        /* @ts-ignore */
        file.open("w");
        /* @ts-ignore */
        file.write(content);
        /* @ts-ignore */
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
