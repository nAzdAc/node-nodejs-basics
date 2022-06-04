import { access, mkdir, readdir, stat, copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldFolderName = "/files";
const newFolderName = "/files_copy";
const oldFolderPath = path.join(__dirname, oldFolderName);
const newFolderPath = path.join(__dirname, newFolderName);

export const copy = async () => {
  access(oldFolderPath)
    .then(() => {
      access(newFolderPath)
        .then(() => {
          throw new Error("new folder exists");
        })
        .catch((err) => {
          if (err.message === "new folder exists") {
            throw new Error("FS operation failed");
          } else {
            mkdir(newFolderPath).then(() =>
              readFolder(oldFolderPath, newFolderPath)
            );
          }
        });
    })
    .catch(() => {
      throw new Error("FS operation failed");
    });
};

copy();

async function readFolder(oldFolderPath, newFolderPath) {
  const files = await readdir(oldFolderPath);

  for (const file of files) {
    const fileStat = await stat(path.join(oldFolderPath, file));

    if (fileStat.isDirectory()) {
      await mkdir(path.join(newFolderPath, file));
      await readFolder(
        path.join(oldFolderPath, file),
        path.join(newFolderPath, file)
      );
    }
    if (fileStat.isFile()) {
      await copyFile(
        path.join(oldFolderPath, file),
        path.join(newFolderPath, file)
      );
    }
  }
}
