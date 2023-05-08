import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios, { Axios } from 'axios';

/**
 * Get Optimus API Access Token from JWT Service
 * @returns {string} Optimus API Access Token
 */
export const getOptimusAccessToken = (secretKey: string): string => {
  const jwtService = new JwtService();
  const payload = {
    clientId: 'crm-api',
  };
  return jwtService.sign(payload, {
    secret: secretKey,
  });
};

@Injectable()
export class OptimusService extends Axios {
  constructor(private readonly configService: ConfigService) {
    super({
      ...axios.defaults,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.defaults.baseURL = this.configService.get('OPTIMUS_API_URL');

    this.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${getOptimusAccessToken(
        this.configService.get('JWT_ACCESS_KEY_OPTIMUS_API'),
      )}`;
      return config;
    });
  }
}
