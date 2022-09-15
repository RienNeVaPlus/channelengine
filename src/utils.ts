import fetch from 'node-fetch'

export { fetch }

export function sleep(sec: number = 0.01) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}

export function toQueryString(obj?: any, prefix: string | false = '?'){
  if(!obj) return '';
  let r = Object.keys(obj)
    .map(key => obj[key] && encodeURI(key) + '=' + encodeURI(obj[key]))
    .filter(obj => obj)
    .join('&');
  return r && prefix ? prefix + r : r || '';
}
