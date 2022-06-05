const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  //   console.log("Chunk from master: ", chunk);
  const chunkStringified = Buffer.from(chunk.data).toString();
  if (chunkStringified.includes("CLOSE")) {
    process.send(null);
  } else {
    process.send(chunk);
  }
  //   process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

// process.stdin.on("data", echoInput);
process.on("message", (masterMessage) => {
  //   console.log("MASTER Message: ", masterMessage);
  echoInput(masterMessage);
});
