  
import React from 'react';
import PropTypes from 'prop-types';

function Section(props) {
  const {whenSectionClicked, whenUpdateSectionClicked, tableCount, name, id} = props;
  console.log(whenUpdateSectionClicked)
  return (
    <>
      <div onClick = {() => whenSectionClicked(id)}>
        <h3>{name} - {tableCount} tables remaining</h3>
        <hr/>
      </div>
      <button onClick={() => whenUpdateSectionClicked(id)}>Update Section</button>
    </>
  );
}

Section.propTypes = {
  name: PropTypes.string.isRequired,
  tableCount: PropTypes.string.isRequired,
  orginalCount: PropTypes.string,
  id: PropTypes.string,
  whenSectionClicked: PropTypes.func,
  whenUpdateSectionClicked: PropTypes.func
};

export default Section;