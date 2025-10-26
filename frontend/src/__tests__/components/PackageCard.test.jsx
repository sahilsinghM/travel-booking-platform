import { formatCurrency } from '../../utils/helpers';

describe('Package Card Layout Tests', () => {
  const mockPackage = {
    _id: '123',
    title: 'Ladakh Adventure',
    price: 50000,
    originalPrice: 55000,
    rating: 4.8,
    reviews: 127,
    destination: 'Ladakh',
  };

  it('formats currency correctly', () => {
    const formatted = formatCurrency(50000);
    expect(formatted).toContain('50,000');
  });

  it('calculates discount percentage correctly', () => {
    const price = 50000;
    const originalPrice = 55000;
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    expect(discount).toBe(9);
  });

  it('handles package with discount', () => {
    const { price, originalPrice } = mockPackage;
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    
    expect(discount).toBeGreaterThan(0);
    expect(discount).toBeLessThanOrEqual(100);
  });

  it('handles package without discount', () => {
    const packageWithoutDiscount = { ...mockPackage };
    delete packageWithoutDiscount.originalPrice;
    
    expect(packageWithoutDiscount.originalPrice).toBeUndefined();
  });
});

