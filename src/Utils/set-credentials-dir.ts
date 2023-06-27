import { CREDENTIALS } from "../Defaults";

export const setCredentialsDir = (dirname: string = "wa_sessions") => {
  CREDENTIALS.DIR_NAME = dirname;
};
