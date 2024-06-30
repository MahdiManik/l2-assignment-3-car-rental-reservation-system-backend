/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorSources,
  TGenericErrorResponse,
} from '../config/interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];
  console.log(`extractedMessage: ${extractedMessage}`);

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
