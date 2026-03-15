/**
 * Converts free-form text into normalized shopping list items.
 * Voice-to-text clients can forward recognized utterances into this parser.
 */
function parseShoppingList(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Shopping text is required');
  }

  const prefixStripped = text.replace(/^shopping list\s*:\s*/i, '');
  return prefixStripped
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .map((name) => ({ name, quantity: 1 }));
}

module.exports = { parseShoppingList };
