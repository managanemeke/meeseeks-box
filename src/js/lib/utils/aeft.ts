import {fs, path} from "../cep/node";
import {csi} from "./bolt";

const getLatestFile = (dir: string, suffix: string): string | null => {
  const getModified = (filePath: string) =>
    fs.statSync(filePath).mtime.valueOf();
  let latestFile: string | null = null;
  fs.readdirSync(dir)
    .filter((file) => file.includes(suffix))
    .map((file) => {
      if (
        latestFile === null ||
        getModified(path.join(dir, file)) >
          getModified(path.join(dir, latestFile))
      ) {
        latestFile = file;
      }
    });
  return latestFile;
};

export const getPrefsDir = (): string => {
  const appVersion = csi.getHostEnvironment().appVersion;
  const { platform, env } = window.cep_node.process;
  const mainDir =
    platform == "darwin"
      ? `${env.HOME}/Library/Preferences`
      : env.APPDATA || "";
  const prefsDir = path.join(
    mainDir,
    "Adobe",
    "After Effects",
    parseFloat(appVersion).toFixed(1).toString()
  );
  return prefsDir;
};

export const getOutputModules = (): string[] => {
  const prefsDir = getPrefsDir();
  const prefsSuffix = "indep-output.txt";
  const outputPref = getLatestFile(prefsDir, prefsSuffix);
  if (outputPref) {
    const txt = fs.readFileSync(path.join(prefsDir, outputPref), {
      encoding: "utf-8",
    });
    const matches = txt.match(
      /\"Output Module Spec Strings Name .* = \".*.\"/g
    );
    if (matches) {
      let outputModules: string[] = [];
      matches.map((line) => {
        const str = line.split("=").pop()?.trim().replace(/"/g, "");
        if (str && !str.includes("_HIDDEN X-Factor")) {
          outputModules.push(str);
        }
      });
      return outputModules;
    }
  }
  return [];
};

export const getRenderSettingsList = (): string[] => {
  const prefsDir = getPrefsDir();
  const prefsSuffix = "indep-render.txt";
  const renderPref = getLatestFile(prefsDir, prefsSuffix);
  if (renderPref) {
    const txt = fs.readFileSync(path.join(prefsDir, renderPref), {
      encoding: "utf-8",
    });
    const lines = txt.match(/[^\r\n]+/g);
    if (lines) {
      const firstLine = lines.findIndex((line) =>
        line.includes("Render Settings List")
      );
      const lastLine = lines.findIndex((line) =>
        line.includes("Still Frame RS Index")
      );
      const settingBlock = lines
        .slice(firstLine, lastLine)
        .join("")
        .trim()
        .replace(/^.*\=/g, "")
        .replace(/\t/g, "")
        .replace(/\\/g, "")
        .replace(/\"\"/g, "");
      let renderSettings: string[] = [];
      settingBlock.match(/\".*?\"/g)?.map((str) => {
        if (str && !str.includes("_HIDDEN X-Factor")) {
          renderSettings.push(str.replace(/\"/g, ""));
        }
      });
      return renderSettings;
    }
  }
  return [];
};

export const getLabelNames = (): Record<number, string> => {
  const prefsDir = getPrefsDir();
  const prefsSuffix = "indep-general.txt";
  const labelPrefsFile = getLatestFile(prefsDir, prefsSuffix);

  if (!labelPrefsFile) return [];

  try {
    const txt = fs.readFileSync(path.join(prefsDir, labelPrefsFile), {
      encoding: "utf-8",
    });

    const labelSectionStart = txt.indexOf('["Label Preference Text Section 7"]');
    if (labelSectionStart === -1) return [];

    const sectionContent = txt.slice(labelSectionStart);

    const lines = sectionContent.match(/[^\r\n]+/g);
    if (!lines) return [];

    const labelNames: Record<number, string> = {};

    const labelRegex = /"Label Text ID 2 # (\d+)"\s*=\s*"([^"]+)"/;

    lines.forEach(line => {
      const match = line.match(labelRegex);
      if (match) {
        const id = parseInt(match[1]);
        labelNames[id] = match[2];
      }
    });

    return labelNames;

  } catch (error) {
    console.error("Error reading label names:", error);
    return [];
  }
};

function normalizeColor(rawColor: string) {
  var result = '';
  var insideQuotes = false;
  var quotedChars = '';
  var charCode, hexPart;

  for (var i = 0; i < rawColor.length; i++) {
    var char = rawColor.charAt(i);

    if (char === '"') {
      insideQuotes = !insideQuotes;
      if (!insideQuotes && quotedChars) {
        for (var j = 0; j < quotedChars.length; j++) {
          charCode = quotedChars.charCodeAt(j);
          hexPart = charCode.toString(16);
          if (hexPart.length < 2) {
            hexPart = '0' + hexPart;
          }
          result += hexPart.toUpperCase();
        }
        quotedChars = '';
      }
      continue;
    }

    if (insideQuotes) {
      quotedChars += char;
    } else {
      if (/[0-9A-Fa-f]/.test(char)) {
        result += char.toUpperCase();
      }
    }
  }

  if (quotedChars) {
    for (var k = 0; k < quotedChars.length; k++) {
      charCode = quotedChars.charCodeAt(k);
      hexPart = charCode.toString(16);
      if (hexPart.length < 2) {
        hexPart = '0' + hexPart;
      }
      result += hexPart.toUpperCase();
    }
  }

  return result.substr(2, 6);
}

export const getLabelColors = (): Record<string, string> => {
  try {
    const prefsDir = getPrefsDir();
    const prefsSuffix = "indep-general.txt";
    const labelPrefsFile = getLatestFile(prefsDir, prefsSuffix);

    if (!labelPrefsFile) return {};

    const txt = fs.readFileSync(path.join(prefsDir, labelPrefsFile), {
      encoding: "utf-8",
    });

    alert("txt");

    const colorSectionStart = txt.indexOf('["Label Preference Color Section 5"]');
    if (colorSectionStart === -1) return {};

    const sectionContent = txt.slice(colorSectionStart);

    const lines = sectionContent.match(/[^\r\n]+/g);
    if (!lines) return {};

    const colorNames: Record<number, string> = {};

    const regex = /"Label Color ID 2 # (\d+)"\s*=\s*(.*)/;

    lines.forEach(line => {
      const match = line.match(regex);
      if (match) {
        const id = parseInt(match[1]);
        colorNames[id] = normalizeColor(match[2]);
      }
    });

    alert("section");

    return colorNames;
  } catch (error) {
    console.warn("Error loading custom label colors:", error);
    return {};
  }
};
