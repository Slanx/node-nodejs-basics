export const parseEnv = (parser) => {
  for (const key in process.env) {
    if (key.includes(parser)) {
      const value = process.env[key];
      console.log(`${key}=${value}`);
    }
  }
};

parseEnv('RSS_');
