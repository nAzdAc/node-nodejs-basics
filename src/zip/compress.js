import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToCompress.txt";
const gzipFileName = "archive.gz";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);
const gzipFilePath = path.join(__dirname, folderName, gzipFileName);

const gzip = createGzip();
const source = createReadStream(filePath, { encoding: "utf-8" });
const destination = createWriteStream(gzipFilePath);

export const compress = async () => {
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  });
};

compress();
