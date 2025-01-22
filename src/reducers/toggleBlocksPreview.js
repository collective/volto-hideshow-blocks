import { TOGGLE_BLOCKS_PREVIEW } from 'volto-hideshow-blocks/actions/toggleBlocksPreview';

export const toggleBlocksPreview = (state = false, action = {}) => {
  switch (action.type) {
    case TOGGLE_BLOCKS_PREVIEW:
      return action.toggle;
    default:
      break;
  }
  return state;
};
