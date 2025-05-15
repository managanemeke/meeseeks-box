/// <reference types="types-for-adobe/AfterEffects/23.0"/>

export interface AeftLayer {
  index: number,
  name: string,
  type: AeftLayerType,
  enabled: boolean,
}

export type AeftLayerType =
  | "Null"
  | "Unknown"
  | "Camera"
  | "Light"
  | "Shape"
  | "Solid"
  | "Adjustment"
  | "Text"
  | "Precomp"
  | "Placeholder"
  | "Guide"
  | "TrackMatte"
  | "3D Layer"
  | "Image"
  | "PSD"
  | "EXR"
  | "Illustrator"
  | "Video"
  | "Project"
  | "Graphic"
  | "Footage"
  ;

export const aeftLayersFromComp = (comp: CompItem): Array<AeftLayer> => {
  const layers: Array<AeftLayer> = [];
  for (let i = 1; i <= comp.numLayers; i++) {
    const layer = comp.layer(i);
    layers.push({
      index: i,
      name: layer.name,
      type: aeftLayerType(layer),
      enabled: layer.enabled,
    });
  }
  return layers;
};

export const aeftLayerType = (layer: Layer): AeftLayerType => {
  switch (layer.matchName) {
    case "ADBE Camera Layer": return "Camera";
    case "ADBE Light Layer": return "Light";
  }
  if (isAVLayer(layer)) {
    const avLayer = layer as AVLayer;
    if (avLayer.source instanceof CompItem) return "Precomp";
    if (avLayer.nullLayer) {
      return "Null";
    }
    if (avLayer.adjustmentLayer) {
      return "Adjustment";
    }
    if (avLayer.source instanceof FootageItem) {
      const mainSource = avLayer.source.mainSource;
      if (mainSource instanceof SolidSource) return "Solid";
      if (mainSource instanceof FileSource) {
        const file = avLayer.source.file;
        if (!file) return "Placeholder";
        const ext = file.name.split('.').pop()?.toLowerCase() || "";
        return MEDIA_TYPES[ext] || "Footage";
      }
    }
    if (avLayer.guideLayer) return "Guide";
    if (avLayer.hasTrackMatte) return "TrackMatte";
    if (avLayer.threeDLayer) return "3D Layer";
    switch (layer.matchName) {
      case "ADBE Vector Layer": return "Shape";
      case "ADBE Text Layer": return "Text";
    }
  }
  return "Unknown";
}

export const isAVLayer = (layer: Layer): boolean => {
  const nonAVTypes: Array<string> = [
    "ADBE Camera Layer",
    "ADBE Light Layer",
  ];
  return !in_array(layer.matchName, nonAVTypes);
}

const in_array = (needle: any, haystack: Array<any>): boolean => {
  for (const i in haystack) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
}

const MEDIA_TYPES: Record<string, AeftLayerType> = {
  "jpg": "Image",
  "jpeg": "Image",
  "png": "Image",
  "psd": "PSD",
  "tga": "Image",
  "bmp": "Image",
  "tif": "Image",
  "tiff": "Image",
  "webp": "Image",
  "heic": "Image",
  "exr": "EXR",
  "ai": "Illustrator",

  "mp4": "Video",
  "mov": "Video",
  "avi": "Video",
  "mxf": "Video",
  "webm": "Video",
  "mkv": "Video",
  "m4v": "Video",
  "mpg": "Video",
  "mpeg": "Video",
  "prores": "Video",
  "dnxhd": "Video",

  "aep": "Project",
  "aegraphic": "Graphic",
};
