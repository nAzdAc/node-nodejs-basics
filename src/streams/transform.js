import { Transform, pipeline } from "stream";

const readable = process.stdin;
const writable = process.stdout;

const transformStream = new Transform({
  transform(chunk, enc, callback) {
    // if in chunk exists Esc
    if (chunk.find((elem) => elem === 27)) {
      process.exit();
    }

    const stringifiedChunk = chunk.toString().trim();

    const reversedStringifiedChunk = stringifiedChunk
      .split("")
      .reverse()
      .join("");

    this.push(reversedStringifiedChunk + "\n");

    callback();
  },
});

export const transform = async () => {
  pipeline(readable, transformStream, writable, (err) => {
    console.log(err);
  });
};

transform();
