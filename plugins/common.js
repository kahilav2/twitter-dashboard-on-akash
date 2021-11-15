import constants from '~/utils/constants.js';
import { getNestedProperty } from '~/utils/common';

export default ({ app }, inject) => {
  inject('getConst', (path) => getNestedProperty(constants, path));
}