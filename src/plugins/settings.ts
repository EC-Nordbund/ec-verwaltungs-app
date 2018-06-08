import { isElectron } from "@/plugins/electron";
import * as _ from "electron-settings";

const __: typeof _ = isElectron ? eval("require('electron-settings')") : null;

export default __;
