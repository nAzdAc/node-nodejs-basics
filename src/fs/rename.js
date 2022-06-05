import { rename as fsRename, access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldFileName = "wrongFilename.txt";
const newFileName = "properFilename.md";
const folderName = "/files";
const oldFilePath = path.join(__dirname, folderName, oldFileName);
const newFilePath = path.join(__dirname, folderName, newFileName);

export const rename = async () => {
  access(newFilePath)
    .then(() => {
      throw new Error("file exists");
    })
    .catch((err) => {
      if (err.message === "file exists") {
        throw new Error("FS operation failed");
      } else {
        fsRename(oldFilePath, newFilePath)
          .then(() => {
            console.log(
              `The file with name "${oldFileName}" has just been renamed to "${newFileName}"! :)`
            );
          })
          .catch(() => {
            throw new Error("FS operation failed");
          });
      }
    });
};

rename();
