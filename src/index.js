import { defineMessages, useIntl } from 'react-intl';
import { toggleBlocksPreview } from 'volto-hideshow-blocks/reducers/toggleBlocksPreview';

import './theme/styles.less';

const applyConfig = (config) => {

  config.experimental = {
    ...config.experimental,
    hideShowBlocks: {
      enabled: true,
    },
  };

  config.addonReducers = {
    ...config.addonReducers,
    toggleBlocksPreview,
  };

  return config;
};

export default applyConfig;
