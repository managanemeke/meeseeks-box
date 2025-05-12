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

        const bounds = getLayerBoundsInCompSpace(layer, comp.time);

        return `.${compName} .${layerName} {\n` +
          `  top: ${Math.round(bounds.top)}px;\n` +
          `  left: ${Math.round(bounds.left)}px;\n` +
          `  width: ${Math.round(bounds.width)}px;\n` +
          `  height: ${Math.round(bounds.height)}px;\n` +
          `}\n\n`;
    }

    function getLayerBoundsInCompSpace(layer: AVLayer, time: number) {
        const rect = layer.sourceRectAtTime(time, true);
        const corners = [
            [rect.left, rect.top],
            [rect.left + rect.width, rect.top],
            [rect.left + rect.width, rect.top + rect.height],
            [rect.left, rect.top + rect.height],
        ];

        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        for (let i = 0; i < corners.length; i++) {
            const corner = corners[i] as [number, number];
            const compPoint = layer.sourcePointToComp(corner);

            minX = Math.min(minX, compPoint[0]);
            maxX = Math.max(maxX, compPoint[0]);
            minY = Math.min(minY, compPoint[1]);
            maxY = Math.max(maxY, compPoint[1]);
        }

        return {
            left: minX,
            top: minY,
            width: maxX - minX,
            height: maxY - minY
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
