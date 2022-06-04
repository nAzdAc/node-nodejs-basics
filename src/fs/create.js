import { writeFile, access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fresh.txt";
const folderName = "/files";
const fileContent = "I am fresh and young";
const filePath = path.join(__dirname, folderName, fileName);

export const create = async () => {
  access(filePath)
    .then(() => {
      throw new Error("file exists");
    })
    .catch((err) => {
      if (err.message === "file exists") {
        throw new Error("FS operation failed");
      } else {
        writeFile(filePath, fileContent)
          .then(() => {
            console.log(
              `The file with name "${fileName}" and content "${fileContent}" has just been created! :)`
            );
          })
          .catch(() => {
            console.log(
              `Something went wrong. The file with name "${fileName}" and content "${fileContent}" has not been created :(`
            );
          });
      }
    });
};

create();
