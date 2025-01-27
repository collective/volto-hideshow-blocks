import { toggleBlocksPreview } from 'volto-hideshow-blocks/reducers/toggleBlocksPreview';
import EditHTMLBlock from 'volto-hideshow-blocks/components/HTML/Edit';
import TableBlockEdit from 'volto-hideshow-blocks/components/Table/TableBlockEdit';

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

  // To apply further improvements, add this slateTable and HTML block configuration to make the block toolbars uniform.
  // config.blocks.blocksConfig = {
  //   ...config.blocks.blocksConfig,
  //   html: {
  //     ...config.blocks.blocksConfig.html,
  //     edit: EditHTMLBlock,
  //   },
  //   slateTable: {
  //     ...config.blocks.blocksConfig.slateTable,
  //     edit: TableBlockEdit,
  //   },
  // };

  return config;
};

export default applyConfig;
