import { createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToRead.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);

const stream = createReadStream(filePath, { encoding: "utf-8" });

export const read = async () => {
  stream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on("error", (e) => console.log(e));
};

read();
