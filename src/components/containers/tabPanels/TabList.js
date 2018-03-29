import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../theme/defaultTheme';
import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */
const StyledDropdown = styled.select`
  display: flex;
  background-color: ${props => props.theme.colors.white};
  border: ${props =>
    props.selected ? `1px solid ${props.theme.colors.gray}` : '0px'};
  border-bottom: ${props => (props.selected ? '0px' : '1px')};
  border-radius: 2px 2px 0 0;
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.primary};
  display: inline-block;
  font-size: 18px;
  margin: ${props => (props.selected ? '0px 0px -1px 2px' : '0px')};
  padding: 10px 15px;
  width: auto;
  flex-grow: 1;
`;
/* eslint-enable */

function TabList({
  children,
  name,
  selected,
  selectedName,
  action,
  theme,
  ...props
}) {
  const update = event => {
    const value = event.target.value;
    const filteredChildren = children.filter(
      child => child.props.optionText.replace(/\s/g, '') === value
    );
    action(value, filteredChildren[0].props.children);
  };
  const values = [];
  const selectOptions = React.Children.map(children, (opt, i) => {
    const optionKey = opt.props.optionText.replace(/\s/g, '');
    values.push(optionKey);
    return (
      <option key={optionKey} value={optionKey}>
        {opt.props.optionText}
      </option>
    );
  });
  const Title = <option disabled>{name}</option>;
  const finalSelection = values.indexOf(selectedName) < 0 ? name : selectedName;
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <StyledDropdown
      value={finalSelection}
      onChange={update}
      selected={selected}
      theme={theme}
      {...props}
    >
      {Title}
      {selectOptions}
    </StyledDropdown>
  );
  /* eslint-enable */
}

TabList.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  action: PropTypes.func,
  theme: PropTypes.object,
  children: PropTypes.node,
  selectedName: PropTypes.string
};

TabList.defaultProps = {
  theme: defaultTheme
};

export default TabList;
