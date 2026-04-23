// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
// import { SearchBox } from '@fluentui/react/lib/SearchBox';
// import { BrowserRouter, Link, HashRouter } from "react-router-dom";
// import JSZip from "jszip";
// //import * as JSZip from "jszip";
// import { saveAs } from "file-saver";
// import USESPCRUD, { ISPCRUD } from '../../../../services/bal/spcrud';
// import './common.scss';
// import { ISafetyPortalProps } from '../../../../services/interface/ISafetyPortalProps';
// import { IHr } from '../../../../services/interface/IHr';
// import IHrOps from '../../../../services/bal/Hr';
// import { ITopMenu } from '../../../../services/interface/ITopMenu';
// import ITopMenuOps from '../../../../services/bal/TopMenu';
// import { ISubMenu } from '../../../../services/interface/ISubMenu';
// import ISubMenuOps from '../../../../services/bal/SubMenu';
// import { Modal, TextField } from '@fluentui/react';
// // import RingLoader from "react-spinners/RingLoader"; // Import RingLoader
// // import PacmanLoader from "react-spinners/PacmanLoader"; // Import RingLoader
// //import './LibraryUpload.scss';
// import logo from '../../../assets/Safety Portal Images/logonew.png';
// import SPCRUDOPS from '../../../../services/dal/spcrudops';

// import {
//     Table, Upload, Button, Popconfirm, message, Divider,
//     Spin,
//     Input,
//     Menu,
//     Dropdown

// } from "antd";
// import { TreeView, ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
// import { sp } from "@pnp/sp";

// export const TreeStructure: React.FunctionComponent<ISafetyPortalProps> = (props: ISafetyPortalProps) => {
//     const [LibraryView, setLibraryView] = useState<any[]>();

//     React.useEffect(() => {
//             const spCrudOps = SPCRUDOPS();
//             let folders:any;
//         const fetchFolders = async (libraryName) => {
//            folders = await sp.web.lists.getByTitle(libraryName).rootFolder.folders.get();
//             return folders.map(folder => ({
//               id: folder.UniqueId,
//               name: folder.Name,
//               subFolders: folder,
//             }));
//           };

//           const treeItems: ITreeItem[] = folders.map(folder => ({
//             key: folder.id,
//             label: folder.name,
//             subLabel: folder.subFolders.length > 0 ? `${folder.subFolders.length} items` : "",
//             children: folder.subFolders.map(subFolder => ({
//               key: subFolder.id,
//               label: subFolder.name,
//             })),
//           }));
//           setLibraryView(treeItems);
//     }, []);
//     return (
//         <TreeView
//           items={LibraryView}
//           defaultExpanded={false}
//           showCheckboxes={false}
//           onSelect={(items) => console.log("Selected items:", items)}
//         />
//       );
// }
