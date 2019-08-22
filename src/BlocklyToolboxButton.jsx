import React from 'react';
import PropTypes from 'prop-types';

class BlocklyToolboxButton extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    callbackKey: PropTypes.string,
  };

  static defaultProps = {
    text: null,
    callbackKey: null,
  };

  static renderButton = (button, key) => (<BlocklyToolboxButton
    text={button.get('text')}
    callbackKey={button.get('callbackKey')}
    key={key}
  />);


  render = () => (
    <button
      text={this.props.text}
      callbackKey={this.props.callbackKey}
    />
  )
}

export default BlocklyToolboxButton;
