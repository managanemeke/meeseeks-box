import {
  APPLICATION_STRUCTURES_CSV,
} from "../lib/config";

const structuresFile = (): File | null => {
  const applicationStructuresFile = new File(APPLICATION_STRUCTURES_CSV);
  if (applicationStructuresFile.open("r")) {
    return applicationStructuresFile;
  }
  const customStructuresFile: File = File.openDialog("Select structures csv", "*.csv") as File;
  if (
    customStructuresFile
    && customStructuresFile.open("r")
  ) {
    return customStructuresFile;
  }
  return null;
};

export const renameCompositions = () => {
  const COLUMN_SEPARATOR = ";";

  var proj = app.project;
  if (!proj) {
    alert("No project open.");
    return;
  }

  const csvFile = structuresFile();
  if (!csvFile) {
    alert("Failed to open structures file.");
    return;
  }

  const csvContent = csvFile.read();
  csvFile.close();

  /* @ts-ignore */
  var lines = csvContent.split(/\r?\n/);
  var sizeToNames: Record<string, Array<string>> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    /* @ts-ignore */
    var parts = line.split(COLUMN_SEPARATOR);
    if (parts.length < 3) continue;

    var name = parts[0];
    var width = parseInt(parts[1], 10);
    var height = parseInt(parts[2], 10);
    if (isNaN(width) || isNaN(height)) continue;

    var key: string = width + "x" + height;
    if (!sizeToNames[key]) sizeToNames[key] = [];
    sizeToNames[key].push(name);
  }

  var targetFolder: FolderItem | null = null;
  for (var f = 1; f <= proj.rootFolder.numItems; f++) {
    var folder = proj.rootFolder.item(f);
    if (folder instanceof FolderItem && folder.name.toLowerCase() === "comps") {
      targetFolder = folder;
      break;
    }
  }
  if (!targetFolder) {
    alert("Folder named 'comps' not found in project root.");
    return;
  }

  function compNameExists(folder: FolderItem, name: string) {
    for (var i = 1; i <= folder.numItems; i++) {
      if (folder.item(i).name === name) return true;
    }
    return false;
  }

  function chooseNameDialog(nameList: Array<string>, compIndex: number, sizeLabel: string) {
    /* @ts-ignore */
    var dialog = new Window("dialog", "Choose new name for comp #" + compIndex + " (" + sizeLabel + ")");
    /* @ts-ignore */
    dialog.orientation = "column";
    /* @ts-ignore */
    dialog.alignChildren = ["fill", "top"];
    /* @ts-ignore */
    dialog.margins = 15;
    /* @ts-ignore */
    dialog.preferredSize = [350, 150];

    /* @ts-ignore */
    var dropdown = dialog.add("dropdownlist", undefined, nameList);
    dropdown.selection = 0;

    /* @ts-ignore */
    var btnGroup = dialog.add("group");
    btnGroup.alignment = "right";
    btnGroup.add("button", undefined, "OK", {name: "ok"});
    btnGroup.add("button", undefined, "Cancel", {name: "cancel"});

    /* @ts-ignore */
    return (dialog.show() === 1) ? dropdown.selection.text : null;
  }

  var compsToRename: Array<CompItem> = [];
  for (var j = 1; j <= targetFolder.numItems; j++) {
    var comp = targetFolder.item(j) as AVItem;
    if (comp instanceof CompItem) {
      compsToRename.push(comp);
    }
  }

  app.beginUndoGroup("Rename Comps By Size with Safe Renaming");

  var assignedNames: Record<string, Array<string>> = {};

  for (var idx = 0; idx < compsToRename.length; idx++) {
    const comp: CompItem = compsToRename[idx];
    var sizeKey = comp.width + "x" + comp.height;
    var availableNames = sizeToNames[sizeKey];

    if (!availableNames || availableNames.length === 0) {
      $.writeln("❌ No CSV names for comp '" + comp.name + "' size: " + sizeKey);
      continue;
    }

    if (!assignedNames[sizeKey]) assignedNames[sizeKey] = [];

    var namesLeft: Array<string> = [];
    var i = 0;
    while (i < availableNames.length) {
      var n = availableNames[i];
      var shouldInclude = true;

      if (assignedNames[sizeKey]) {
        var j = 0;
        while (j < assignedNames[sizeKey].length) {
          if (assignedNames[sizeKey][j] === n) {
            shouldInclude = false;
            break;
          }
          j++;
        }
      }

      if (shouldInclude) {
        namesLeft[namesLeft.length] = n;
      }
      i++;
    }

    if (namesLeft.length === 0) {
      $.writeln("ℹ️ All names used for size " + sizeKey + ". Skipping comp #" + (idx + 1));
      continue;
    }

    var chosenName;
    if (namesLeft.length === 1) {
      chosenName = namesLeft[0];
      $.writeln("Auto-renaming comp '" + comp.name + "' to '" + chosenName + "'");
    } else {
      chosenName = chooseNameDialog(namesLeft, idx + 1, sizeKey);
      if (!chosenName) {
        $.writeln("User cancelled renaming for comp #" + (idx + 1));
        continue;
      }
    }

    var finalName = chosenName;
    var counter = 1;
    while (compNameExists(targetFolder, finalName)) {
      finalName = chosenName + "_" + counter;
      counter++;
    }

    comp.name = finalName;
    assignedNames[sizeKey].push(chosenName);
  }

  app.endUndoGroup();

  alert("Renaming completed.");
};
