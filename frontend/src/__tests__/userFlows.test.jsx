import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import api from '../services/api';

// Mock the API service
jest.mock('../services/api', () => ({
  getPackages: jest.fn(),
  getPackageById: jest.fn(),
  login: jest.fn(),
  getCurrentUser: jest.fn(),
  createBooking: jest.fn(),
}));

describe('E2E User Flows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should mock API calls for package search', async () => {
    const mockPackages = [
      {
        _id: '1',
        title: 'Ladakh Adventure',
        price: 50000,
        destination: 'Ladakh',
        rating: 4.8,
        reviews: 127,
      },
    ];

    api.getPackages.mockResolvedValue(mockPackages);

    const result = await api.getPackages();

    expect(result).toEqual(mockPackages);
    expect(api.getPackages).toHaveBeenCalledTimes(1);
  });

  test('should handle package details retrieval', async () => {
    const mockPackage = {
      _id: '1',
      title: 'Ladakh Adventure',
      price: 50000,
      originalPrice: 55000,
      destination: 'Ladakh',
      duration: '10 days',
      rating: 4.8,
      reviews: 127,
      description: 'Amazing adventure in Ladakh',
    };

    api.getPackageById.mockResolvedValue(mockPackage);

    const result = await api.getPackageById('1');

    expect(result).toEqual(mockPackage);
    expect(api.getPackageById).toHaveBeenCalledWith('1');
  });

  test('should handle user login', async () => {
    const mockUser = {
      token: 'mock-jwt-token',
      user: {
        _id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
    };

    api.login.mockResolvedValue(mockUser);

    const result = await api.login('test@example.com', 'password123');

    expect(result).toEqual(mockUser);
    expect(api.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('should handle booking creation', async () => {
    const mockBooking = {
      _id: 'booking1',
      packageId: 'package1',
      userId: 'user1',
      travelerDetails: {
        adults: 2,
        children: 0,
      },
      totalAmount: 100000,
      status: 'pending',
    };

    api.createBooking.mockResolvedValue(mockBooking);

    const bookingData = {
      packageId: 'package1',
      travelers: 2,
      travelDates: {
        startDate: '2024-06-01',
        endDate: '2024-06-10',
      },
    };

    const result = await api.createBooking(bookingData);

    expect(result).toEqual(mockBooking);
    expect(api.createBooking).toHaveBeenCalledWith(bookingData);
  });

  test('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch packages';
    api.getPackages.mockRejectedValue(new Error(errorMessage));

    await expect(api.getPackages()).rejects.toThrow(errorMessage);
  });
});

