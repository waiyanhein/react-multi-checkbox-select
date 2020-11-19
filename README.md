### React Component for multi-select field with checkboxes

This package allows you to have a component for multiple select field which has checkboxes before each option. This package is very easy to use and let you customise the style whatever you want.

#### Importing the required files
- `import 'react-multi-checkbox-select/lib/multi-checkbox-select.css'`;
- `import MultiCheckboxSelect from 'react-multi-checkbox-select';`

##### Example usage

      <MultiCheckboxSelect
            name={"multi_checkboxes_select"}
            onChange={(name, isChecked, selectedValue, selectedValues) => {     
                        //name is the name of the field passed using name property
                        //isChecked decides if the checkbox clicked was selected or not
                        //selected value is the value of the checkbox that was clicked
                        //selectedValues is the array of the values of all the checked checkboxes including the new ones
                        this.setState({
                            selectedMultiCheckboxesSelectValues: selectedValues
                        })
                 }}
            onRemove={(name, valueToBeRemoved, selectedValuesAfterRemoving) => {
                        //name is the name of the field passed using name property
                        //valueToBeRemoved is the value that was just removed
                        //selectedValuesAfterRemoving is the array of values of all the selected values
                        this.setState({
                              selectedMultiCheckboxesSelectValues: selectedValuesAfterRemoving
                        })
                  }}
            values={this.state.selectedMultiCheckboxesSelectValues}
            defaultText={"Select countries"}
            options={this.state.countryList}
      />
      
#### Props/ Attributes

- `name` - "Name for the field which will be used when you submit the form to the server."
- `values` - "Currently selected array of values. Format - `[1, 2, 3]`."
- `defaultText` - "Label that will be displayed when there is no option selected yet."
- `options` - "Options for the select field. The type must be array in this format, `[ { value: 1, label: 'Myanmar' }, { value: 2, label: 'England' } ]`."


#### Callbacks
- `onChange` - "This will be triggered each time a checkbox has been ticked or un-ticked."
- `onRemove` - "This will be triggered each time a selected item has been removed."