import { ReactNode } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiJson,
  SiPython,
} from "react-icons/si";
import { FcFolder, FcOpenedFolder, FcPicture, FcFile } from "react-icons/fc";
import { AiFillFileText } from "react-icons/ai";
import { FaJava } from "react-icons/fa";

function getIconHelper() {
  const cache = new Map<string, ReactNode>();

  cache.set("js", <SiJavascript color="#fbcb38" />);
  cache.set("jsx", <SiJavascript color="#fbcb38" />);
  cache.set("java", <FaJava color="#e83936" />);
  cache.set("py", <SiPython color="#4ba1c0" />);
  cache.set("ts", <SiTypescript color="#388faf" />);
  cache.set("tsx", <SiTypescript color="#c84f12" />);
  cache.set("css", <SiCss3 color="#c84f12" />);
  cache.set("json", <SiJson color="#5656e6" />);
  cache.set("html", <SiHtml5 color="#e04e2c" />);
  cache.set("png", <FcPicture />);
  cache.set("jpg", <FcPicture />);
  cache.set("ico", <FcPicture />);
  cache.set("txt", <AiFillFileText color="white" />);
  cache.set("closedDirectory", <FcFolder />);
  cache.set("openDirectory", <FcOpenedFolder />);

  return function (extension: string): ReactNode {
    if (cache.has(extension)) return cache.get(extension);
    else return <FcFile />;
  };
}

export const getIcon = getIconHelper();
