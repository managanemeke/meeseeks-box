import {compositionName} from "./aeft-utils";

export const saveSubstrates = () => {
    const saveFolder = "comps";
    const defaultSaveDirectory = Folder.desktop;
    const rootDirectory = detectRootDirectory();
    const substratesDirectory = rootDirectory.fsName + "/" + "substrates";
    const outputModuleTemplate = selectOutputModuleTemplate();

    saveSubstrates();

    function saveSubstrates() {
        app.project.renderQueue.showWindow(false);
        createDirectoryIfNeeded(substratesDirectory);
        clearRenderQueue();
        const projectItems = app.project.items;
        let savedAmount = 0;
        for (let i = 1; i <= projectItems.length; i++) {
            const item = projectItems[i];
            if (
                item instanceof CompItem
                && isInsideSaveFolder(item)
            ) {
                addCompositionToRenderQueue(item);
                savedAmount++;
            }
        }
        runRenderQueue();
        clearRenderQueue();
        if (savedAmount > 0) {
            openSubstratesDirectory();
        }
    }

    function detectRootDirectory() {
        /* @ts-ignore */
        const projectDirectory = app?.project?.file?.parent;
        if (
          isProjectSaved()
          && projectDirectory
        ) {
            return projectDirectory;
        }
        return defaultSaveDirectory;
    }

    function createDirectoryIfNeeded(directory: string) {
        const folder = new Folder(directory);
        if (!folder.exists) {
            folder.create();
        }
    }

    function isProjectSaved() {
        return app.project.file !== null;
    }

    function isInsideSaveFolder(comp: CompItem) {
        const parentFolder = comp.parentFolder;
        return parentFolder !== null
          && parentFolder.name.toLowerCase() === saveFolder;
    }

    function selectOutputModuleTemplate() {
        const tempComp: CompItem = app.project.items.addComp("temp", 1920, 1080, 1.0, 1.0, 30);
        const queueItem: RenderQueueItem = app.project.renderQueue.items.add(tempComp);
        const outputModule = queueItem.outputModule(1);

        const templates: Array<string> = [];
        for (let i = 1; i <= outputModule.templates.length; i++) {
            templates.push(outputModule.templates[i]);
        }
        
        clearRenderQueue();
        tempComp.remove();
        
        if (templates.length === 0) {
            alert("There are none Output Modules!\nCreate them via Edit > Templates > Output Module");
            return "";
        }

        /* @ts-ignore */
        const dialog = new Window("dialog", "Select Output Module Template");

        /* @ts-ignore */
        const dropdownListGroup = dialog.add("group");
        dropdownListGroup.alignChildren = ["left", "center"];
        dropdownListGroup.add("statictext", undefined, "Шаблон:");

        const dropdown: DropDownList = dropdownListGroup.add("dropdownlist", undefined, templates);
        dropdown.selection = 0;

        /* @ts-ignore */
        const buttonGroup = dialog.add("group");
        buttonGroup.alignment = "right";
        buttonGroup.add("button", undefined, "OK");

        /* @ts-ignore */
        if (dialog.show() === 1) {
            // @ts-ignore
            return templates[dropdown.selection.index];
        }
        
        return null;
    }

    function addCompositionToRenderQueue(comp: CompItem) {
        comp.openInViewer();
        setTimeToFirstSaveMarkerIfExists();
        addActiveFrameToQueueAsPng();
    }

    function activeComp() {
        const comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert("The is no active composition!");
            return null;
        }
        return comp;
    }

    function setTimeToFirstSaveMarkerIfExists() {
        const comp = activeComp();
        const markers = comp!.markerProperty;
        if (markers.numKeys === 0) {
            return;
        }
        for (let i = 1; i <= markers.numKeys; i++) {
            if (markers.keyValue(i).comment === "save") {
                comp!.time = markers.keyTime(i);
                return;
            }
        }
    }

    function openSubstratesDirectory() {
        new Folder(substratesDirectory).execute();
    }

    function substratesDirectoryFile(name: string) {
        const outputFolder = new Folder(substratesDirectory);
        if (!outputFolder.exists) {
            outputFolder.create();
        }
        /* @ts-ignore */
        return new File(outputFolder.fsName + "/" + name);
    }

    function addActiveFrameToQueueAsPng() {
        const comp = activeComp();
        if (!comp) {
            return;
        }
        let res: [number, number] = [1, 1];
        if (comp?.resolutionFactor.toString() != "1,1") {
            res = comp.resolutionFactor;
            comp.resolutionFactor = [1, 1];
        }
        const file = substratesDirectoryFile(compositionName(comp) + ".png");
        /* @ts-ignore */
        if (file.exists) {
            /* @ts-ignore */
            file.remove();
        }
        callSaveFrameAs();
        const queue = app.project.renderQueue;
        const lastItem = queue.item(queue.numItems);
        prepareQueueItemToSaveAsPngFile(lastItem, file);
        app?.activeViewer?.setActive();
        comp.resolutionFactor = res;
    }

    function callSaveFrameAs() {
        app.executeCommand(2104);
    }

    function prepareQueueItemToSaveAsPngFile(item: RenderQueueItem, file: File) {
        if (outputModuleTemplate) {
            item.render = true;
            const outputModule = item.outputModule(1);
            outputModule.applyTemplate(outputModuleTemplate);
            outputModule.file = file;
        }
    }

    function runRenderQueue() {
        const queue = app.project.renderQueue;
        if (queue.numItems > 0) {
            queue.render();
        }
    }

    function clearRenderQueue() {
        const queue = app.project.renderQueue;
        while (queue.numItems > 0) {
            queue.item(queue.numItems).remove();
        }
    }
};
