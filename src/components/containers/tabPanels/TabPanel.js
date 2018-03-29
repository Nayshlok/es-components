import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from '../../theme/viaTheme';
import TabList from './TabList';
import Tab from './Tab';

const TabWrapper = styled('div')`
  display: flex;
  justify-content: center;

  @media (min-width: 899px) {
    justify-content: flex-start;
  }
`;

const TabFormatter = styled('div')`
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 899px) {
    flex-direction: row;
  }
`;

const TabContent = styled('div')`
  border-top: 1px solid #ddd;

  .animated {
    animation: fadein 1s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentContent: '',
      animationToggle: true
    };
    this.tabChanged = this.tabChanged.bind(this);
  }

  componentWillMount() {
    if (this.state.value === '') {
      const child = this.props.children[0];
      const selectedChild = this.getFirstValueChild(child);
      this.tabChanged(selectedChild.props.name, selectedChild.props.children);
    }
  }

  componentDidUpdate() {
    if (this.content) {
      if (this.content.classList.contains('animated')) {
        clearTimeout(this.innerTimeout);
        clearTimeout(this.addTimeout);
        this.content.classList.remove('animated');
        this.addTimeout = setTimeout(
          x => {
            x.content.classList.add('animated');
          },
          5,
          this
        );
      } else {
        this.content.classList.add('animated');
      }
      this.innerTimeout = this.setClassRemoveTimeout(this);
    }
  }

  setClassRemoveTimeout(context) {
    return setTimeout(
      x => {
        x.content.classList.remove('animated');
      },
      1000,
      context
    );
  }

  getFirstValueChild(child) {
    if (Array.isArray(child.props.children)) {
      return child.props.children.filter(
        innerChild => innerChild.props.optionText
      )[0];
    }
    return child;
  }

  listIsSelected(list) {
    if (Array.isArray(list.props.children)) {
      return (
        list.props.children.filter(child => {
          if (child.props.optionText) {
            return (
              child.props.optionText.replace(/\s/g, '') === this.state.value
            );
          }
          return false;
        }).length > 0
      );
    }
    return false;
  }

  tabChanged(name, child) {
    if (this.state.value !== name) {
      const animatedChild = React.cloneElement(child, {
        ref: element => (this.content = element)
      });
      this.setState({ value: name, currentContent: animatedChild });
    }
  }

  render() {
    const { theme, children } = this.props;
    const elements = React.Children.map(children, (child, i) => {
      const isSelected =
        child.props.name === this.state.value ||
        this.listIsSelected(child) ||
        (i === 0 && this.state.value === '');
      return React.cloneElement(child, {
        key: child.props.name,
        selected: isSelected,
        action: this.tabChanged,
        selectedName: this.state.value,
        theme
      });
    });

    return (
      <ThemeProvider theme={theme}>
        <div>
          <TabWrapper>
            <TabFormatter>{elements}</TabFormatter>
          </TabWrapper>
          <TabContent>{this.state.currentContent}</TabContent>
        </div>
      </ThemeProvider>
    );
  }
}

TabPanel.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node
};

TabPanel.defaultProps = {
  theme: viaTheme
};

TabPanel.TabList = TabList;
TabPanel.Tab = Tab;

export default TabPanel;
