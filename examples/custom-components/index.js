import React from "react";
import MUIDataTable from "../../src/";
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableFilterList from '../../src/components/TableFilterList';

const CustomChip = (props) => {
  const { label, onDelete, columnNames, className, index } = props;
  return (<Chip
      className={className}
      variant="outlined"
      color={columnNames[index].name === 'Company' ? 'secondary' : 'primary'}
      label={label}
      onDelete={onDelete}
  />);
};

const CustomFilterList = (props) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

class Example extends React.Component {

  render() {
    const columns = [
      { name: 'Name' },
      {
        name: 'Company',
        options: {
          filter: true,
          filterType: 'custom',
          filterList: ['Test Corp'],
          customFilterListOptions: {
            render: v => {
              if (v.length !== 0) {
                return `Company: ${v[0]}`;
              }
              return false;
            },
            update: (filterList) => filterList,
          },
          filterOptions: {
            names: [],
            logic(status, filter) {
              if (filter.length > 0) {
                return status !== filter[0];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
                <Select
                    onChange={event => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    value={filterList[index]}
                >
                  <MenuItem value="Test Corp">{'Test Corp'}</MenuItem>
                  <MenuItem value="Other Corp">{'Other Corp'}</MenuItem>
                </Select>
            )
          },
        },
      },
      { name: 'City', label: 'City Label', options: { filterList: ['Dallas'] } },
      { name: 'State' },
      { name: 'Empty', options: { empty: true, filterType: 'checkbox' } },
    ];
    const data = [
      ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
      ['John Walsh', 'Test Corp', 'Hartford', null],
      ['Bob Herm', 'Other Corp', 'Tampa', 'FL'],
      ['James Houston', 'Test Corp', 'Dallas', 'TX'],
    ];

    return (
      <MUIDataTable
          title={"ACME Employee list"}
          data={data}
          columns={columns}
          components={{
            TableFilterList: CustomFilterList,
          }}
      />
    );

  }
}

export default Example;
