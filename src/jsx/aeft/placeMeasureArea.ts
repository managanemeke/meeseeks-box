export const placeMeasureArea = () => {
    const comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    app.beginUndoGroup("Create Shape Coverage Setup");

    const shape: ShapeLayer = comp.layers.addShape();
    shape.name = "measure-area-shape";

    const shapeContentsGroup = shape.property("Contents") as PropertyGroup;
    const group = shapeContentsGroup.addProperty("ADBE Vector Group") as PropertyGroup;
    group.name = "measure-area-group";

    const groupContentsGroup = group.property("Contents") as PropertyGroup;
    const rectGroup = groupContentsGroup.addProperty("ADBE Vector Shape - Rect") as PropertyGroup;
    const rectGroupSize = rectGroup.property("Size") as Property;
    rectGroupSize.setValue([comp.width, comp.height]);

    const fillGroup = groupContentsGroup.addProperty("ADBE Vector Graphic - Fill") as PropertyGroup;
    const fillGroupColor = fillGroup.property("Color") as Property;
    fillGroupColor.setValue([1, 0, 0.588]);

    const text: TextLayer = comp.layers.addText("Coverage %");
    text.name = "measure-area-text";

    const textGroup = text.property("Effects") as PropertyGroup;
    const layerControl = textGroup.addProperty("ADBE Layer Control") as PropertyGroup;
    layerControl.name = "Layer Control";

    const layerControlLayer = layerControl.property("Layer") as Property;
    layerControlLayer.setValue(shape.index);

    const expression =
        'l = effect("Layer Control")("Layer");\n' +
        'if (l != null && l.content("measure-area-group") != null) {\n' +
        '    w = l.content("measure-area-group").content("Rectangle Path 1").size[0];\n' +
        '    h = l.content("measure-area-group").content("Rectangle Path 1").size[1];\n' +
        '    scaleLayerX = l.transform.scale[0] / 100;\n' +
        '    scaleLayerY = l.transform.scale[1] / 100;\n' +
        '    scaleGroup = l.content("measure-area-group").transform.scale[0] / 100;\n' +
        '    S_block = w * scaleLayerX * scaleGroup * h * scaleLayerY * scaleGroup;\n' +
        '    S_comp = thisComp.width * thisComp.height;\n' +
        '    S_percent = Math.abs(S_block / S_comp * 100);\n' +
        '    S_percent.toFixed(1) + "%";\n' +
        '} else {\n' +
        '    "No layer"\n' +
        '}';

    const textSourceText = text.property("Source Text") as Property;
    textSourceText.expression = expression;

    app.endUndoGroup();
};
