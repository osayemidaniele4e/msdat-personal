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
     return (err);
   }
 }

 createSimulatedResponse = (response) => ({
   user: false,
   message: response,
 })

 createUserResponse = (response) => ({
   user: true,
   message: response,
 })
}

export default PolicyService;
