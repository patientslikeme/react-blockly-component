import React from 'react';
import ReactDOM from 'react-dom';

var debounce = function(func, wait) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			func.apply(context, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

var BlocklyWorkspace = React.createClass({
  propTypes: {
    initialXml: React.PropTypes.string,
    workspaceConfiguration: React.PropTypes.object,
    wrapperDivClassName: React.PropTypes.string,
    codeDidChange: React.PropTypes.func,
    xmlDidChange: React.PropTypes.func,
    languageToGenerate: React.PropTypes.oneOf(['PHP', 'JavaScript', 'Xml']),
    toolboxMode: React.PropTypes.oneOf(['CATEGORIES', 'BLOCKS'])
  },

  getInitialState: function() {
    return {
      workspace: null,
      code: this.props.initialXml,
      xml: this.props.initialXml,
    };
  },

  componentDidMount: function() {

    // TODO figure out how to use setState here without breaking the toolbox when switching tabs
    this.state.workspace = Blockly.inject(
      this.refs.editorDiv,
      Object.assign({}, (this.props.workspaceConfiguration || {}), {
        toolbox: ReactDOM.findDOMNode(this.refs.dummyToolbox)
      })
    );

    if (this.state.code) {
      this.importFromXml(this.state.code);
      if (this.props.codeDidChange) {
        this.props.codeDidChange(this.state.code);
      }
    }
    if (this.state.xml) {
      this.importFromXml(this.state.xml);
      if (this.props.xmlDidChange) {
        this.props.xmlDidChange(this.state.xml);
      }
    }



    this.state.workspace.addChangeListener(debounce(function() {

      var newCode = Blockly[this.props.languageToGenerate].workspaceToCode(this.state.workspace);
      if (newCode == this.state.code) {
        return;
      }

      this.setState({code: newCode}, function() {
        if (this.props.codeDidChange) {
          this.props.codeDidChange(this.state.code);
        }
      }.bind(this));


      var newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.state.workspace));

      if(newXml == this.state.xml){
        return;
      }

      this.setState({xml: newXml}, function() {
        if (this.props.xmlDidChange) {
          this.props.xmlDidChange(this.state.xml);
        }
      }.bind(this));
    }.bind(this), 200));
  },

  importFromXml: function(code) {
    Blockly.Xml.domToWorkspace(this.state.workspace, Blockly.Xml.textToDom(code));
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.initialXml != newProps.initialXml) {
      this.setState({code: newProps.initialXml,xml: newProps.initialXml});
    }
  },

  componentWillUnmount: function() {
    if (this.state.workspace) {
      this.state.workspace.dispose();
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  toolboxDidUpdate: function(toolboxNode) {
    if (toolboxNode && this.state.workspace) {
      this.state.workspace.updateToolbox(toolboxNode);
    }
  },

  resize: function() {
    Blockly.svgResize(this.state.workspace);
  },

  render: function() {
    // We have to fool Blockly into setting up a toolbox with categories initially;
    // otherwise it will refuse to do so after we inject the real categories into it.
    var dummyToolboxContent;
    if (this.props.toolboxMode === "CATEGORIES") {
      dummyToolboxContent = (
        <category name="Dummy toolbox" />
      );
    }

    return (
      <div className={this.props.wrapperDivClassName}>
        <code style={{display: "none"}} ref="dummyToolbox">
          {dummyToolboxContent}
        </code>
        <div ref="editorDiv" className={this.props.wrapperDivClassName} />
      </div>
    );
  }
});

export default BlocklyWorkspace;