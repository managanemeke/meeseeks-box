import {notify} from "./notify";

interface TextDocument {
  fontSize: number;
  clone(): TextDocument;
}

export const resizeTextLayerToComposition = (
  type: "width" | "height" | "both" = "width"
): void => {
  alert("resizeTextLayerToComposition");

  const comp = app.project.activeItem as CompItem;
  if (!(comp instanceof CompItem)) {
    alert("Откройте композицию и выберите текстовый слой.");
    return;
  }

  const selectedLayers = comp.selectedLayers;
  if (selectedLayers.length === 0 || !(selectedLayers[0] instanceof TextLayer)) {
    alert("Выберите один текстовый слой.");
    return;
  }

  const textLayer = selectedLayers[0] as TextLayer;

  app.beginUndoGroup("Fit Text to Comp");

  const textProperty = textLayer.property("ADBE Text Properties").property("ADBE Text Document") as Property;
  const sourceTextDocument = textProperty.value as TextDocument;

  alert(String(sourceTextDocument.fontSize));

  const tempTextDoc = sourceTextDocument.clone();

  const compWidth = comp.width;
  const compHeight = comp.height;

  let minSize = 1;
  let maxSize = 2000;
  let bestFit = minSize;

  alert(String(tempTextDoc.fontSize));

  while (maxSize - minSize > 0.5) {
    alert("while");
    const testSize = (minSize + maxSize) / 2;
    tempTextDoc.fontSize = testSize;
    textProperty.setValue(tempTextDoc);

    const bounds = textLayer.sourceRectAtTime(comp.time, false);
    const textWidth = bounds.width;
    const textHeight = bounds.height;

    notify(textWidth + "x" + textHeight);

    var fitsWidth = textWidth <= compWidth;
    var fitsHeight = textHeight <= compHeight;

    var fits = false;

    if (type === "width") {
      fits = fitsWidth;
    } else if (type === "height") {
      fits = fitsHeight;
    } else if (type === "both") {
      fits = fitsWidth && fitsHeight;
    }

    if (fits) {
      bestFit = testSize;
      minSize = testSize;
    } else {
      maxSize = testSize;
    }
  }

  alert(String(bestFit));

  tempTextDoc.fontSize = bestFit;
  textProperty.setValue(tempTextDoc);

  app.endUndoGroup();
};
