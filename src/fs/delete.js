import { unlink } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToRemove.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);

export const remove = async () => {
  unlink(filePath)
    .then(() => {
      console.log(`The file with name "${fileName}" has just been deleted! :)`);
    })
    .catch(() => {
      throw new Error("FS operation failed");
    });
};

remove();
