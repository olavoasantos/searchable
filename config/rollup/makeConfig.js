import config from './config';

export default (customConfig) => {
  return {
    ...config,
    ...customConfig,
  }
};
