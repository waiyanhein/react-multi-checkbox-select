import React from 'react';
import PropTypes from 'prop-types';

class MultiCheckboxSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            selectedValues: [ ],
        }
        this.refSelect = React.createRef();
    }

    componentDidMount() {
        if (this.props.values && this.props.values.length > 0) {
            //@ set the default selected values
            this.setState({
                selectedValues: this.props.values
            })
        }

        document.addEventListener("mousedown", this.handleClickOutside)
    }

    handleClickOutside = (event) => {
        if (this.refSelect && this.refSelect.current && !this.refSelect.current.contains(event.target)) {
            this.setState({
                expanded: false
            })

            this.props.onClose();
        }
    }

    handleDefaultTextClick = (e) => {
        let expanded = ! this.state.expanded;
        this.setState({
            expanded: expanded
        })

        if (! expanded) {
            this.props.onClose();
        } else {
            this.props.onOpen();
        }
    }

    handleOptionItemClick = (item) => {
        let isChecked = false;
        let tempSelectedValues = [ ...this.state.selectedValues ];
        //remove the item from selected values if it is already in there. Otherwise add it
        if (this.state.selectedValues.filter(selectedValue => item.value == selectedValue).length > 0) {
            //item already in the selectedvalues
            tempSelectedValues = this.state.selectedValues.filter(selectedValue => selectedValue != item.value);
            this.setState({
                selectedValues: tempSelectedValues,
            })

            isChecked = false;
        } else {
            tempSelectedValues.push(item.value);

            this.setState({
                selectedValues: tempSelectedValues
            })

            isChecked = true;
        }

        this.props.onChange(this.props.name, isChecked, item.value, tempSelectedValues);
    }

    isItemSelected = (item) => {
        return this.state.selectedValues.filter(selectedValue => selectedValue == item.value).length > 0;
    }

    renderHiddenFields = () => {
        if (this.state.selectedValues.length < 1) {
            return null;
        }

        return this.state.selectedValues.map((selectedValue, index) => {
            return (
                <input key={index} name={`${this.props.name}[${index}]`} type={"hidden"} value={selectedValue} />
            )
        })
    }

    renderOptions = () => {
        if (this.props.options.length < 1) {
            return null;
        }

        return (
            <div ref id={this.props.id} className={`multi-checkboxes-select-options ${this.props.className}`}>
                {this.renderHiddenFields()}
                <div className={"multi-checkboxes-select-options-wrapper"} style={{display: this.state.expanded? "block": "none"}}>
                    {
                        this.props.options.map(item => {
                            return (
                                <div onClick={(e) => { this.handleOptionItemClick(item) }} key={item.value} className={"multi-checkboxes-select-option-item-wrapper"}>
                                    <input onChange={() => { }} checked={this.isItemSelected(item)} type={"checkbox"} className={"multi-checkboxes-select-option-item-checkbox"} />
                                    {" "}
                                    <span className={"multi-checkboxes-select-option-item-text"}>{item.label}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    renderDefaultText = () => {
        if (this.state.selectedValues.length < 1) {
            return (
                <div className={"multi-checkboxes-select-default-label"}>
                    <span className={"multi-checkboxes-select-label-text"}>{this.props.defaultText}</span>
                    <span className={"multi-checkboxes-select-label-icon"}>{this.state.expanded?"▲": "▼"}</span>
                </div>
            )
        }

        return (
            <div className={"multi-checkboxes-select-selected-labels-wrapper"}>
                {this.state.selectedValues.map(selectedValue => {
                    // get the item back from the value
                    let selectedItem = this.props.options.filter(item => item.value == selectedValue)[0];

                    return (
                        <span
                            key={selectedValue}
                            className={"multi-checkboxes-select-selected-item-label"}>
                            {selectedItem.label} <span onClick={(e) => {
                            e.stopPropagation();
                            this.setState({
                                selectedValues: this.state.selectedValues.filter(item => item != selectedValue)
                            })
                            this.props.onRemove(this.props.name, selectedValue, this.state.selectedValues.filter(item => item != selectedValue));
                        }} className={'multi-checkboxes-remove-icon'}>&times;</span>
                        </span>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div ref={this.refSelect} className={"multi-checkboxes-select"}>
                <div className={"multi-checkboxes-select-wrapper"}>
                    <div onClick={(e) => {this.handleDefaultTextClick(e)}} className={"multi-checkboxes-select-default-text"}>
                        {this.renderDefaultText()}
                    </div>
                    {this.renderOptions()}
                </div>
            </div>
        )
    }
}

MultiCheckboxSelect.defaultProps = {
    id: "",
    name: "",
    options: [ ],
    values: [ ],
    defaultText: "",
    onChange: (name, isChecked, selectedValue, selectedValues) => {

    },
    onRemove: (name, valueToBeRemoved, selectedValuesAfterRemoving) => {

    },
    onOpen: () => {

    },
    onClose: () => {

    }
}

MultiCheckboxSelect.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array,
    values: PropTypes.array,
    defaultText: PropTypes.string,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
}

export default MultiCheckboxSelect;
