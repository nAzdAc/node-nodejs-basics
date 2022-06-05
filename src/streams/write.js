import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToWrite.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);

const stream = createWriteStream(filePath, {
  encoding: "utf-8",
});

export const write = async () => {
  process.stdin.on("data", (chunk) => {
    // if in chunk exists Esc
    if (chunk.find((elem) => elem === 27)) {
      process.exit();
    }

    stream.write(chunk);
  });
};

write();
