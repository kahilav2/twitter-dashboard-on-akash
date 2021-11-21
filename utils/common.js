export function getNestedProperty(targetJson, path) {
  return path.split('.').reduce((subJson, prop) => subJson[prop], targetJson);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// snippet from https://www.codegrepper.com/code-examples/javascript/convert+number+to+k+m+b+javascript
export function nFormatter(num) {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}