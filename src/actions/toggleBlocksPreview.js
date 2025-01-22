export const TOGGLE_BLOCKS_PREVIEW = 'TOGGLE_BLOCKS_PREVIEW';

/**
 * Function .
 * @function setToggleBlocksPreview
 * @param {value} value boolean
 * @returns {Object} toggle action.
 */
export function setToggleBlocksPreview(value) {
  console.log('qui entra');
  return {
    type: TOGGLE_BLOCKS_PREVIEW,
    toggle: value,
  };
}
