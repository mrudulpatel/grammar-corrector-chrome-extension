import { OpenAIApi, Configuration } from "openai";

const config = new Configuration({
  apiKey: "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",
});

delete config.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(config);

export default openai;