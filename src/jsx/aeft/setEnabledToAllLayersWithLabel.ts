export const setEnabledToAllLayersWithLabel = (
  label: number,
  enabled: boolean,
) => {
  app.beginUndoGroup((enabled ? "Enabling" : "Disabling") + " with label " + label);

  for (let i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i);
    if (item instanceof CompItem) {
      for (let j = 1; j <= item.numLayers; j++) {
        var layer = item.layer(j);
        if (layer.label === label) {
          layer.enabled = enabled;
        }
      }
    }
  }

  app.endUndoGroup();
};
