import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "archive.gz";
const ungzipFileName = "fileToCompress.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);
const ungzipFilePath = path.join(__dirname, folderName, ungzipFileName);

const ungzip = createGunzip();
const source = createReadStream(filePath);
const destination = createWriteStream(ungzipFilePath);

export const decompress = async () => {
  pipeline(source, ungzip, destination, (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  });
};

decompress();
