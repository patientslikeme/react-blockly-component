import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BlocklyToolboxBlock from './BlocklyToolboxBlock';
import BlocklyToolboxButton from './BlocklyToolboxButton';

class BlocklyToolboxCategory extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    custom: PropTypes.string,
    colour: PropTypes.string,
    expanded: PropTypes.string,
    categories: ImmutablePropTypes.list,
    blocks: ImmutablePropTypes.list,
    buttons: ImmutablePropTypes.list,
  };

  static defaultProps = {
    name: null,
    custom: null,
    colour: null,
    expanded: null,
    categories: null,
    blocks: null,
    buttons: null,
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
    />);
  };

  render = () => {
    const subcategories = (this.props.categories || []).map(BlocklyToolboxCategory.renderCategory);
    const blocks = (this.props.blocks || []).map(BlocklyToolboxBlock.renderBlock);
    const buttons = (this.props.buttons || []).map(BlocklyToolboxButton.renderButton);

    return (
      <category
        name={this.props.name}
        custom={this.props.custom}
        colour={this.props.colour}
        expanded={this.props.expanded}
      >
        {buttons}
        {blocks}
        {subcategories}
      </category>
    );
  }
}

export default BlocklyToolboxCategory;
