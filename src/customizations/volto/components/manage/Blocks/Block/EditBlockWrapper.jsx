/**
 * CUSTOMIZATIONS:
 * - added configuration of experimental.hideShowBlocks to display eye button
 */

import React from 'react';
import { Icon } from '@plone/volto/components';
import {
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
} from '@plone/volto/helpers';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { BlockChooserButton } from '@plone/volto/components';

import trashSVG from '@plone/volto/icons/delete.svg';
import hideSVG from '@plone/volto/icons/hide.svg';
import showSVG from '@plone/volto/icons/show.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
  show: {
    id: 'show',
    defaultMessage: 'show',
  },
  hide: {
    id: 'hide',
    defaultMessage: 'hide',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { intl, blockProps, draginfo, children } = props;
  const {
    allowedBlocks,
    block,
    blocksConfig,
    selected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    data,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
  } = blockProps;

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const classNames = buildStyleClassNamesFromData(data.styles);
  const style = buildStyleObjectFromData(data.styles);

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    ...draginfo.draggableProps,
    style: { ...style, ...draginfo.draggableProps.style },
  };

  return (
    <div
      ref={draginfo.innerRef}
      {...styleMergedWithDragProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(`block-editor-${data['@type']}`, classNames, {
        [data.align]: data.align,
      })}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...draginfo.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>
          {children}
          {selected && !required && editable && (
            <>
              {config.experimental.hideShowBlocks.enabled && (
                <Button
                  icon
                  basic
                  color={!data.hidden ? 'grey' : 'red'}
                  onClick={() =>
                    onChangeBlock(block, {
                      ...data,
                      hidden: !data.hidden,
                    })
                  }
                  className="hide-show-button"
                  aria-label={intl.formatMessage(
                    !data.hidden ? messages.hide : messages.show,
                  )}
                >
                  <Icon name={!data.hidden ? hideSVG : showSVG} size="18px" />
                </Button>
              )}
              <Button
                icon
                basic
                onClick={() => onDeleteBlock(block, true)}
                className="delete-button"
                aria-label={intl.formatMessage(messages.delete)}
              >
                <Icon name={trashSVG} size="18px" />
              </Button>
            </>
          )}
          {config.experimental.addBlockButton.enabled && showBlockChooser && (
            <BlockChooserButton
              data={data}
              block={block}
              onInsertBlock={(id, value) => {
                if (blockHasValue(data)) {
                  onSelectBlock(onInsertBlock(id, value));
                } else {
                  onChangeBlock(id, value);
                }
              }}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
              blocksConfig={blocksConfig}
              size="24px"
              properties={properties}
              navRoot={navRoot}
              contentType={contentType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
