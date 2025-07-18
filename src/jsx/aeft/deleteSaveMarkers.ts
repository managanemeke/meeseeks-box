export const deleteSaveMarkers = () => {
    deleteSaveMarkers();

    function deleteSaveMarkers() {
        if (!app.project) {
            alert("Project has not been saved!", "Error");
            return;
        }
        const project = app.project;
        let deletedMarkersCount = 0;

        for (let i = 1; i <= project.numItems; i++) {
            const item = project.item(i);
            if (item instanceof CompItem) {
                const markers = item.markerProperty;
                for (let j = markers.numKeys; j >= 1; j--) {
                    const markerValue = markers.keyValue(j);
                    if (markerValue.comment === "save") {
                        markers.removeKey(j);
                        deletedMarkersCount++;
                    }
                }
            }
        }
        alert("Markers deleted: " + deletedMarkersCount, "Ready");
    }
};
