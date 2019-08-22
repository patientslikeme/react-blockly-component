import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BlocklyToolboxBlock from './BlocklyToolboxBlock';
import BlocklyToolboxButton from './BlocklyToolboxButton';
import BlocklyToolboxLabel from './BlocklyToolboxLabel';

class BlocklyToolboxCategory extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    custom: PropTypes.string,
    colour: PropTypes.string,
    expanded: PropTypes.string,
    categories: ImmutablePropTypes.list,
    blocks: ImmutablePropTypes.list,
    buttons: ImmutablePropTypes.list,
    labels: ImmutablePropTypes.list,
    items: ImmutablePropTypes.list,
  };

  static defaultProps = {
    name: null,
    custom: null,
    colour: null,
    expanded: null,
    categories: null,
    blocks: null,
    buttons: null,
    labels: null,
    items: null,
  };

  static renderCategory = (category, key) => {
    if (category.get('type') === 'sep') {
      return <sep key={key} />;
    } else if (category.get('type') === 'search') {
      return <search key={key} />;
    }
    return (<BlocklyToolboxCategory
      name={category.get('name')}
      custom={category.get('custom')}
      colour={category.get('colour')}
      expanded={category.get('expanded')}
      key={key}
      blocks={category.get('blocks')}
      categories={category.get('categories')}
      buttons={category.get('buttons')}
      labels={category.get('labels')}
      items={category.get('items')}
    />);
  };

  static renderItem = (item, key) => {
    let renderedItem = null;
    if (item.get('element') === 'block') {
      renderedItem = BlocklyToolboxBlock.renderBlock(item, key);
    } else if (item.get('element') === 'button') {
      renderedItem = BlocklyToolboxButton.renderButton(item, key);
    } else if (item.get('element') === 'label') {
      renderedItem = BlocklyToolboxLabel.renderLabel(item, key);
    }
    return renderedItem;
  };

  getChildren() {
    const children = {};
    if (this.props.items) {
      children.items = (this.props.items || []).map(BlocklyToolboxCategory.renderItem);
    } else {
      children.blocks = (this.props.blocks || []).map(BlocklyToolboxBlock.renderBlock);
      children.buttons = (this.props.buttons || []).map(BlocklyToolboxButton.renderButton);
      children.labels = (this.props.labels || []).map(BlocklyToolboxLabel.renderLabel);
    }
    return children;
  }

  render = () => {
    const subcategories = (this.props.categories || []).map(BlocklyToolboxCategory.renderCategory);
    const children = this.getChildren();

    return (
      <category
        name={this.props.name}
        custom={this.props.custom}
        colour={this.props.colour}
        expanded={this.props.expanded}
      >
        {children.items}
        {children.blocks}
        {children.buttons}
        {subcategories}
      </category>
    );
  }
}

export default BlocklyToolboxCategory;
