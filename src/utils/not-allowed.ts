import { CustomRequest } from '../types/custom-request';
import { Response } from 'express';

export const methodNotAllowed = async (
  _: CustomRequest,
  response: Response
): Promise<void> => {
  response.status(405).send();
};
