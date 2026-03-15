/**
 * Placeholder AI chat service.
 * Integrate an LLM provider (OpenAI, Azure OpenAI, etc.) in this module.
 */
async function respondToMealIdeaPrompt({ message, userContext = {} }) {
  const dietaryNote = (userContext.dietaryRestrictions || []).join(', ') || 'balanced';

  return {
    reply: `Great idea! Based on your ${dietaryNote} preferences, consider a high-protein bowl with legumes, leafy greens, and whole grains.`,
    followUps: ['Do you want this under 30 minutes?', 'Any ingredients to avoid?']
  };
}

module.exports = { respondToMealIdeaPrompt };
