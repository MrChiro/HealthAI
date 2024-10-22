import axios from 'axios';

const BOTPRESS_URL = process.env.REACT_APP_BOTPRESS_URL;

export const sendMessageToBotpress = async (message) => {
  try {
    const response = await axios.post(`${BOTPRESS_URL}/api/v1/bots/healthcare-bot/converse/`, {
      type: 'text',
      text: message
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to Botpress:', error);
    throw error;
  }
};