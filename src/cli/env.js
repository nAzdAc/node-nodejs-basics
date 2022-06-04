process.env.RSS_React = "React";
process.env.RSS_Node = "Node";

export const parseEnv = () => {
  Object.entries(process.env).map(([key, value]) => {
    if (key.startsWith("RSS_")) {
      console.log(`${key}=${value}`);
    }
  });
};

parseEnv();
