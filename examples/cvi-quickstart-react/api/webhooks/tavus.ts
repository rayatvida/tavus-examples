import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = request.body;
    
    // Log the webhook data
    console.log('Received Tavus webhook:', data);

    // Handle different webhook types
    switch (data?.type) {
      case 'system.replica_joined':
        // Handle replica joining
        console.log('Replica joined conversation:', data.conversation_id);
        break;
      
      case 'system.shutdown':
        // Handle conversation shutdown
        console.log('Conversation ended:', data.conversation_id);
        break;
      
      case 'application.transcription_ready':
        // Handle transcription ready
        console.log('Transcription ready:', data.conversation_id);
        break;
      
      case 'application.recording_ready':
        // Handle recording ready
        console.log('Recording ready:', data.conversation_id);
        break;

      default:
        console.log('Unhandled webhook type:', data?.type);
    }

    return response.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return response.status(400).json({ error: 'Webhook handler failed' });
  }
} 