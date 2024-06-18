import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

function Dropdown() {
    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle tag="a" className="btn btn-light">
                    date <i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Default</DropdownItem>
                    <DropdownItem>Assending</DropdownItem>
                    <DropdownItem>Dessending</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    );
}

export default Dropdown;