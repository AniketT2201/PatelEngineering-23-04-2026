import * as React from 'react';
import { sp } from '@pnp/sp/presets/all';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default class FolderBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
    sp.setup({ spfxContext: this.props.context });

    this.state = {
      items: [],
      breadcrumb: [{ text: 'Home', key: 'root', onClick: () => this.getFolderItems() }],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getFolderItems();
  }

  getFolderItems = async (folderPath = '') => {
    this.setState({ isLoading: true });
    const libraryName = 'Documents'; // Replace with your library name

    try {
      const folderItems = await sp.web.getFolderByServerRelativePath(${libraryName}/${folderPath}).files.select('Name', 'TimeCreated', 'TimeLastModified').get();
      const folders = await sp.web.getFolderByServerRelativePath(${libraryName}/${folderPath}).folders.select('Name').get();

      const items = [
        ...folders.map(folder => ({
          Name: folder.Name,
          Type: 'Folder',
          Modified: '',
          Created: ''
        })),
        ...folderItems.map(file => ({
          Name: file.Name,
          Type: 'File',
          Modified: new Date(file.TimeLastModified).toLocaleString(),
          Created: new Date(file.TimeCreated).toLocaleString()
        }))
      ];

      const breadcrumb = folderPath
        ? [{ text: 'Home', key: 'root', onClick: () => this.getFolderItems() }, ...folderPath.split('/').map((folder, index, array) => ({
            text: folder,
            key: folder,
            onClick: () => this.getFolderItems(array.slice(0, index + 1).join('/'))
          }))]
        : [{ text: 'Home', key: 'root', onClick: () => this.getFolderItems() }];

      this.setState({ items, breadcrumb, isLoading: false });
    } catch (error) {
      console.error('Error loading folder data:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const columns: IColumn[] = [
      { key: 'column1', name: 'Name', fieldName: 'Name', minWidth: 100, onRender: (item) => item.Type === 'Folder' ? <a onClick={() => this.getFolderItems(item.Name)}>{item.Name}</a> : item.Name },
      { key: 'column2', name: 'Type', fieldName: 'Type', minWidth: 50 },
      { key: 'column3', name: 'Modified', fieldName: 'Modified', minWidth: 100 },
      { key: 'column4', name: 'Created', fieldName: 'Created', minWidth: 100 },
    ];

    return (
      <div style={{ display: 'flex' }}>
        {/* Breadcrumb on the left side */}
        <div style={{ width: '20%', paddingRight: '10px', borderRight: '1px solid #ddd' }}>
          <Breadcrumb items={this.state.breadcrumb} />
        </div>

        {/* Details view in the middle */}
        <div style={{ width: '80%', paddingLeft: '10px' }}>
          {this.state.isLoading ? (
            <Spinner size={SpinnerSize.large} />
          ) : (
            <DetailsList
              items={this.state.items}
              columns={columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={SelectionMode.none}
            />
          )}
        </div>
      </div>
    );
  }
}