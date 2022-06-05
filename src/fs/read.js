import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToRead.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);

export const read = async () => {
  readFile(filePath, { encoding: "utf-8" })
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      throw new Error("FS operation failed");
    });
};

read();
