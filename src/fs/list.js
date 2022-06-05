import { readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderName = "/files";
const folderPath = path.join(__dirname, folderName);

export const list = async () => {
  readdir(folderPath)
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      throw new Error("FS operation failed");
    });
};

list();
