export const placeSaveMarkers = () => {
    const defaultTime = "00:00:10:00";

    main();

    function main() {
        if (!app.project) {
            alert("Project has not been saved!", "Error");
            return;
        }
        const timestamp = promptForTimestamp();
        if (!timestamp) {
            return;
        }
        processAllCompositions(timestamp);
    }

    function promptForTimestamp() {
        /* @ts-ignore */
        const dialog = new Window("dialog", "Place save markers");

        /* @ts-ignore */
        const timestampGroup = dialog.add("group");
        timestampGroup.alignChildren = ["left", "center"];
        timestampGroup.add("statictext", undefined, "Timestamp (hh:mm:ss:ff):");

        const selectedTimestamp = timestampGroup.add("edittext", undefined, defaultTime);
        selectedTimestamp.characters = 11;

        /* @ts-ignore */
        const buttonGroup = dialog.add("group");
        buttonGroup.alignment = "right";
        buttonGroup.add("button", undefined, "OK");

        /* @ts-ignore */
        if (dialog.show() === 1) {
            return selectedTimestamp.text;
        }
    }

    function timestampToTime(timestamp: string, frameRate: number) {
        const parts = timestamp.split(':');
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        const frames = parseInt(parts[3], 10);
        return hours * 3600 + minutes * 60 + seconds + frames / frameRate;
    }

    function processAllCompositions(timestamp: string) {
        const project = app.project;
        for (let i = 1; i <= project.numItems; i++) {
            const item = project.item(i);

            if (item instanceof CompItem) {
                addMarkerToComp(item, timestamp);
            }
        }
    }

    function addMarkerToComp(comp: CompItem, timestamp: string) {
        const markers = comp.markerProperty;
        let markerExists = false;
        const timeInSeconds = timestampToTime(timestamp, comp.frameRate);
        for (let j = 1; j <= markers.numKeys; j++) {
            if (Math.abs(markers.keyTime(j) - timeInSeconds) < 0.001) {
                markerExists = true;
                break;
            }
        }
        if (!markerExists) {
            const markerValue = new MarkerValue("save");
            comp.markerProperty.setValueAtTime(timeInSeconds, markerValue);
        }
    }
};
