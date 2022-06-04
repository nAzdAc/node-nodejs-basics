import { createHash } from "crypto";
import path from "path";
import { createReadStream } from "fs";
import { stdout } from "process";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = "fileToCalculateHashFor.txt";
const folderName = "/files";
const filePath = path.join(__dirname, folderName, fileName);

export const calculateHash = async () => {
  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  input.pipe(hash).setEncoding("hex").pipe(stdout);
};

calculateHash();
