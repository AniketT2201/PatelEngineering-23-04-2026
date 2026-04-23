import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { BrowserRouter, Link, HashRouter } from "react-router-dom";
import JSZip from "jszip";
//import * as JSZip from "jszip";
import { saveAs } from "file-saver";
import USESPCRUD, { ISPCRUD } from '../../../../services/bal/spcrud';
import './common.scss';
import { ISafetyPortalProps } from '../../../../services/interface/ISafetyPortalProps';
import { IHr } from '../../../../services/interface/IHr';
import IHrOps from '../../../../services/bal/Hr';
import { ITopMenu } from '../../../../services/interface/ITopMenu';
import ITopMenuOps from '../../../../services/bal/TopMenu';
import { ISubMenu } from '../../../../services/interface/ISubMenu';
import ISubMenuOps from '../../../../services/bal/SubMenu';
import { Modal, TextField } from '@fluentui/react';
// import RingLoader from "react-spinners/RingLoader"; // Import RingLoader
// import PacmanLoader from "react-spinners/PacmanLoader"; // Import RingLoader
//import './LibraryUpload.scss';
import logo from '../../../assets/Safety Portal Images/logonew.png';
import {
    Table, Upload, Button, Popconfirm, message, Divider,
    Spin,
    Input,
    Menu,
    Dropdown

} from "antd";

import {useParams} from 'react-router-dom'


import {
    FileOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined,
    FilePptOutlined, FileImageOutlined, FileZipOutlined, FileTextOutlined,
    FileMarkdownOutlined, CodeOutlined, FolderOutlined, DownloadOutlined, EyeOutlined, DeleteOutlined,
    UploadOutlined, PlusOutlined,
    MoreOutlined, AppstoreAddOutlined, SettingOutlined
} from "@ant-design/icons";

import { FieldUrlRenderer } from "@pnp/spfx-controls-react";
import { Item } from "@pnp/sp/items";

interface FolderItem {
    Subfolders: boolean;
    Name: string;
    ServerRelativeUrl: string;
    Type: "Folder" | "File";
    FileUrl?: string;
    FileSize?: number;
    LastModified?: string;
    ModifiedBy?: string;
    items: any;
    Category: any;
    Details: any;
}

interface Item {
    Name: string;
    Type: string;
    LastModified: string;
    Children?: Item[]; // Optional property to store subfolders
}
interface TreeNodeProps {
    item: Item;
    onClick: (item: Item) => void;
}

export const HrPage: React.FunctionComponent<ISafetyPortalProps> = (props: ISafetyPortalProps) => {

    const {itemTitle} =useParams();

    const [IHrCollData, setIHrCollData] = useState<IHr[]>();
    const history = useHistory();
    const [folderSizes, setFolderSizes] = useState<{ [key: string]: number }>({});
    let [Subfolders, setSubfolders] = useState<FolderItem[]>([]);
    let [subfolders1, setSubfolders1] = useState({});
    const [libraries, setLibraries] = useState<FolderItem[]>([]);
    const [currentItems, setCurrentItems] = useState<FolderItem[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<FolderItem[]>([]);
    const webAbsoluteUrl: string = props.currentSPContext.pageContext.web.absoluteUrl;
    const [recentFiles, setRecentFiles] = useState<FolderItem[]>([]);
    const [allItems, setAllItems] = useState<FolderItem[]>([]);
    let [FirsthrFolder, setFirstHrFolder] = useState<FolderItem[]>([]);
    const [loading, setLoading] = useState(false); // Add a loading state

    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const [counter, setCounter] = useState(0);
    // const [searchQuery, setSearchQuery] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const [IsAdmin, setIsIsAdmin] = React.useState(false);


    console.log("Original Items:", currentItems); // Debugging

    // debugger;
    const [TopMenuCollData, setTopMenuCollData] = useState<ITopMenu[]>();
    const [SubMenuCollData, setSubMenuCollData] = useState<ISubMenu[]>();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpensub, setIsOpensub] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenaction, setIsModalOpenaction] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const [newFolderName, setNewFolderName] = useState("");

    const [visibleRows, setVisibleRows] = useState({});

    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModalAction = () => {
        setIsModalOpenaction(true);
    };

    // Close the modal
    const closeModalAction = () => {
        setIsModalOpenaction(false);
    };

    // Handle input change in the modal
    const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setInputValue(newValue || '');
    };

    // Handle Save Logic (e.g., API calls, etc.)
    const handleSave = () => {
        console.log("Save button clicked with value: ", inputValue);
        // You can implement your save logic here, like saving to SharePoint or API calls
        closeModal(); // Close the modal after saving
    };
    const handleActionSave = () => {
        console.log("Save button clicked with value: ", inputValue);
        // You can implement your save logic here, like saving to SharePoint or API calls
        closeModalAction(); // Close the modal after saving
    };
    // Function to toggle the menu state
    const toggleMenunew = () => {
        setIsOpen((prevState) => !prevState); // Toggle the state
    };
    const toggleMensub = () => {
        setIsOpensub((prevState) => !prevState); // Toggle the state
    };
    const getdata = () => {
        alert("Button clicked!");
    };
    const openclose = () => {
        setIsVisible(!isVisible);
        setCounter(counter + 1);
    };
    const toggleRowVisibility = (key) => {
        setVisibleRows((prevState) => ({
            ...prevState,
            [key]: !prevState[key], // Toggle the visibility of the specific row
        }));
    };
    // Function to filter data based on search query
    const filteredItems = currentItems
        .filter((item) => item.Name !== "Forms") // Exclude "Forms"
        .filter((item) => {
            const nameMatch = item.Name?.toLowerCase().includes(searchQuery.toLowerCase());
            const categoryMatch = item.Category?.toLowerCase().includes(searchQuery.toLowerCase());
            const detailsMatch = item.Details
                ? item.Details.toLowerCase().includes(searchQuery.toLowerCase())
                : false;

            console.log("Filtering Item:", item.Name, { nameMatch, categoryMatch, detailsMatch });

            return nameMatch || categoryMatch || detailsMatch;
        });


    console.log("Filtered Items:", filteredItems); // Debugging

    //const [subfolders, setSubfolders] = useState({});
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };








    useEffect(() => {
        // checkUserInGroups(['Admin']);
        hrfirstfolder();

        ITopMenuOps().getTopMenuData(props).then((TopMenuColl) => {
            console.log(' TopMenu Data received:', TopMenuColl);
            setTopMenuCollData(TopMenuColl);
        }, error => {
            console.error('Error fetching data:', error);
        });
        ISubMenuOps().getSubMenuData(props).then((SubMenuColl) => {
            console.log(' SubMenu Data received:', SubMenuColl);
            setSubMenuCollData(SubMenuColl);
        }, error => {
            console.error('Error fetching data:', error);
        });
        IHrOps().getHrData(props).then((HrColl) => {
            console.log(' Hr Data received:', HrColl);

            // setIHrCollData(HrColl);

        }, error => {
            console.error('Error fetching data:', error);
        });
        ScrollintoView()
        var libraryName = itemTitle;//'HR';

        fetchLibraries1(libraryName)
        fetchAllRecentFiles(libraryName);

    }, []);
    
    const getChildren = (ParantId) => {
        return TopMenuCollData.filter(item => item.ParantId === ParantId);
    };
    const getsubChildren = (ParantId) => {
        return SubMenuCollData.filter(item => item.ParantId === ParantId);
    };

    const Menubar = ({ TopMenuCollData, getChildren }) => {
        const [activeSubMenu, setActiveSubMenu] = useState(null);

        // Handle mouse enter event to show submenu
        const handleMouseEnter = (itemId) => {
            setActiveSubMenu(itemId);
        };

        // Handle mouse leave event to hide submenu
        const handleMouseLeave = () => {
            setActiveSubMenu(null);
        };
    }

    // const checkUserInGroups=async (groups: any)=> {
    //     try {
    //       const spCrudObj = await USESPCRUD();
    //       const userGroups = await spCrudObj.currentUserGroup(props);
    //       if (!userGroups || userGroups.length === 0) {
    //        alert ("User is not part of any group.");
    //         return false;
    //       }
    //       const isUserInGroup = userGroups.some(group => groups.includes(group.Title));
    //       if (isUserInGroup) {

    //         alert('user exist in admin group');
    //         return false;
    //         // setIsIsAdmin()
            
        
    //       }
    //     } catch (error) {
    //       console.error("Error checking user in groups:", error);
    //     }
    //   }

    function ScrollintoView() {
        //    let ele = document.getElementById('iiibody')
        //    ele.scrollIntoView()
    }
    

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const searchItems = (query: string) => {
        if (!query) {
            setCurrentItems(currentItems);
            return;
        }
        debugger;
        const filteredItems = currentItems.filter(item =>
            item.Name.toLowerCase().includes(query.toLowerCase())
        );

        setCurrentItems(filteredItems);
    };



    //





    //


    const downloadFolderAsZip = async (folder: FolderItem) => {
        const zip = new JSZip();
        const folderZip = zip.folder(folder.Name)!;

        const addFilesToZip = async (folderUrl: string, parentZip: JSZip) => {
            try {
                const response = await fetch(
                    `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')?$expand=Files,Folders`,
                    { headers: { Accept: "application/json;odata=verbose" } }
                );
                if (!response.ok) throw new Error("Failed to fetch folder contents.");
                const data = await response.json();

                for (const file of data.d.Files.results) {
                    const fileResponse = await fetch(`${webAbsoluteUrl}${file.ServerRelativeUrl}`);
                    const blob = await fileResponse.blob();
                    parentZip.file(file.Name, blob);
                }

                for (const subfolder of data.d.Folders.results) {
                    const subfolderZip = parentZip.folder(subfolder.Name)!;
                    await addFilesToZip(subfolder.ServerRelativeUrl, subfolderZip);
                }
            } catch (error) {
                console.error("Error adding files to ZIP:", error);
            }
        };

        await addFilesToZip(folder.ServerRelativeUrl, folderZip);
        zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, `${folder.Name}.zip`));
    };

    const calculateFolderSize = async (folderUrl: string): Promise<number> => {
        if (folderSizes[folderUrl]) return folderSizes[folderUrl];

        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')?$expand=Files,Folders/Files`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );
            if (!response.ok) throw new Error("Failed to fetch folder contents.");
            const data = await response.json();

            let totalSize = 0;

            data.d.Files.results.forEach((file: any) => {
                totalSize += parseInt(file.Length, 10);
            });

            for (const subfolder of data.d.Folders.results) {
                totalSize += await calculateFolderSize(subfolder.ServerRelativeUrl);
            }

            setFolderSizes(prevSizes => ({ ...prevSizes, [folderUrl]: totalSize }));

            return totalSize;
        } catch (error) {
            console.error("Error calculating folder size:", error);
            return 0;
        }
    };

    const calculateFolderSize1 = async (folderUrl: string): Promise<number> => {
        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')?$expand=Files,Folders/Files`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );
            if (!response.ok) throw new Error("Failed to fetch folder contents.");
            const data = await response.json();

            let totalSize = 0;
            data.d.Files.results.forEach((file: any) => totalSize += parseInt(file.Length, 10));
            for (const subfolder of data.d.Folders.results) {
                totalSize += await calculateFolderSize(subfolder.ServerRelativeUrl);
            }

            return totalSize;
        } catch (error) {
            console.error("Error calculating folder size:", error);
            return 0;
        }
    };

    const fetchLibraries1 = async (libraryName: any) => {
        try {
            let response = await fetch(
                `${webAbsoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101 and Title eq '${libraryName}'&$expand=RootFolder,LastModifiedByUser`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );

            // Fetch Library Items (with all columns, including custom ones)
            const responseCategory = await fetch(
                `${webAbsoluteUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=*,Editor/Title,FileLeafRef,FSObjType,EncodedAbsUrl,File/Name&$expand=Editor,File`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );


            // "*,File/Name,EncodedAbsUrl,Modified,FileLeafRef,FSObjType,Folder/Name",  // Query for folder name
            //     "File",

            // Fetch Category Field Choices
            const responseFieldChoices = await fetch(
                `${webAbsoluteUrl}/_api/web/lists/getbytitle('${libraryName}')/items?$select=*,Editor/Title,FileLeafRef,FSObjType,EncodedAbsUrl,File/Name&$expand=Editor,File`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );
            const metadataData = await response.json();
            const itemsData = await responseCategory.json();
            const fieldData = await responseFieldChoices.json();

            if (metadataData.d.results.length > 0) {
                const bankingLibrary = metadataData.d.results[0];

                // Extract available category choices
                const categoryField = fieldData.d.results[0];
                const categoryChoices: string[] = categoryField.Choices?.results || [];


                const items = itemsData.d.results.map((item: any) => ({
                    ID: item.ID,
                    Title: item.Title,
                    Category: item.Category || "N/A",
                    Details: item.Details || "N/A",
                    FileName: item.File?.Name || "",
                    ModifiedBy: item.Editor?.Title || "Unknown",
                    ModifiedDate: new Date(item.Modified).toLocaleString(),
                }));

                setCategories(categoryChoices);

                // const uniqueCategories = Array.from(
                //     new Set<string>(items.map((item: { Category: any }) => String(item.Category || "")))
                // ).filter((cat) => cat.trim() !== "" && cat !== "N/A");

                // setCategories(uniqueCategories);



                const library: FolderItem = {
                    Name: bankingLibrary.Title,
                    ServerRelativeUrl: bankingLibrary.RootFolder.ServerRelativeUrl,
                    Type: "Folder",
                    LastModified: new Date(bankingLibrary.LastItemModifiedDate).toLocaleString(),
                    ModifiedBy: bankingLibrary.LastModifiedByUser?.Title || "",
                    Category: "",
                    Details: "",
                    items: items,
                    Subfolders: false
                };

                setLibraries([library]);
                setBreadcrumb([]);
                fetchItems(library);
            } else {
                message.error("Banking library not found.");
            }
        } catch (error) {
            console.error("Error fetching Banking library:", error);
        }
    };


    const hrfirstfolder = async () => {
        try {
            let endpoint = `${webAbsoluteUrl}/_api/web/getfolderbyserverrelativeurl('${itemTitle}')?$expand=Folders,Files,Files/ModifiedBy`;

            const response = await fetch(endpoint, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching folders and files: ${response.statusText}`);
            }

            const data = await response.json();

            if (data) {
                // Extract Folders
                const folders = data.Folders?.map((item: any) => ({
                    Name: item.Name,
                    ServerRelativeUrl: item.ServerRelativeUrl,
                    Type: "Folder",
                    LastModified: new Date(item.TimeLastModified).toLocaleString(),
                })) || [];

                // Extract Files
                const files = data.Files?.map((file: any) => ({
                    Name: file.Name,
                    ServerRelativeUrl: file.ServerRelativeUrl,
                    Type: "File",
                    LastModified: new Date(file.TimeLastModified).toLocaleString(),
                    ModifiedBy: file.ModifiedBy?.Title || "Unknown",
                })) || [];

                // ✅ Merge Folders & Files into a Single Array
                const combinedData = [...folders, ...files];

                // ✅ Update state with merged data
                setFirstHrFolder(combinedData);
            } else {
                console.warn("No folders or files found in the HR directory.");
                setFirstHrFolder([]);  // Reset if nothing is found
            }
        } catch (error) {
            console.error("Failed to fetch HR folders and files:", error);
        }
    };

    // Call the function where needed




    const FetchSubFolders = async (
        record: any,
        currentFolderPath: string = "",
        numberOfFolders: number = 10
    ): Promise<FolderItem[]> => {
        try {
            if (!record?.ServerRelativeUrl) {
                throw new Error("Invalid record: Missing ServerRelativeUrl");
            }

            let FolderPath = record.ServerRelativeUrl.split("/PatelEngineeringSafetyPortal/");
            if (!FolderPath[1]) {
                throw new Error("Invalid folder path structure");
            }

            let subfolderPath = encodeURIComponent(FolderPath[1]);
            let finalPath = currentFolderPath ? `${currentFolderPath}/${subfolderPath}` : subfolderPath;

            let endpoint = `${webAbsoluteUrl}/_api/web/getfolderbyserverrelativeurl('${finalPath}')/Folders?$top=${numberOfFolders}`;

            let allFolders: FolderItem[] = [];
          
            const fetchFolders = async (url: string) => {

                var foldersWithSubfolders=[];
                const response = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching folders: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Fetched subfolders:", data);

                if (data.value) {
                     foldersWithSubfolders = await Promise.all(
                        data.value.map(async (item: any) => {
                            const subfolders = await FetchSubFolders(item); // Recursive call for subfolders
                            return {
                                Name: item.Name,
                                ServerRelativeUrl: item.ServerRelativeUrl,
                                Type: "Folder",
                                LastModified: new Date(item.TimeLastModified).toLocaleString(),
                                FullPath: `${finalPath}/${item.Name}`,
                                Subfolders: subfolders || [],
                            };
                        })
                    );

                }
                allFolders = [...allFolders, ...foldersWithSubfolders];


                if (data["@odata.nextLink"]) {
                    await fetchFolders(data["@odata.nextLink"]); // Handle pagination
                }
            };

            await fetchFolders(endpoint);

            return allFolders;
        } catch (error) {
            console.error("Failed to fetch folders:", error);
            return [];
        }
    };
    /*const data = await response.json();
    if(data.d && data.d.results){
    
        const subfolders: FolderItem[] = data.d.results.map((lib: any) => ({
            Name: lib.Title,
            ServerRelativeUrl: lib.RootFolder.ServerRelativeUrl,
            Type: "Folder",
            LastModified: new Date(lib.LastItemModifiedDate).toLocaleString(),
            ModifiedBy: lib.LastModifiedBy?.Title || "",
        }));
        setSubfolders(subfolders);

    }*/





    const fetchLibraries = async () => {
        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101&$expand=RootFolder`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );
            const data = await response.json();
            if (data.d && data.d.results) {


                const libraryList: FolderItem[] = data.d.results.map((lib: any) => ({
                    Name: lib.Title,
                    ServerRelativeUrl: lib.RootFolder.ServerRelativeUrl,
                    Type: "Folder",
                    LastModified: new Date(lib.LastItemModifiedDate).toLocaleString(),
                    ModifiedBy: lib.LastModifiedBy?.Title || "",
                }));
                setLibraries(libraryList);
                setBreadcrumb([]);
            }
        } catch (error) {
            console.error("Error fetching libraries:", error);
        }
    };

    const fetchItems = async (parent: FolderItem) => {
        try {
            const response = await fetch(
                // `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${parent.ServerRelativeUrl}')?$select=*,&$expand=Folders,Files,Files/ModifiedBy,ID`,
                `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${parent.ServerRelativeUrl}')?$select=*,Name,FileLeafRef,FSObjType,ServerRelativeUrl,Id,Title&$expand=Folders,Files,Files/ModifiedBy`,

                { headers: { Accept: "application/json;odata=verbose" } }
            );
            let fetchedfiles;
            let fetchedfolder;
            if (!parent.items) {
                fetchedfiles = await fetchFilesAndFolders(parent)
                if (fetchedfiles) {
                    fetchedfiles = fetchedfiles.filter((item) => item.Type === "File")
                }
            } else {
                fetchedfiles = {}
            }

            var items = parent.items || fetchedfiles;
            const data = await response.json();
            if (data.d) {
                const folderList: FolderItem[] = await Promise.all(
                    data.d.Folders.results.map(async (folder: any) => {

                        const modifiedBy = await fetchModifiedBy(folder.ServerRelativeUrl);

                        return {
                            Name: folder.Name,
                            Category: folder.Category,
                            Details: folder.Details,
                            ServerRelativeUrl: folder.ServerRelativeUrl,
                            ServerRedirectedEmbedUrl: folder.ServerRedirectedEmbedUrl,
                            Type: "Folder",
                            items: items,
                            fetchid: Array.isArray(items) ? items[0]?.ID : items?.ID,
                            LastModified: new Date(folder.TimeLastModified).toLocaleString(),
                            ModifiedBy: modifiedBy,
                        };
                    })
                );

                var items1 = parent.items || fetchedfiles;


                const fileList: FolderItem[] = data.d.Files.results.map((file: any) => ({
                    Name: file.Name,
                    Category: file.Category,
                    Details: file.Details,

                    ServerRelativeUrl: file.ServerRelativeUrl,
                   // FileUrl: webAbsoluteUrl + file.ServerRelativeUrl,
                    ServerRedirectedEmbedUrl: file.ServerRedirectedEmbedUrl,
                    Type: "File",
                    FileSize: parseInt(file.Length, 10),
                    LastModified: new Date(file.TimeLastModified).toLocaleString(),
                    ModifiedBy: file.ModifiedBy?.Title || "",
                }));

                // Assuming items1 and fileList are already populated
                const matchedItems: FolderItem[] = [];

                fileList.forEach((file) => {
                    // Find matching item in items1 based on file name
                    const matchedItem = items1.find((item: any) => item.FileName || item.Name === file.Name);

                    if (matchedItem) {
                        // Add other column values from items1 to fileList
                        matchedItems.push({
                            ...file,
                            Category: matchedItem.Category || "",
                            Details: matchedItem.Details || ""
                            // Adjust to your column names
                            // AnotherColumn: matchedItem.AnotherColumn || "",
                        });
                    }
                });

                console.log("Matched Items:", matchedItems);


                // if(fileList.length>0){

                //     for(var i=0;i<fileList.length;i++){

                //         if(items1.fi)
                //     }
                // }
                setCurrentItems([...folderList, ...matchedItems]);

                // setBreadcrumb((prev) => {
                //     console.log("Previous Breadcrumb:", prev.map(item => item.ServerRelativeUrl));

                //     const lastBreadcrumb = prev[prev.length - 1];

                //     // Check if the current folder is already in the breadcrumb
                //     const isAlreadyInBreadcrumb = prev.some(item => item.ServerRelativeUrl === parent.ServerRelativeUrl);

                //     if (!isAlreadyInBreadcrumb) {
                //         console.log("Adding to breadcrumb:", parent.ServerRelativeUrl);
                //         return [...prev, parent];
                //     }

                //     // If navigating back, remove extra items
                //     if (lastBreadcrumb && parent.ServerRelativeUrl.includes(lastBreadcrumb.ServerRelativeUrl)) {
                //         const updatedBreadcrumb = prev.filter(item => parent.ServerRelativeUrl.includes(item.ServerRelativeUrl));
                //         console.log("Updated Breadcrumb (Back Navigation):", updatedBreadcrumb.map(item => item.ServerRelativeUrl));
                //         return updatedBreadcrumb;
                //     }

                //     return prev;
                // });
                if (breadcrumb.length > 1) {
                    let filtervalues = breadcrumb.filter((item, index) => {
                        if (index === 0) {
                            return true;
                        }
                        else if (item.Type == "Folder" && parent.Type == item.Type) {
                            return false;
                        }
                    })
                    setBreadcrumb(filtervalues);

                }

                setBreadcrumb((prev) => {

                    //if (parent.ServerRelativeUrl.indexOf(prev[prev.length - 1]?.ServerRelativeUrl?.split('/')[4]) !== -1 && prev.length >1) {
                    if (prev.length > 0 && prev[prev.length - 1].ServerRelativeUrl === parent.ServerRelativeUrl && parent.ServerRelativeUrl.indexOf(prev[prev.length - 1]?.ServerRelativeUrl?.split('/')[4]) !== -1) {
                        return prev;
                    }

                    return [...prev, parent];
                    //}
                });

                for (const folder of folderList) {
                    calculateFolderSize(folder.ServerRelativeUrl);
                }
            }
        } catch (error) {
            console.error("Error fetching folders & files:", error);
        }
    };

    const fetchModifiedBy = async (folderUrl: string) => {
        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/ListItemAllFields?$select=EditorId`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );

            const data = await response.json();
            const editorId = data.d?.EditorId;

            if (editorId) {
                return await fetchUserById(editorId);
            }
            return "";
        } catch (error) {
            console.error("Error fetching folder modified by:", error);
            return "";
        }
    };
    const fetchUserById = async (userId: number) => {
        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/getuserbyid(${userId})?$select=Title`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );

            const data = await response.json();
            return data.d?.Title || "";
        } catch (error) {
            console.error("Error fetching user details:", error);
            return "";
        }
    };

    // const fetchItems9 = async (parent: FolderItem) => {
    //     try {
    //         const response = await fetch(
    //             `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${parent.ServerRelativeUrl}')?$expand=*,Folders,Files,Files/ModifiedBy`,
    //             { headers: { Accept: "application/json;odata=verbose" } }
    //         );
    //         const data = await response.json();

    //         if (data.d) {
    //             const folderList: FolderItem[] = data.d.Folders.results.map((folder: any) => ({
    //                 Name: folder.Name,
    //                 ServerRelativeUrl: folder.ServerRelativeUrl,
    //                 ServerRedirectedEmbedUrl: folder.ServerRedirectedEmbedUrl,
    //                 Type: "Folder",
    //                 LastModified: new Date(folder.TimeLastModified).toLocaleString(),
    //                 ModifiedBy: folder.ModifiedBy?.Title || "",
    //             }));

    //             const fileList: FolderItem[] = data.d.Files.results.map((file: any) => ({
    //                 Name: file.Name,
    //                 ServerRelativeUrl: file.ServerRelativeUrl,
    //                 FileUrl: webAbsoluteUrl + file.ServerRelativeUrl,
    //                 ServerRedirectedEmbedUrl: file.ServerRedirectedEmbedUrl,
    //                 Type: "File",
    //                 FileSize: parseInt(file.Length, 10),
    //                 LastModified: new Date(file.TimeLastModified).toLocaleString(),
    //                 ModifiedBy: file.ModifiedBy?.Title || "",
    //             }));

    //             setCurrentItems([...folderList, ...fileList]);

    //             setBreadcrumb((prev) => {
    //                 if (prev.length > 0 && prev[prev.length - 1].ServerRelativeUrl === parent.ServerRelativeUrl) {
    //                     return prev;
    //                 }
    //                 return [...prev, parent];
    //             });

    //             for (const folder of folderList) {
    //                 calculateFolderSize(folder.ServerRelativeUrl);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error fetching folders & files:", error);
    //     }
    // };

    const fetchItems1 = async (parent: FolderItem) => {
        try {
            const response = await fetch(
                `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${parent.ServerRelativeUrl}')?$expand=Folders,Files,Files/ModifiedBy`,
                {
                    headers: { Accept: "application/json;odata=verbose" }
                }
            );
            const data = await response.json();
            if (data.d) {
                const folderList: FolderItem[] = data.d.Folders.results.map((folder: any) => ({
                    Name: folder.Name,
                    ServerRelativeUrl: folder.ServerRelativeUrl,
                    ServerRedirectedEmbedUrl: folder.ServerRedirectedEmbedUrl,
                    Type: "Folder",
                    LastModified: new Date(folder.TimeLastModified).toLocaleString(),
                    ModifiedBy: folder.ModifiedBy?.Title || "",
                }));

                const fileList: FolderItem[] = data.d.Files.results.map((file: any) => ({
                    Name: file.Name,
                    ServerRelativeUrl: file.ServerRelativeUrl,
                    FileUrl: webAbsoluteUrl + file.ServerRelativeUrl,
                    Type: "File",
                    FileSize: parseInt(file.Length, 10),
                    LastModified: new Date(file.TimeLastModified).toLocaleString(),
                    ModifiedBy: file.ModifiedBy?.Title || "",
                }));

                setCurrentItems([...folderList, ...fileList]);

                setBreadcrumb((prev) => {
                    if (prev.length > 0 && prev[prev.length - 1].ServerRelativeUrl === parent.ServerRelativeUrl) {
                        return prev;
                    }
                    return [...prev, parent];
                });
            }
        } catch (error) {
            console.error("Error fetching folders & files:", error);
        }
    };

    const navigateBack = (index: number) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        setBreadcrumb(newBreadcrumb);
        setCurrentItems([]);
        if (newBreadcrumb.length > 0) {
            fetchItems(newBreadcrumb[newBreadcrumb.length - 1]);
           
        } else {
            setCurrentItems(libraries);
        }
    };

    const openFile = (fileUrl: string) => {
        if (!fileUrl) {
            message.error("File URL not found.");
            return;
        }
        window.open(fileUrl, "_blank");
    };

    const openFiles = (fileUrl: string) => {
        const absoluteUrl = fileUrl.startsWith("http") ? fileUrl : `${window.location.origin}${fileUrl}`;
        const authUrl = `${absoluteUrl}?web=1`;
        console.log("Opening with authentication:", authUrl);
        window.open(authUrl, "_blank");
    };


    const formatFileSize = (size?: number) => {
        if (!size) return "0 B";
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`;
        return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    };

    const fetchFilesAndFolders = async (folder: any): Promise<FolderItem[]> => {
        try {
            let folderEndpoint = `${webAbsoluteUrl}/_api/web/getfolderbyserverrelativeurl('${folder.ServerRelativeUrl}')?$expand=Folders,Files,Files/ListItemAllFields,Files/ModifiedBy`;

            const response = await fetch(folderEndpoint, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();
            const result = data.d || data;

            // Combine both subfolders and files into one array
            const combinedData: FolderItem[] = [
                ...(result.Folders?.map((subfolder: any) => ({
                    Name: subfolder.Name,
                    ServerRelativeUrl: subfolder.ServerRelativeUrl,
                    Type: "Folder",
                    LastModified: new Date(subfolder.TimeLastModified).toLocaleString(),
                })) || []),
                ...(result.Files?.map((file: any) => ({
                    Name: file.Name,
                    ServerRelativeUrl: file.ServerRelativeUrl,
                    Type: "File",
                    LastModified: new Date(file.TimeLastModified).toLocaleString(),
                    ModifiedBy: file.ListItemAllFields?.Author?.Title || "Unknown",
                })) || []),
            ];

            return combinedData;
        } catch (error) {
            console.error("Failed to fetch data:", error);
            return [];  // Return empty array if there is an error
        }
    };



    // for icon of table data show icon
    const getFileIcon = (fileName: string, type: "Folder" | "File") => {
        if (type === "Folder") return <FolderOutlined style={{ color: "#fa8c16" }} />;

        const extension = fileName.split(".").pop()?.toLowerCase();

        switch (extension) {
            // <span  style={{  fontSize:"120px" }}>📁</span>
            case "pdf":
                return <FilePdfOutlined style={{ color: "red" }} />;
            case "doc":
            case "docx":
                return <FileWordOutlined style={{ color: "blue", }} />;
            case "xls":
            case "xlsx":
                return <FileExcelOutlined style={{ color: "green", }} />;
            case "ppt":
            case "pptx":
                return <FilePptOutlined style={{ color: "orange", }} />;
            case "txt":
                return <FileTextOutlined style={{ color: "gray", }} />;
            case "md":
                return <FileMarkdownOutlined style={{ color: "purple", }} />;

            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "svg":
            case "webp":
                return <FileImageOutlined style={{ color: "#13c2c2", }} />;

            case "mp4":
            case "avi":
            case "mov":
            case "wmv":
            case "flv":
            case "mkv":
                return <FileOutlined style={{ color: "#722ed1", }} />;

            case "mp3":
            case "wav":
            case "aac":
            case "flac":
            case "ogg":
                return <FileOutlined style={{ color: "#faad14", }} />;

            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
                return <FileZipOutlined style={{ color: "#d48806", }} />;

            case "js":
            case "ts":
            case "jsx":
            case "tsx":
            case "html":
            case "css":
            case "scss":
            case "json":
            case "xml":
            case "sql":
            case "py":
            case "java":
            case "c":
            case "cpp":
            case "cs":
            case "php":
            case "rb":
            case "sh":
                return <CodeOutlined style={{ color: "#1890ff", }} />;

            default:
                return <FileOutlined style={{ color: "gray", }} />;
        }
    };

    // for icon of recent access files
    const getFileIcon1 = (fileName: string, type: "Folder" | "File") => {
        if (type === "Folder") return <FolderOutlined style={{ color: "#fa8c16" }} />;

        const extension = fileName.split(".").pop()?.toLowerCase();

        switch (extension) {
            // <span  style={{  fontSize:"120px" }}>📁</span>
            case "pdf":
                return <FilePdfOutlined style={{ color: "red", fontSize: "50px" }} />;
            case "doc":
            case "docx":
                return <FileWordOutlined style={{ color: "blue", fontSize: "50px" }} />;
            case "xls":
            case "xlsx":
                return <FileExcelOutlined style={{ color: "green", fontSize: "50px" }} />;
            case "ppt":
            case "pptx":
                return <FilePptOutlined style={{ color: "orange", fontSize: "50px" }} />;
            case "txt":
                return <FileTextOutlined style={{ color: "gray", fontSize: "50px" }} />;
            case "md":
                return <FileMarkdownOutlined style={{ color: "purple", fontSize: "50px" }} />;

            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "svg":
            case "webp":
                return <FileImageOutlined style={{ color: "#13c2c2", fontSize: "50px" }} />;

            case "mp4":
            case "avi":
            case "mov":
            case "wmv":
            case "flv":
            case "mkv":
                return <FileOutlined style={{ color: "#722ed1", fontSize: "50px" }} />;

            case "mp3":
            case "wav":
            case "aac":
            case "flac":
            case "ogg":
                return <FileOutlined style={{ color: "#faad14", fontSize: "50px" }} />;

            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
                return <FileZipOutlined style={{ color: "#d48806", fontSize: "50px" }} />;

            case "js":
            case "ts":
            case "jsx":
            case "tsx":
            case "html":
            case "css":
            case "scss":
            case "json":
            case "xml":
            case "sql":
            case "py":
            case "java":
            case "c":
            case "cpp":
            case "cs":
            case "php":
            case "rb":
            case "sh":
                return <CodeOutlined style={{ color: "#1890ff", fontSize: "50px" }} />;

            default:
                return <FileOutlined style={{ color: "gray", fontSize: "50px" }} />;
        }
    };


    const getRequestDigest = async (): Promise<string> => {
        const digestUrl = `${webAbsoluteUrl}/_api/contextinfo`;
        try {
            const response = await fetch(digestUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch request digest.");
            }

            const data = await response.json();
            return data.d.GetContextWebInformation.FormDigestValue;
        } catch (error) {
            console.error("Error fetching request digest:", error);
            throw error;
        }
    };

    // const deleteItem = async (item: FolderItem) => {

        
    //     const deleteUrl = `${webAbsoluteUrl}/_api/web/${item.Type === "File" ? "GetFileByServerRelativeUrl" : "GetFolderByServerRelativeUrl"}('${item.ServerRelativeUrl}')`;

    //     try {
    //         const requestDigest = await getRequestDigest();

    //         const response = await fetch(deleteUrl, {
    //             method: "DELETE",
    //             headers: {
    //                 "Accept": "application/json;odata=verbose",
    //                 "X-RequestDigest": requestDigest,
    //             },
    //         });

    //         if (response.ok) {
    //             message.success(`${item.Name} deleted successfully`);
    //             fetchItems(breadcrumb[breadcrumb.length - 1]);
    //         } else {
    //             const errorData = await response.json();
    //             message.error(`Failed to delete ${item.Name}: ${errorData.error.message.value}`);
    //         }
    //     } catch (error) {
    //         console.error("Error deleting item:", error);
    //         message.error(`Error deleting ${item.Name}`);
    //     }
    // };

  
    const deleteItem = async (item: FolderItem) => {
        // Show confirmation dialog before proceeding
        const confirmed = window.confirm(`Are you sure you want to delete ${item.Name}?`);
        
        if (!confirmed) {
            return; // If the user cancels, stop the deletion
        }
    
        const deleteUrl = `${webAbsoluteUrl}/_api/web/${item.Type === "File" ? "GetFileByServerRelativeUrl" : "GetFolderByServerRelativeUrl"}('${item.ServerRelativeUrl}')`;
    
        try {
            const requestDigest = await getRequestDigest();
    
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigest,
                },
            });
    
            if (response.ok) {
                message.success(`${item.Name} deleted successfully`);
                fetchItems(breadcrumb[breadcrumb.length - 1]);
            } else {
                const errorData = await response.json();
                message.error(`Failed to delete ${item.Name}: ${errorData.error.message.value}`);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            message.error(`Error deleting ${item.Name}`);
        }
    };
    
    const downloadFile = async (fileUrl: string, fileName: string) => {

        if (!fileUrl) {
            message.error("File URL not found.");
            return;
        }

        const serverRelativeUrl = fileUrl.replace(webAbsoluteUrl, "");

        const downloadApiUrl = `${webAbsoluteUrl}/_api/web/GetFileByServerRelativeUrl('${serverRelativeUrl}')/$value`;

        try {
            const response = await fetch(downloadApiUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/octet-stream",
                    "X-RequestDigest": await getRequestDigest(),
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to download file. Status: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadLink = document.createElement("a");
            const objectUrl = URL.createObjectURL(blob);
            downloadLink.href = objectUrl;
            downloadLink.setAttribute("download", fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error("Error downloading file:", error);
            message.error("Failed to download file.");
        }
    };

    const fetchAllRecentFiles = async (libraryName: string) => {
        try {

            const libResponse = await fetch(
                `${webAbsoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101 and Title eq '${libraryName}'&$expand=RootFolder`,
                { headers: { Accept: "application/json;odata=verbose" } }
            );

            if (!libResponse.ok) throw new Error("Failed to fetch document libraries.");
            const libData = await libResponse.json();

            if (!libData.d.results.length) {
                message.error("Library not found.");
                return;
            }

            const library = libData.d.results[0];
            const libUrl = library.RootFolder.ServerRelativeUrl;

            let allFiles: FolderItem[] = [];

            const fetchFilesRecursive = async (folderUrl: string) => {
                try {

                    const fileResponse = await fetch(
                        `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/Files?$select=Name,ServerRelativeUrl,TimeLastModified,Author/Title&$expand=Author`,
                        { headers: { Accept: "application/json;odata=verbose" } }
                    );

                    if (fileResponse.ok) {
                        const fileData = await fileResponse.json();
                        const files = fileData.d.results.map((file: any) => ({
                            Name: file.Name,
                            ServerRelativeUrl: file.ServerRelativeUrl,
                            FileUrl: `${webAbsoluteUrl}${file.ServerRelativeUrl}`,
                            LastModified: new Date(file.TimeLastModified).toISOString(),
                            ModifiedBy: file.Author?.Title || "",
                            LibraryName: libraryName,
                        }));
                        allFiles = [...allFiles, ...files];
                    }

                    const folderResponse = await fetch(
                        `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderUrl}')/Folders`,
                        { headers: { Accept: "application/json;odata=verbose" } }
                    );

                    if (folderResponse.ok) {
                        const folderData = await folderResponse.json();
                        const subfolders = folderData.d.Folders.results;

                        for (const subfolder of subfolders) {
                            await fetchFilesRecursive(subfolder.ServerRelativeUrl);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching files recursively:", error);
                }
            };

            await fetchFilesRecursive(libUrl);

            allFiles.sort((a, b) => new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime());

            setRecentFiles(allFiles.slice(0, 5));

            console.log("Recent Files:", allFiles.slice(0, 20));
        } catch (error) {
            console.error("Error fetching recent files:", error);
            message.error("Failed to load recently accessed files.");
        }
    };

    const formatDate = (isoString: string) => {
        if (!isoString) return "N/A";

        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });
    };

    const Backbtnclick = async () => {
        history.push("/LibraryUpload");
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    const handleFileUpload = async (fileList: File[]) => {

        if (breadcrumb.length === 0) {
            message.error("Please navigate to a folder before uploading.");
            return;
        }

        const currentFolder = breadcrumb[breadcrumb.length - 1].ServerRelativeUrl;

        try {

            setLoading(true); // Show loader
            const requestDigest = await getRequestDigest();

            const uploadPromises = fileList.map(async (file) => {
                const uploadUrl = `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${currentFolder}')/Files/add(overwrite=true, url='${file.name}')`;

                try {
                    const fileBuffer = await file.arrayBuffer();
                    const response = await fetch(uploadUrl, {
                        method: "POST",
                        body: fileBuffer,
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "X-RequestDigest": requestDigest,
                            "Content-Type": "application/octet-stream",
                        },
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error(`Upload failed for ${file.name}:`, errorData.error.message.value);
                        return { file, success: false, error: errorData.error.message.value };
                    }

                    return { file, success: true };
                } catch (error) {
                    console.error(`Error uploading file: ${file.name}`, error);
                    return { file, success: false, error: error.message };
                }
            });

            const results = await Promise.all(uploadPromises);
            const successFiles = results.filter((res) => res.success).map((res) => res.file.name);
            const failedFiles = results.filter((res) => !res.success).map((res) => `${res.file.name}: ${res.error}`);

            if (successFiles.length > 0) {
                alert("Files Uploaded");
                
                //message.success(`Uploaded: ${successFiles.join(", ")}`);
                fetchItems(breadcrumb[breadcrumb.length - 1]);
            }
            if (failedFiles.length > 0) {
                // message.error(`Failed to upload:\n${failedFiles.join("\n")}`);
            }
        } catch (error) {
            message.error("Failed to get authentication token. Please try again.");
            console.error("Authentication Error:", error);
        }

        finally {
            setLoading(false); // Hide loader
        }
    };


    function renderSubfolders(Subfolders: any): React.ReactNode {
        throw new Error("Function not implemented.");
    }



    // folder creation


    const cleanPath = (path: string): string => {
        return path.startsWith("sites/PatelEngineeringSafetyPortal/") ? path.replace("sites/PatelEngineeringSafetyPortal/", "") : path;
    };


    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) {
            message.error("Folder name cannot be empty!");
            return;
        }

        const currentPath = breadcrumb[breadcrumb.length - 1].ServerRelativeUrl;
        const cleanedPath = currentPath.split("/").map(part => part.trim()).filter(Boolean).join("/");
        const fullFolderPath = `${cleanedPath}/${newFolderName.trim()}`;
        //const LibraryNameClean = cleanPath(fullFolderPath)   // getSpecificPath(fullFolderPath);
        const LibraryNameClean = fullFolderPath.split("/").slice(2).join("/");



        // const cleanPath = (path: string): string => {
        //     return path.replace(/^sites\/KnowHow\//, "");
        // };


        // const UploadfullFolderPath =fullFolderPath+'/'+newFolderName;
        try {
            // Fetch the request digest token
            const digestResponse = await fetch(`${webAbsoluteUrl}/_api/contextinfo`, {
                method: "POST",
                headers: { Accept: "application/json;odata=verbose" },
            });
            const digestData = await digestResponse.json();
            const requestDigest = digestData.d.GetContextWebInformation.FormDigestValue;

            const response = await fetch(`${webAbsoluteUrl}/_api/web/folders`, {
                method: "POST",
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json",
                    "X-RequestDigest": requestDigest, // Include the security token
                },
                body: JSON.stringify({
                    ServerRelativeUrl: LibraryNameClean,
                }),
            });

            if (response.ok) {
                message.success(`Folder '${newFolderName}' created successfully!`);
                alert(`Folder '${newFolderName}' created successfully!`);
                closeModal();
                setNewFolderName("");
                fetchItems(breadcrumb[breadcrumb.length - 1]);
            } else {
                const errorResponse = await response.json();
                message.error(`Failed to create folder: ${errorResponse.error.message.value}`);
            }
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    // const getActionMenu = (record) => (
    //     <div className="showdatamenu">
    //         <Menu>
    //             <Menu.Item key="view" onClick={() => record.Type === "Folder" ? fetchItems(record) : downloadFile(record.FileUrl!, record.Name)}>
    //                 <EyeOutlined /> View
    //             </Menu.Item>
    //             <Menu.Item key="download" onClick={() => record.Type === "Folder" ? downloadFolderAsZip(record) : downloadFile(record.FileUrl!, record.Name)}>
    //                 <DownloadOutlined /> Download
    //             </Menu.Item>
    //             <Menu.Item key="delete" danger>
    //                 <Popconfirm
    //                     title="Are you sure you want to delete this item?"
    //                     onConfirm={() => deleteItem(record)}
    //                     okText="Yes"
    //                     cancelText="No"
    //                 >
    //                     <DeleteOutlined /> Delete
    //                 </Popconfirm>
    //             </Menu.Item>
    //         </Menu>
    //     </div>
    // );

    return (

        <div className="container-fluid">
            <div className="row header">
                <div className="col-md-1 col-sm-1 w--2">
                    <a href="/../../SitePages/PatelEngineeringSafetyPortal.aspx#/">
                    
                                      {/* <a href="https://sharepointistech.sharepoint.com/sites/PatelEngineeringSafetyPortal/SitePages/PatelEngineeringSafetyPortal.aspx#/"> */}
                                      <img src={logo} className="logo-box" alt=" Logo" />
                                      </a>

                </div>
                <div className="col-md-11 col-sm-11 w--8">

                    <div>

                        <div>
                            <div className="txt-right">
                                <i
                                    className={`fa fa-bars  ftopbar ${isOpen ? 'open' : ''}`} // You can optionally change the icon style here
                                    id="toggleMenunew"
                                    onClick={toggleMenunew} // Call toggleMenu on click
                                ></i>
                            </div>

                            <div className={`nav-btn ${isOpen ? 'open' : ''}`} id="nav-section">
                                <div className="nav-links">
                                    <ul className="menubar1">
                                        {TopMenuCollData && TopMenuCollData.length > 0 ? (
                                            TopMenuCollData.filter(item => item.ParantId === 0).map((item) => (
                                                <li key={item.Id} className="nav-link navhover">
                                                    {item.Url?.startsWith("http") ? (
                                                        <a
                                                            href={item.Url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.Title}
                                                            {getChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                        </a>
                                                    ) : (
                                                        <Link to={item.Url || "#"}>
                                                            {item.Title}
                                                            {getChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                        </Link>
                                                    )}

                                                    {getChildren(item.Id).length > 0 && (
                                                        <div className="dropdown">

                                                            <ul>
                                                                {getChildren(item.Id).map((childItem) => (
                                                                    <li key={childItem.Id} className="dropdown-link">
                                                                        {childItem.Url?.startsWith("http") ? (
                                                                            // <a href={childItem.Url} target="_blank" rel="noopener noreferrer">
                                                                            //     {childItem.Title}
                                                                            // </a>
                                                                            <Link to={childItem.Title}>
                                                                                {childItem.Title}
                                                                            </Link>
                                                                        ) : (
                                                                            <Link to={childItem.Url || "#"} target="_blank" rel="noopener noreferrer">{childItem.Title}</Link>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))
                                        ) : (
                                            <div className="no-data">No data available</div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row subheader">

                <div className="col-md-1 col-sm-1 wid-10">
                    <div className="topheading">
                        <h2>Safety Portal</h2>

                    </div>
                </div>
                <div className="col-md-11 col-sm-11 w--8">
                    <div>
                        <div className="">
                            <div className="txt-right">
                                {/* <i className="fa fa-bars" id="toggleMenu2"></i> */}
                                <i
                                    className={`fa fa-bars fsubbar ${isOpensub ? 'open' : ''}`} // You can optionally change the icon style here
                                    id="toggleMenusub"
                                    onClick={toggleMensub} // Call toggleMenu on click
                                ></i>
                            </div>

                            <div className={`nav-btn  pl-10 subnav-btn ${isOpensub ? 'open' : ''}`} id="navsubsection">
                                <div className="nav-links">
                                    <ul className="menubar2">
                                        {SubMenuCollData && SubMenuCollData.length > 0 ? (
                                            SubMenuCollData.filter(item => item.ParantId === 0).map((item) => (
                                                <li key={item.Id} className="nav-link navhover">
                                                    <a href={item?.Url ? item?.Url : "javascript:void(0)"} target={item.Url ? "_blank" : "_self"} rel="noopener noreferrer">
                                                        {item.Title}
                                                        {/* Check if there are children and show dropdown icon */}
                                                        {getsubChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                    </a>
                                                    {/* If there are children, display the dropdown */}
                                                    {getsubChildren(item.Id).length > 0 && (
                                                        <div className="dropdown">
                                                            {/* <ul>
                                                                {getsubChildren(item.Id).map((childItem) => (
                                                                    <li key={childItem.Id} className="dropdown-link">
                                                                        <a href={childItem?.Url || '#'} target="_blank" rel="noopener noreferrer">
                                                                            {childItem.Title}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul> */}
                                                            <ul>
                                                                {getsubChildren(item.Id).map((childItem) => (
                                                                    <li key={childItem.Id} className="dropdown-link">
                                                                        {childItem.Url?.startsWith("http") ? (

                                                                            <Link to={childItem.Title}>
                                                                                {childItem.Title}
                                                                            </Link>
                                                                        ) : (
                                                                            <Link to={childItem.Url || "#"}>{childItem.Title}</Link>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))
                                        ) : (
                                            <div className="no-data">No data available</div>
                                        )}
                                    </ul>
                                </div>

                            </div>

                            <div className="hamburger-menu-container">
                                <div className="hamburger-menu">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className="col-md-2 col-sm-2 w--m2">
                  <div className="p-14">
                  <span className="cw">i</span>
                  <i className="fa fa-search"></i>
                  </div>
                  
                </div> */}
            </div>
            <div className='main-box'>
                <div className='row'>
                    <div className='col-md-4 col-sm-12 pl-3'>
                        <div className="topsubheader">

                            {/* <div className="LibraryFiles">
                                                    {currentItems.filter(item => item.Type === "Folder" && item.Name !== "Forms") // Only folders, excluding "Forms"
                                                        .map((record, index) => (
                                                            <div className="LibraryFilesalign" key={index} onClick={() => fetchItems9(record)}
                                                                onMouseEnter={(e) => e.currentTarget.style.background = "#f1f1f1"}
                                                                onMouseLeave={(e) => e.currentTarget.style.background = "#f9f9f9"}
                                                            >
                                                             <div className="foldersnames">
                                                                <span style={{ fontSize: "15px" }}>📁</span><span>{record.Name}</span>
                                                                <div className="filesnames" style={{display:'none'}}>
                                                                    <p>{record.Name}</p>
                                                                    <span >Date :{new Date(record.LastModified).toISOString().split('T')[0]}</span>
                                                                </div>  
                                                            </div>
                                                             
                                                        </div>
                                                        ))}
                                                </div> */}
                            <div className="LibraryFiles">
                                {FirsthrFolder
                                    .filter((item) => item.Type === "Folder" && item.Name !== "Forms") // Filter only folders excluding "Forms"
                                    .map((record, index) => (
                                        <div key={index} className="LibraryFilesalign">
                                            <div
                                                className="foldersnames"
                                                onClick={async (e) => {
                                                    const filesElement = e.currentTarget.nextSibling as HTMLElement;
                                                    const mainFun = e.currentTarget.closest('.foldersnames');
                                                    const folderName = e.currentTarget.querySelector(
                                                        "span.folderName"
                                                    ) as HTMLElement;
                                                    const toggleIcon = e.currentTarget.querySelector(
                                                        "span.toggleIcon"
                                                    ) as HTMLElement;

                                                    // const parentElement = document.querySelector('.parent-class');
                                                    // if(parentElement)
                                                    // {
                                                        
                                                    // }
                                                    const visibleElements = document.querySelectorAll(".foldersnames + .visible");
                                                    visibleElements.forEach((element) => {
                                                        element.classList.remove("visible");
                                            
                                                        // Reset toggle icons and folder names for previously expanded elements
                                                        const parentElement = element.previousSibling as HTMLElement; // Find the corresponding foldernames parent
                                                        if (parentElement) {
                                                            const prevToggleIcon = parentElement.querySelector(".toggleIcon") as HTMLElement;
                                                            const prevFolderName = parentElement.querySelector(".folderName") as HTMLElement;
                                                            if (prevToggleIcon) prevToggleIcon.textContent = "+"; // Reset icon
                                                            if (prevFolderName) prevFolderName.style.color = "black"; // Reset folder name color
                                                        }
                                                    });

                                                    if (filesElement?.classList.contains("visible")) {
                                                        filesElement.classList.remove("visible");
                                                        toggleIcon.textContent = "+";
                                                        folderName.style.color = "black";
                                                        if (breadcrumb.length > 1) {
                                                            let filtervalues = breadcrumb.filter((item, index) => {
                                                                if (index === 0) {
                                                                    return true;
                                                                }

                                                            })
                                                            setBreadcrumb(filtervalues);

                                                        }
                                                    } else if (filesElement) {
                                                        filesElement.classList.add("visible");
                                                        toggleIcon.textContent = "-";
                                                        folderName.style.color = "red";

                                                        const fetchedSubFolders = await FetchSubFolders(record);
                                                        if (fetchedSubFolders) {
                                                            setSubfolders(fetchedSubFolders); // Set state with subfolders
                                                        }
                                                        // const combinedData = await fetchFilesAndFolders(record);
                                                        fetchItems(record);


                                                    }
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                            >
                                                <span
                                                    className="toggleIcon"
                                                    style={{ fontSize: "15px", marginRight: "8px" }}
                                                >
                                                    +
                                                </span>
                                                <span style={{ fontSize: "13px", marginRight: "8px" }}>📁</span>
                                                <span className="folderName" style={{ fontSize: "13px" }}  /*onClick={() => fetchItems(record)}*/>
                                                    {record.Name}
                                                </span>
                                            </div>
                                            <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                {Array.isArray(Subfolders) &&
                                                    Subfolders.map((item, index) => (
                                                        <div key={index} className="foldersnames">
                                                            <div
                                                                onClick={(e) => {
                                                                    const filesElement = e.currentTarget.nextSibling as HTMLElement;
                                                                    const folderName = e.currentTarget.querySelector(
                                                                        "span.folderName"
                                                                    ) as HTMLElement;
                                                                    const toggleIcon = e.currentTarget.querySelector(
                                                                        "span.toggleIcon"
                                                                    ) as HTMLElement;

                                                                    if (filesElement?.classList.contains("visible")) {
                                                                        filesElement.classList.remove("visible");
                                                                        toggleIcon.textContent = "+";
                                                                        folderName.style.color = "black";
                                                                    } else if (filesElement) {
                                                                        filesElement.classList.add("visible");
                                                                        toggleIcon.textContent = "-";
                                                                        folderName.style.color = "red";
                                                                        fetchItems(item)
                                                                    }
                                                                }}
                                                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                                onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                                            >
                                                                {/* Only show + if subfolders exist */}
                                                                {Array.isArray(item.Subfolders) && item.Subfolders.length > 0 && (
                                                                    <span className="toggleIcon" style={{ fontSize: "13px", marginRight: "8px" }}>
                                                                        +
                                                                    </span>
                                                                )}
                                                                <span style={{ fontSize: "15px", marginRight: "8px" }}>📁</span>
                                                                <span className="folderName" style={{ fontSize: "13px" }}
                                                                >{item.Name}</span>
                                                            </div>

                                                            {/* Render nested subfolders recursively */}
                                                            {Array.isArray(item.Subfolders) && item.Subfolders.length > 0 && (
                                                                <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                                    {item.Subfolders.map((subItem, subIndex) => (
                                                                        <div key={subIndex} className="foldersnames">
                                                                            <div
                                                                                onClick={(e) => {
                                                                                    const subFilesElement = e.currentTarget.nextSibling as HTMLElement;
                                                                                    const subFolderName = e.currentTarget.querySelector(
                                                                                        "span.folderName"
                                                                                    ) as HTMLElement;
                                                                                    const subToggleIcon = e.currentTarget.querySelector(
                                                                                        "span.toggleIcon"
                                                                                    ) as HTMLElement;

                                                                                    if (subFilesElement?.classList.contains("visible")) {
                                                                                        subFilesElement.classList.remove("visible");
                                                                                        subToggleIcon.textContent = "+";
                                                                                        subFolderName.style.color = "black";
                                                                                    } else if (subFilesElement) {
                                                                                        subFilesElement.classList.add("visible");
                                                                                        subToggleIcon.textContent = "-";
                                                                                        subFolderName.style.color = "red";
                                                                                        fetchItems(subItem)
                                                                                    }
                                                                                }}
                                                                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                                                onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                                                            >
                                                                                {Array.isArray(subItem.Subfolders) && subItem.Subfolders.length > 0 && (
                                                                                    <span className="toggleIcon" style={{ fontSize: "13px", marginRight: "8px" }}>
                                                                                        +
                                                                                    </span>
                                                                                )}
                                                                                <span style={{ fontSize: "13px", marginRight: "8px" }}>📁</span>
                                                                                <span className="folderName" style={{ fontSize: "13px" }} >{subItem.Name}</span>
                                                                            </div>

                                                                            {/* Recursively render deeper subfolders */}
                                                                            {Array.isArray(subItem.Subfolders) && subItem.Subfolders.length > 0 && (
                                                                                <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                                                    {subItem.Subfolders.map((deepItem, deepIndex) => (
                                                                                        <div key={deepIndex} className="foldersnames">
                                                                                            <div key={subIndex} className="foldersnames">
                                                                                                <div
                                                                                                    onClick={(e) => {
                                                                                                        const subFilesElement = e.currentTarget.nextSibling as HTMLElement;
                                                                                                        const subFolderName = e.currentTarget.querySelector(
                                                                                                            "span.folderName"
                                                                                                        ) as HTMLElement;
                                                                                                        const subToggleIcon = e.currentTarget.querySelector(
                                                                                                            "span.toggleIcon"
                                                                                                        ) as HTMLElement;

                                                                                                        if (subFilesElement?.classList.contains("visible")) {
                                                                                                            subFilesElement.classList.remove("visible");
                                                                                                            subToggleIcon.textContent = "+";
                                                                                                            subFolderName.style.color = "black";
                                                                                                        } else if (subFilesElement) {
                                                                                                            subFilesElement.classList.add("visible");
                                                                                                            subToggleIcon.textContent = "-";
                                                                                                            subFolderName.style.color = "red";
                                                                                                            fetchItems(deepItem)
                                                                                                        }
                                                                                                    }}
                                                                                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                                                                    onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                                                                                >
                                                                                                    {Array.isArray(deepItem.Subfolders) && deepItem.Subfolders.length > 0 && (
                                                                                                        <span className="toggleIcon" style={{ fontSize: "13px", marginRight: "8px" }}>
                                                                                                            +
                                                                                                        </span>
                                                                                                    )}
                                                                                                    <span style={{ fontSize: "15px", marginRight: "8px" }}>📁</span>
                                                                                                    <span className="folderName" style={{ fontSize: "13px" }} >{deepItem.Name}</span>
                                                                                                </div>

                                                                                                {/* Recursively render deeper subfolders */}
                                                                                                {Array.isArray(deepItem.Subfolders) && deepItem.Subfolders.length > 0 && (
                                                                                                    <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                                                                        {deepItem.Subfolders.map((moredepItem, deepIndex) => (
                                                                                                            <div key={deepIndex} className="foldersnames">

                                                                                                                <div key={subIndex} className="foldersnames">
                                                                                                                    <div
                                                                                                                        onClick={(e) => {
                                                                                                                            const subFilesElement = e.currentTarget.nextSibling as HTMLElement;
                                                                                                                            const subFolderName = e.currentTarget.querySelector(
                                                                                                                                "span.folderName"
                                                                                                                            ) as HTMLElement;
                                                                                                                            const subToggleIcon = e.currentTarget.querySelector(
                                                                                                                                "span.toggleIcon"
                                                                                                                            ) as HTMLElement;

                                                                                                                            if (subFilesElement?.classList.contains("visible")) {
                                                                                                                                subFilesElement.classList.remove("visible");
                                                                                                                                subToggleIcon.textContent = "+";
                                                                                                                                subFolderName.style.color = "black";
                                                                                                                            } else if (subFilesElement) {
                                                                                                                                subFilesElement.classList.add("visible");
                                                                                                                                subToggleIcon.textContent = "-";
                                                                                                                                subFolderName.style.color = "red";
                                                                                                                                fetchItems(moredepItem);
                                                                                                                            }
                                                                                                                        }}
                                                                                                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                                                                                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                                                                                                    >
                                                                                                                        {Array.isArray(moredepItem.Subfolders) && moredepItem.Subfolders.length > 0 && (
                                                                                                                            <span className="toggleIcon" style={{ fontSize: "13px", marginRight: "8px" }}>
                                                                                                                                +
                                                                                                                            </span>
                                                                                                                        )}
                                                                                                                        <span style={{ fontSize: "13px", marginRight: "8px" }}>📁</span>
                                                                                                                        <span className="folderName" style={{ fontSize: "13px" }} >{moredepItem.Name}</span>
                                                                                                                    </div>

                                                                                                                    {/* Recursively render deeper subfolders */}
                                                                                                                    {Array.isArray(moredepItem.Subfolders) && moredepItem.Subfolders.length > 0 && (
                                                                                                                        <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                                                                                            {moredepItem.Subfolders.map((secondmoreItem, deepIndex) => (
                                                                                                                                <div key={deepIndex} className="foldersnames">
                                                                                                                                    <div key={secondmoreItem} className="foldersnames">
                                                                                                                                        <div
                                                                                                                                            onClick={(e) => {
                                                                                                                                                const subFilesElement = e.currentTarget.nextSibling as HTMLElement;
                                                                                                                                                const subFolderName = e.currentTarget.querySelector(
                                                                                                                                                    "span.folderName"
                                                                                                                                                ) as HTMLElement;
                                                                                                                                                const subToggleIcon = e.currentTarget.querySelector(
                                                                                                                                                    "span.toggleIcon"
                                                                                                                                                ) as HTMLElement;

                                                                                                                                                if (subFilesElement?.classList.contains("visible")) {
                                                                                                                                                    subFilesElement.classList.remove("visible");
                                                                                                                                                    subToggleIcon.textContent = "+";
                                                                                                                                                    subFolderName.style.color = "black";
                                                                                                                                                } else if (subFilesElement) {
                                                                                                                                                    subFilesElement.classList.add("visible");
                                                                                                                                                    subToggleIcon.textContent = "-";
                                                                                                                                                    subFolderName.style.color = "red";

                                                                                                                                                }
                                                                                                                                            }}
                                                                                                                                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f1f1")}
                                                                                                                                            onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                                                                                                                        >
                                                                                                                                            {Array.isArray(secondmoreItem.Subfolders) && secondmoreItem.Subfolders.length > 0 && (
                                                                                                                                                <span className="toggleIcon" style={{ fontSize: "13px", marginRight: "8px" }}>
                                                                                                                                                    +
                                                                                                                                                </span>
                                                                                                                                            )}
                                                                                                                                            <span style={{ fontSize: "13px", marginRight: "8px" }}>📁</span>
                                                                                                                                            <span className="folderName" style={{ fontSize: "13px" }} onClick={(e) => fetchItems(secondmoreItem)}>{secondmoreItem.Name}</span>
                                                                                                                                        </div>

                                                                                                                                        {/* Recursively render deeper subfolders */}
                                                                                                                                        {Array.isArray(secondmoreItem.Subfolders) && secondmoreItem.Subfolders.length > 0 && (
                                                                                                                                            <div className="filesnames hidden" style={{ paddingLeft: "20px" }}>
                                                                                                                                                {secondmoreItem.Subfolders.map((thirddeepItem, deepIndex) => (
                                                                                                                                                    <div key={deepIndex} className="foldersnames">
                                                                                                                                                        {/* Repeat deeper levels */}
                                                                                                                                                    </div>
                                                                                                                                                ))}
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            ))}
                                                                                                                        </div>
                                                                                                                    )}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>







                        </div>
                    </div>
                    <div className='col-md-8 col-sm-12 pr-2'>
                        <div className='content-main-container-Library'>
                            <div className='container-fluid content-main-Library' style={{ padding: '0 8px' }}>
                                <div className="row">
                                    <div className="col-md-12 topheader">
                                        <div className="breadcrumbutton">

                                            <div className="breadcrumbutton-text">
                                                <Link className="homebutton" to={'/'} >Home</Link>
                                                <span></span>
                                                {breadcrumb.length === 0 ? " Libraries" : breadcrumb.map((item, index) => (

                                                    <span key={index} onClick={() => navigateBack(index)} >
                                                        <span >{">"}</span>
                                                        <span className="breadbox"> {"  " + item.Name}</span>
                                                    </span>
                                                ))}
                                            </div>
                                            <Link to={'/'} className="backButton" style={{ display: 'none' }}>
                                                <span className="buttonText">Back</span>
                                                <span className="circle">
                                                    <span className="arrow">&larr;</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className="blockLibrary  pt-10">
                                            <div className="blockLibrary-head">
                                                <div className="blockLibrary-head-left" style={{ display: 'none' }}>
                                                    <span>Document Libraries and Knowledge</span>
                                                </div>
                                                <div >


                                                    <select className="SelectCategory" onChange={handleCategoryChange} value={selectedCategory} style={{ display: 'none' }}>
                                                        <option value="">All</option>
                                                        {categories.map((category, index) => (
                                                            <option key={index} value={category}>
                                                                {category}
                                                            </option>
                                                        ))}
                                                    </select>



                                                    {/* <SearchBox
                                                    className="Sealib"
                                                    placeholder="Search"
                                                    onSearch={(newValue) => console.log('Search value is ' + newValue)}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    disableAnimation
                                                /> */}
                                                    <span className="Uploadbox">
                                                        <Button icon={<PlusOutlined />} onClick={openModal} type="primary" className="UploadButton uploadbtn">
                                                            New
                                                        </Button>
                                                    </span>
                                                    <Upload className="Uploadbox " multiple beforeUpload={() => false}
                                                        onChange={({ fileList }) => handleFileUpload(fileList.map((file) => file.originFileObj as File))}
                                                        showUploadList={true}>
                                                        <Button icon={<UploadOutlined />} type="primary" className="UploadButton uploadbtn">
                                                            Upload
                                                        </Button>
                                                    </Upload>
                                                    <div className="popbox" style={{ display: 'none' }}>
                                                        <h3>Create Folder</h3>
                                                        <div className="ptb-22"><label>Name</label></div>
                                                        <div >
                                                            <Input
                                                                placeholder="Enter new folder name"
                                                                value={newFolderName}
                                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                                style={{ width: 200, marginRight: 10 }}
                                                            />
                                                            <div><Button type="primary" icon={<PlusOutlined />} onClick={handleCreateFolder}>
                                                                Create Folder
                                                            </Button></div>
                                                        </div>


                                                    </div>


                                                    <div style={{ marginTop: '20px' , display: 'none'}}>

                                                        {/* <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateFolder}>Create Folder </Button>                                                            <Button onClick={closeModal} className="closebtnmodel">Close</Button> Use children for button label */}
                                                    </div>

                                                    <div>


                                                        <Modal
                                                            isOpen={isModalOpen}
                                                            onDismiss={closeModal}
                                                            isBlocking={false} // This allows interaction with the rest of the page when the modal is open
                                                            containerClassName="ms-dialogMainOverride"
                                                        >
                                                            <div style={{ padding: '0 0 0 0' }}>
                                                                <h3 className="modelbox">Create a folder</h3>
                                                                {/* <TextField
                                                            label="Name"
                                                            value={inputValue}
                                                            onChange={handleInputChange}
                                                        /> */}

                                                                <div className="p-20">
                                                                    <Input
                                                                        placeholder="Enter new folder name"
                                                                        value={newFolderName}
                                                                        onChange={(e) => setNewFolderName(e.target.value)}
                                                                        className="modelinput"
                                                                    />
                                                                    <Button type="primary" className="createbtn" onClick={handleCreateFolder}>
                                                                        Create
                                                                    </Button>
                                                                    <Button type="primary" className="closebtn" onClick={closeModal}>Cancel</Button>
                                                                </div>

                                                            </div>
                                                        </Modal>
                                                    </div>

                                                 

                                                </div>
                                                <div style={{marginTop:'10px'}}>
                                                    <Input.Search
                                                        placeholder="Find a File"
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="Sealib"
                                                        allowClear
                                                    />
                                                </div>
                                            </div>
                                            <div className="blockLibrary-content">
                                                <div className="LibraryContainer">
                                                    {recentFiles.length > 0 && breadcrumb.length > 0 && (
                                                        <div className="mainFilebox" style={{ display: 'none' }}>
                                                            <h4>Recently Accessed</h4>
                                                            <div className="LibraryFiles">
                                                                {recentFiles.map((record, index) => (
                                                                    <div className="LibraryFilesalign" key={index} onClick={() =>
                                                                        record.Type === "Folder"
                                                                            ? fetchItems(record) // Fetch items if it's a folder
                                                                            : downloadFile(record.FileUrl!, record.Name)
                                                                    }
                                                                        onMouseEnter={(e) => e.currentTarget.style.background = "#f1f1f1"}
                                                                        onMouseLeave={(e) => e.currentTarget.style.background = "#f9f9f9"}
                                                                    >
                                                                        {/* File/Folder Icon */}
                                                                        <div className="foldersnames">
                                                                            {record.Type === "Folder" ? (
                                                                                <span>📁</span>
                                                                            ) : (
                                                                                getFileIcon1(record.Name, record.Type)
                                                                            )}
                                                                            <div className="filesnames">
                                                                                {/* File/Folder Name */}
                                                                                <p>{record.Name}</p>
                                                                                {/* Last Modified Date */}
                                                                                {/* <span>{formatDate(record.LastModified)}</span> */}
                                                                                <span style={{ display: 'none' }}>Date :{new Date(record.LastModified).toISOString().split('T')[0]}</span>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* <div>
                                                <strong>Path:</strong>
                                                {breadcrumb.length === 0 ? " Libraries" : breadcrumb.map((item, index) => (
                                                    <span key={index} style={{ cursor: "pointer", color: "blue" }} onClick={() => navigateBack(index)}>
                                                        {" > " + item.Name}
                                                    </span>
                                                ))}
                                            </div> */}
                                                    {breadcrumb.length === 0 && (
                                                        <ul className="Files">
                                                            {libraries.map((lib) => (
                                                                <li key={lib.Name} onClick={() => fetchItems(lib)} style={{ cursor: "pointer", color: "blue" }}>
                                                                    📁 {lib.Name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {/* ------------        For Folders         ---------------*/}


                                                    {breadcrumb.length === 0 && (
                                                        <ul>
                                                            {libraries.map((lib) => (
                                                                <li key={lib.Name} onClick={() => fetchItems(lib)} style={{ cursor: "pointer", color: "blue" }}>
                                                                    📁 {lib.Name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {breadcrumb?.length > 0 && (
                                                        <Table className="Maintable" //dataSource={filteredItems.filter(item => (item.Name != "Forms"))}
                                                            dataSource={filteredItems.filter(item => item.Name !== "Forms" &&
                                                                (selectedCategory === "" || item.Category === selectedCategory) // Filter logic
                                                            )}
                                                            columns={[
                                                                {
                                                                    title: "Name",
                                                                    dataIndex: "Name",
                                                                    key: "Name",
                                                                    render: (text, record) => (
                                                                        <span 
                                                                                className="filetext" 
                                                                                onClick={() => {
                                                                                    if (record.Type === "Folder") {
                                                                                    fetchItems(record); // If it's a folder, fetch items
                                                                                    } else {
                                                                                    const fileExtension = record.Name.split('.').pop().toLowerCase(); // Get file extension
                                                                                    if (fileExtension === 'docx' || fileExtension === 'xlsx' || fileExtension === 'pdf') {
                                                                                        // If it's a Word or Excel file, open it in a new tab
                                                                                        window.open(record.FileUrl, '_blank');
                                                                                    } else {
                                                                                        // Otherwise, download the file
                                                                                        downloadFile(record.FileUrl, record.Name);
                                                                                    }
                                                                                    }
                                                                                }} 
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                >
                                                                                {getFileIcon(record.Name, record.Type)} {" " + text}
                                                                                </span>
                                                                        // title: "Name",
                                                                        // dataIndex: "Name",
                                                                        // key: "Name",
                                                                        // render: (text, record) => (
                                                                        //     <span
                                                                        //         // onClick={() =>
                                                                        //         //     record.Type === "Folder" ? fetchItems(record) : downloadFile(record.FileUrl!, record.Name)
                                                                        //         // }
                                                                        //         style={{
                                                                        //             cursor: "pointer",
                                                                        //             color: record.Type === "Folder" ? "blue" : "black",
                                                                        //             display: "flex",
                                                                        //             justifyContent: "space-between",
                                                                        //             alignItems: "center",
                                                                        //         }}
                                                                        //     >
                                                                        //         {getFileIcon(record.Name, record.Type)} {text}
                                                                        //         <Dropdown overlay={getActionMenu(record)} trigger={["hover"]}>
                                                                        //             <MoreOutlined style={{ cursor: "pointer", fontSize: "18px", color: "#555" }} />
                                                                        //         </Dropdown>
                                                                        //     </span>
                                                                    ),
                                                                },


                                                                {
                                                                    title: "Modified",
                                                                    key: "LastModifiedDetails",
                                                                    render: (_, record) => (
                                                                        <span >

                                                                            {/* <small onClick={openclose} style={{ color: "#000", fontSize: '20px', fontWeight: '500', paddingRight: '10px' }}> ...</small> */}

                                                                            {record.LastModified}
                                                                            {record.ModifiedBy && (
                                                                                <>
                                                                                    <br />


                                                                                </>
                                                                            )}
                                                                            {isVisible && (
                                                                                <div className="hodeshowbox">
                                                                                    <small >
                                                                                        {record.Type === "Folder" ? (
                                                                                            <EyeOutlined
                                                                                                onClick={() => downloadFolderAsZip(record)}
                                                                                                style={{ marginRight: 8, cursor: "pointer" }}
                                                                                            />
                                                                                        ) : (
                                                                                            <EyeOutlined
                                                                                                onClick={() => downloadFile(record.FileUrl!, record.Name)}
                                                                                                style={{ marginRight: 8, cursor: "pointer" }}
                                                                                            />
                                                                                        )}
                                                                                        {record.Type === "Folder" ? (
                                                                                            <DownloadOutlined
                                                                                                onClick={() => downloadFolderAsZip(record)}
                                                                                                style={{ marginRight: 8, cursor: "pointer" }}
                                                                                            />
                                                                                        ) : (
                                                                                            <DownloadOutlined
                                                                                                onClick={() => downloadFile(record.FileUrl!, record.Name)}
                                                                                                style={{ marginRight: 8, cursor: "pointer" }}
                                                                                            />
                                                                                        )}
                                                                                      
                                                                                            <DeleteOutlined 
                                                                                            onClick={() => deleteItem(record)}
                                                                                            style={{ color: "red", cursor: "pointer" }} />
                                                                                        
                                                                                    </small>
                                                                                </div>
                                                                            )}

                                                                        </span>
                                                                    ),
                                                                },
                                                                {
                                                                    title: "Modified By",
                                                                    key: "LastModifiedDetails",
                                                                    render: (_, record) => (
                                                                        <span>

                                                                            {record.ModifiedBy && (
                                                                                <>


                                                                                    <small style={{ color: "#888" }}> {record.ModifiedBy}</small>
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                    ),
                                                                },
                                                                {
                                                                    title: "Actions",
                                                                    key: "actions",
                                                                    render: (_, record) =>
                                                                    (
                                                                        <>

                                                                            {record.Type === "Folder" ? (
                                                                                <EyeOutlined
                                                                                    onClick={() => downloadFolderAsZip(record)}
                                                                                    style={{ marginRight: 8, cursor: "pointer" }}
                                                                                />
                                                                            ) : (
                                                                                <EyeOutlined
                                                                                    onClick={() => downloadFile(record.FileUrl!, record.Name)}
                                                                                    style={{ marginRight: 8, cursor: "pointer" }}
                                                                                />
                                                                            )}
                                                                            {record.Type === "Folder" ? (
                                                                                <DownloadOutlined
                                                                                    onClick={() => downloadFolderAsZip(record)}
                                                                                    style={{ marginRight: 8, cursor: "pointer" }}
                                                                                />
                                                                            ) : (
                                                                                <DownloadOutlined
                                                                                    onClick={() => downloadFile(record.FileUrl!, record.Name)}
                                                                                    style={{ marginRight: 8, cursor: "pointer" }}
                                                                                />
                                                                            )}
                                                                         
                                                                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }}
                                                                                 onClick={() => deleteItem(record)}
                                                                                />
                                                                            

                                                                        </>
                                                                    ),
                                                                },
                                                            ]}

                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}


