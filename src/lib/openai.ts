import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a highly knowledgeable legal assistant with expertise in various areas of law. Provide accurate, professional, and helpful responses while maintaining ethical standards and confidentiality.'
        },
        ...messages
      ],
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      max_tokens: 2000,
    });

    return {
      success: true,
      message: completion.choices[0].message.content || 'No response generated.'
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      message: 'An error occurred while processing your request. Please try again.'
    };
  }
}