import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../../controls/buttons/ToggleButton';
import MenuPanel from './MenuPanel';
import MenuSection from './MenuSection';

class Menu extends React.Component {
  static childContextTypes = {
    inline: PropTypes.bool
  };

  state = {
    isMenuOpen: false
  };

  getChildContext() {
    return { inline: this.props.inline };
  }

  toggleMenu = () => {
    this.setState(previousState => ({ isMenuOpen: !previousState.isMenuOpen }));
  };

  render() {
    const { children, buttonContent, className } = this.props;

    return (
      <div className={className}>
        <ToggleButton
          handleOnClick={this.toggleMenu}
          isPressed={this.state.isMenuOpen}
        >
          {buttonContent}
        </ToggleButton>
        <MenuPanel
          isOpen={this.state.isMenuOpen}
          closeFunction={this.toggleMenu}
        >
          {children}
        </MenuPanel>
      </div>
    );
  }
}

Menu.MenuSection = MenuSection;

Menu.propTypes = {
  children: PropTypes.any.isRequired,
  buttonContent: PropTypes.any.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool
};

export default Menu;