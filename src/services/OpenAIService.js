import axios from 'axios'

const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': import.meta.env.VITE_OPENAI,
  },
})

export const getOpenAIResponse = async (mood, moodTags, intensity) => {
  try {
    const prompt = `Generate a playlist title and a Spotify playlist recommendation based on
    the following mood data: Mood - ${mood}, Mood Tags - ${moodTags.join(', ')},
    Playlist Intensity - ${intensity} at least 10 songs`;
    const response = await openAI.post('/chat/completions', {
      model: "gpt-3.5-turbo-1106",
      response_format:{ "type": "json_object" },
      messages: [{
        role: "system",
        content: "You are a helpful assistant designed to output JSON that looks: " +
          "{'playlistTitle': 'GENERATED_TITLE', 'playlist': [{'song':'TITLE', 'artist':'NAME'}, ...]}.'},"
      },
      {
        role: "user",
        content: prompt
      }],
      max_tokens: 350
    })
    
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error in getting response from OpenAI:', error)
    throw error
  }
}