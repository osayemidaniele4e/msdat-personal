import axiosInstance from '@/plugins/axios';
import axios from 'axios';

const corsProxyUrl = 'https://corsproxy.io/?';

// temporal cors proxy to bypass cors error
const GPTinstance = axios.create({
  baseURL: corsProxyUrl + encodeURIComponent(process.env.VUE_APP_API_GPT_URL),
});

class PolicyService {
 // eslint-disable-next-line consistent-return
 static config = {
   temperature: 1,
   max_new_tokens: 1500,
   min_new_tokens: -1,
 }

 // eslint-disable-next-line consistent-return
 getDataByQuery = async (indicatorId, dataSourceId, period, location) => {
   try {
     const { data } = await axiosInstance.get(
       `data/?indicator=${indicatorId}&datasource=${dataSourceId}&period=${period}&location=${location}`,
     );
     return data.results;
   } catch (err) {
     console.log(err);
     return (err);
   }
 };

 // eslint-disable-next-line consistent-return
 generateResponse = async (healthIndicator, location, value) => {
   try {
     const systemPrompt = 'You are MSDAT policy simulator an AI powered system designed to assist Nigerian public health policymakers in developing effective and targeted interventions. You have access to a vast database of health indicators, demographic data, and socioeconomic factors, along with a location-specific interface to pinpoint areas of concern. given the Input: output  Health Indicator and location Propose 2   potential interventions to address the identified causes, tailoring them to the specific context of the location. outline the Advantages and disadvantages of these interventions in form of JSON key-value pairs';
     const prompt = `generate policies based on the Indicator: ${healthIndicator} (${value}%) in ${location}`;
     const { data } = await GPTinstance.post('e4e/ask/', {
       text: prompt,
       ...PolicyService.config,
       system_prompt: systemPrompt,
     });

     return (data);
   } catch (err) {
     console.log(err);
     return { response: 'An error Occured' };
   }
 }

 generateReply = async (conversationHistory, question) => {
   try {
     const systemPrompt = 'You are MSDAT policy simulator, an AI-powered system designed to assist Nigerian public health policymakers in developing effective and targeted interventions. You have access to a vast database of health indicators, demographic data, and socioeconomic factors, along with a location-specific interface to pinpoint areas of concern. Given the Input: output Health Indicator and location, propose 2 potential interventions to address the identified causes, tailoring them to the specific context of the location. Outline the Advantages and disadvantages of these interventions in the form of JSON key-value pairs';

     const formattedMessages = conversationHistory
       .map((item) => (item.user ? `My Reply: ${item.message}` : `Generated Response: ${item.message}`))
       .join('\n');
     console.log('formatted', formattedMessages);

     const conversationPrompt = formattedMessages ? `Conversation History:\n${formattedMessages}` : '';
     const prompt = `You have generated a policy based on my initial prompt. This is the conversation history:\n${conversationPrompt}\nThis is my follow-up question: ${question}`;

     const { data } = await GPTinstance.post('e4e/ask/', {
       text: `${prompt}\n${conversationPrompt}`,
       ...PolicyService.config,
       system_prompt: systemPrompt,
     });

     return data;
   } catch (err) {
     console.error(err);
     return { response: 'An error Occured' };
   }
 };

 createSimulatedResponse = (response) => ({
   user: false,
   message: response,
 })

 createLoadingResponse = () => ({
   user: false,
   message: 'Analyzing...',
 })

 createUserResponse = (response) => ({
   user: true,
   message: response,
 })

 createErrorResponse = (response) => ({
   message: response,
   error: true,
 })
}

export default PolicyService;
