export function getNestedProperty(targetJson, path) {
  return path.split('.').reduce((subJson, prop) => subJson[prop], targetJson);
}