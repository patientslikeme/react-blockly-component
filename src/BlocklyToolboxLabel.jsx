import React from 'react';
import PropTypes from 'prop-types';

class BlocklyToolboxLabel extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: null,
  };

  static renderLabel = (button, key) => (<BlocklyToolboxLabel
    text={button.get('text')}
    key={key}
  />);


  render = () => (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      text={this.props.text}
    />
  )
}

export default BlocklyToolboxLabel;
