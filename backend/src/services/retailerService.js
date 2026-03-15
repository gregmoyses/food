/**
 * Adapter-driven integration layer for grocers.
 * Replace mocked API methods with official retailer SDK/API implementations.
 */
const adapters = {
  tesco: {
    async addToBasket(items) {
      return { retailer: 'tesco', itemCount: items.length, basketId: 'tesco-demo-basket' };
    },
    async purchase(basketId) {
      return { retailer: 'tesco', basketId, status: 'purchased' };
    }
  },
  walmart: {
    async addToBasket(items) {
      return { retailer: 'walmart', itemCount: items.length, basketId: 'walmart-demo-basket' };
    },
    async purchase(basketId) {
      return { retailer: 'walmart', basketId, status: 'purchased' };
    }
  }
};

function getAdapter(retailer) {
  const adapter = adapters[(retailer || '').toLowerCase()];
  if (!adapter) throw new Error(`Unsupported retailer: ${retailer}`);
  return adapter;
}

module.exports = { getAdapter };
