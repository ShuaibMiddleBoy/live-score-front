import axios from 'axios';

const OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key

async function paraphraseContent(text) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `Paraphrase the following text: ${text}`,
        max_tokens: 50, // Adjust the max_tokens as needed
        n: 1, // Number of responses to generate
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      return text; // If paraphrasing fails, return the original text
    }
  } catch (error) {
    console.error('Error in paraphraseContent:', error);
    return text; // Return the original text in case of an error
  }
}

export { paraphraseContent };