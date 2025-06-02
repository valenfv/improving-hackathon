// import { Activity, ActivityTypes, BotFrameworkAdapter, TurnContext, WebRequest, WebResponse } from 'botbuilder';
// import OpenAI from 'openai';

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Initialize Bot Framework Adapter
// const adapter = new BotFrameworkAdapter({
//   appId: process.env.MICROSOFT_APP_ID,
//   appPassword: process.env.MICROSOFT_APP_PASSWORD,
// });

// // Store conversation history
// const conversationHistory = new Map<string, { role: 'system' | 'user' | 'assistant', content: string }[]>();

// // Error handler
// adapter.onTurnError = async (context, error) => {
//   console.error(`\n [onTurnError] unhandled error: ${error}`);
//   await context.sendActivity('The bot encountered an error or bug.');
// };

// async function handleMessage(context: TurnContext) {
//   const conversationId = context.activity.conversation.id;
  
//   // Get or initialize conversation history
//   let messages = conversationHistory.get(conversationId) || [
//     {
//       role: 'system',
//       content: 'You are a helpful assistant.'
//     }
//   ];

//   // Add user message to history
//   messages.push({
//     role: 'user',
//     content: context.activity.text || ''
//   });

//   try {
//     // Get AI response
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages,
//       temperature: 0.7,
//     });

//     const aiResponse = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

//     // Add AI response to history
//     messages.push({
//       role: 'assistant',
//       content: aiResponse
//     });

//     // Update conversation history
//     conversationHistory.set(conversationId, messages);

//     // Send response back to Teams
//     await context.sendActivity(aiResponse);
//   } catch (error) {
//     console.error('Error:', error);
//     await context.sendActivity('Sorry, I encountered an error while processing your request.');
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
    
//     // Create activity from the request body
//     const activity: Activity = body;
    
//     if (activity.type === ActivityTypes.Message) {
//       // Convert Headers to a plain object
//       const headers: { [key: string]: string } = {};
//       req.headers.forEach((value, key) => {
//         headers[key] = value;
//       });

//       await new Promise((resolve, reject) => {
//         // Create a proper WebRequest object
//         const webRequest: WebRequest = {
//           headers,
//           body,
//           method: req.method
//         };

//         // Create a WebResponse object
//         const webResponse: WebResponse = {
//           status: (code: number) => code,
//           send: () => Promise.resolve(),
//           end: () => {}
//         };

//         adapter.processActivity(webRequest, webResponse, async (context: TurnContext) => {
//           await handleMessage(context);
//           resolve(true);
//         }).catch(reject);
//       });
//     }

//     return new Response('OK', { status: 200 });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// } 