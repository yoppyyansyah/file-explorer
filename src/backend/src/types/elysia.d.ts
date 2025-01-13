
import { Context } from 'elysia';

export interface ElysiaRequest extends Context {
  body: any; 
}

export interface ElysiaResponse {
  status(code: number): ElysiaResponse;
  json(data: any): ElysiaResponse;
}
