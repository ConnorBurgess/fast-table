import React from 'react';
import NewSectionForm from './NewSectionForm';
import SectionList from './SectionList';
import SectionDetail from './SectionDetail';
import UpdateSectionForm from './UpdateSectionForm'
class SectionControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      seatingFormVisible: false,
      updateFormVisible: false,
      sectionList: [],
      selectedSection: null
    };
  }

  handleClick = () => {
    if (this.state.selectedSection != null) {
      this.setState({
        formVisible: false,
        selectedSection: null
      });
    } else {
      this.setState(prevState => ({
        formVisible: !prevState.formVisible
      }));
    }
  }

  handleAddingNewSectionToList = (newSection) => {
    const newSectionList = this.state.sectionList.concat(newSection);
    this.setState({
      sectionList: newSectionList,
      formVisible: false
    });
  }

  handleUpdatingSection = (updatedSection) => {
    const newSectionList = this.state.sectionList.filter(section => section.id !== updatedSection.id).concat(updatedSection);
    this.setState({
      sectionList: newSectionList,
      updateFormVisible: false,
      selectedSection: null
    })
  }

  handleSeatingTable = (updatedSection) => {
    if (updatedSection.tableCount > 0) {
      updatedSection.tableCount--;
    }
    const newSectionList = this.state.sectionList.filter(section => section.id !== updatedSection.id).concat(updatedSection);
    this.setState({
      sectionList: newSectionList,
    });
  }

  handleReleasingTable = (updatedSection) => {
    if (updatedSection.tableCount < updatedSection.originalCount) {
      updatedSection.tableCount++;
    }
    const newSectionList = this.state.sectionList.filter(section => section.id !== updatedSection.id).concat(updatedSection);
    this.setState({
      sectionList: newSectionList
    })
  }
  handleChangingSelectedSection = (id) => {
    const selectedSection = this.state.sectionList.filter(section => section.id === id)[0];
    this.setState({ selectedSection: selectedSection });
  }

  handleDisplayingUpdateForm = (id) => {
    const selectedSection = this.state.sectionList.filter(section => section.id === id)[0];
    this.setState({
      updateFormVisible: true,
      selectedSection: selectedSection
    })
  }

  handleDeletingSection = (id) => {
    const newSectionList = this.state.sectionList.filter(section => section.id !== id);
    this.setState({
      sectionList: newSectionList,
      selectedSection: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.updateFormVisible) {
      currentlyVisibleState = <UpdateSectionForm section={this.state.selectedSection.id} onSectionUpdate={this.handleUpdatingSection} />
      buttonText = "Return to section List"
    } else if (this.state.selectedSection != null) {
      currentlyVisibleState = <SectionDetail section={this.state.selectedSection}
        onClickingSeat={this.handleSeatingTable}
        onClickingDelete={this.handleDeletingSection}
        onClickingRelease={this.handleReleasingTable} />
      buttonText = "Return to Section List";
    } else if (this.state.formVisible) {
      currentlyVisibleState = <NewSectionForm onNewSectionCreation={this.handleAddingNewSectionToList} />
      buttonText = "Return to Section List";
    } else {
      currentlyVisibleState = <SectionList
        sectionList={this.state.sectionList}
        onSectionSelection={this.handleChangingSelectedSection}
        onUpdateSection={this.handleDisplayingUpdateForm} />
      buttonText = "Add a new server section";
    }
    return (
      <>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    )
  }
}

export default SectionControl;