'use client';

import { useState, useEffect } from 'react';
import { constellation, type ConsentRecord, type DataRequest } from '@/lib/constellation';

export function useConstellation() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already connected on mount
    setConnected(constellation.isConnected());
  }, []);

  const connect = async (address?: string) => {
    setConnecting(true);
    setError(null);
    
    try {
      const result = await constellation.connect(address);
      setConnected(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setConnected(false);
      return false;
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await constellation.disconnect();
      setConnected(false);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect';
      setError(errorMessage);
    }
  };

  const recordConsent = async (consent: Omit<ConsentRecord, 'id' | 'hash'>) => {
    if (!connected) {
      throw new Error('Not connected to Constellation Network');
    }
    
    try {
      return await constellation.recordConsent(consent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record consent';
      setError(errorMessage);
      throw err;
    }
  };

  const recordDataRequest = async (request: Omit<DataRequest, 'id' | 'hash' | 'status'>) => {
    if (!connected) {
      throw new Error('Not connected to Constellation Network');
    }
    
    try {
      return await constellation.recordDataRequest(request);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record data request';
      setError(errorMessage);
      throw err;
    }
  };

  const verifyConsent = async (hash: string) => {
    if (!connected) {
      throw new Error('Not connected to Constellation Network');
    }
    
    try {
      return await constellation.verifyConsent(hash);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify consent';
      setError(errorMessage);
      throw err;
    }
  };

  const getConsentHistory = async (address?: string) => {
    if (!connected) {
      throw new Error('Not connected to Constellation Network');
    }
    
    try {
      return await constellation.getConsentHistory(address);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch history';
      setError(errorMessage);
      return [];
    }
  };

  const generateAuditReport = async (address?: string) => {
    if (!connected) {
      throw new Error('Not connected to Constellation Network');
    }
    
    try {
      return await constellation.generateAuditReport(address);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate report';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    connected,
    connecting,
    error,
    connect,
    disconnect,
    recordConsent,
    recordDataRequest,
    verifyConsent,
    getConsentHistory,
    generateAuditReport,
  };
}
