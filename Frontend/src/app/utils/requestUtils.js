import * as serviceEndpoints from '../../../service_endpoints.json';

export function getEnv() {
  const hostname = window.location.hostname;
  let env = '';
  console.log(hostname);
  if (hostname.indexOf('localhost') === 0) {
    if (process.env.NODE_ENV === 'local') {
      env = 'local';
    } else {
      env = 'dev';
    }
  } else {
    env = 'prod';
  }
  return 'local';
  return env;
}

export function getURL(service) {
  return serviceEndpoints[service][getEnv()];
}

export function getBaseURL() {
  return getURL('baseUrl');
}

