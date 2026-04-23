import * as React from 'react';
import { useState, useMemo } from 'react';
import USESPCRUD, { ISPCRUD } from '../../../services/bal/spcrud';
//import topimage from '../../assets/Safety Portal Images/topdeptimg.png';
import topimage from '../../assets/Safety Portal Images/topdeptimglatest.png';
import bottomimage from '../../assets/Safety Portal Images/bottomdeptimg.png';
// import topimage from '../../assets/Safety Portal Images/topimage.png';
// import bottomimage from '../../assets/Safety Portal Images/bottomimage.png';
import { ITopMenu } from '../../../services/interface/ITopMenu';
import { ISubMenu } from '../../../services/interface/ISubMenu';
import { ITopbanner } from '../../../services/interface/ITopBanner';
import { ICeoMessage }  from '../../../services/interface/ICeoMessage';
import {IAnnouncements}  from '../../../services/interface/IAnnouncements';
import  {IAwardsRecolonization}  from '../../../services/interface/IAwardsRecolonization';
import  {IPolicies}  from '../../../services/interface/IPolicies';
import  {ITrainingResources}  from '../../../services/interface/ITrainingResources';
import  {ICertificates}  from '../../../services/interface/ICertificates';
import  {IDownloads } from '../../../services/interface/IDownloads';
import  {IQuickLinks}  from '../../../services/interface/IQuickLinks';
import  {IEvents}  from '../../../services/interface/IEvents';
import  {IEventGallary}  from '../../../services/interface/IEventGallary';
import { ISiteName } from '../../../services/interface/ISiteName';
import ISiteNameOps from '../../../services/bal/SiteName';

import ITopMenuOps from '../../../services/bal/TopMenu'; 
import ISubMenuOps from '../../../services/bal/SubMenu';
import ITopBannerOps from '../../../services/bal/TopBanner';
import ICeoMessageOps from '../../../services/bal/CeoMessage';
import IAnnouncementsOps from '../../../services/bal/Announcements';
import IAwardsRecolonizationOps from '../../../services/bal/AwardsRecolonization';
import IPoliciesOps from '../../../services/bal/Policies';
import ITrainingResourcesOps from '../../../services/bal/TrainingResources';
import ICertificatesOps from '../../../services/bal/Certificates';
import IDownloadsOps from '../../../services/bal/Downloads';
import IQuickLinksOps from '../../../services/bal/QuickLinks';
import IEventsOps from '../../../services/bal/Events';
import IEventGallaryOps from '../../../services/bal/EventGallary';
import { IChildrenSafety } from '../../../services/interface/IChildrenSafety';
import IChildrenSafetyOps from '../../../services/bal/ChildrenSafety';
import awardicon from '../../assets/Safety Portal Images/trophy.png';


import Slider from 'react-slick';
import { ISafetyPortalProps } from '../../../services/interface/ISafetyPortalProps';
import './SPlandingpage.scss';
import UserProfileOps from '../../../services/bal/UserProfile';



import { Route, Switch } from "react-router";
// import { BrowserRouter, Link, HashRouter } from "react-router-dom";
import { useHistory, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
// import * as $ from 'jquery';
import * as bootstrap from "bootstrap";
import { Formik, FormikProps, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
import { Theme, ThemeProvider, ImageFit } from '@fluentui/react';

import { Modal, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
import { sp } from '@pnp/sp';
import { update } from '@microsoft/sp-lodash-subset';
import patelfooterlogo from '../../assets/Safety Portal Images/patelfooterlogo.png';
import patelnewlogo from '../../assets/Safety Portal Images/patelnewlogo.png';


// -------------------------     Images import    --------------------------------



//------------------ Logo --------------

import logo from '../../assets/Safety Portal Images/logonew.png';

// ---------------------------------------------------------


// --------------  word and PDF       -------------------

import wordlogo from '../../assets/Safety Portal Images/spword.png';
import pdflogo from '../../assets/Safety Portal Images/pdf.png';

// ---------------------------------------------------------


// -------------   next and perviouse Arrow -----------

import previewArrow from '../../assets/Safety Portal Images/PreviewArrow.png';
import nextArrow from '../../assets/Safety Portal Images/NextArrow.png';

import { SPPermission } from "@microsoft/sp-page-context";


export const IIIHubHome: React.FunctionComponent<ISafetyPortalProps> = (props: ISafetyPortalProps) => {
    let GroupData = [];
    const [spCrud, setSPCRUD] = React.useState<ISPCRUD>();
    const [selectedTitle, setSelectedTitle] = useState(null);
     const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
 const [SiteNameCollData, setSiteNameCollData] = useState<ISiteName[]>();
    const [TopMenuCollData, setTopMenuCollData] = React.useState<ITopMenu[]>();
    const [SubMenuCollData, setSubMenuCollData] = React.useState<ISubMenu[]>();
    const [TopBannerCollData, setTopBannerCollData] = React.useState<ITopbanner[]>();
    const [CeoMessageCollData, setCeoMessageCollData] = React.useState<ICeoMessage[]>();
    const [AnnouncementsCollData, setAnnouncementsCollData] = React.useState<IAnnouncements[]>();
    const [AwardsRecolonizationCollData, setAwardsRecolonizationCollData] = React.useState<IAwardsRecolonization[]>();
      
    const [PoliciesCollData, setPoliciesCollData] = React.useState<IPolicies[]>();
    const [TrainingResourcesCollData, setTrainingResourcesCollData] = React.useState<ITrainingResources[]>();
    const [CertificatesCollData, setCertificatesCollData] = React.useState<ICertificates[]>();
    const [DownloadsCollData, setDownloadsCollData] = React.useState<IDownloads[]>();
    const [QuickLinksCollData, setQuickLinksCollData] = React.useState<IQuickLinks[]>();
    const [EventGallaryCollData, setEventGallaryCollData] = React.useState<IEventGallary[]>();
    const [EventsCollData, setEventsCollData] = React.useState<IEvents[]>();
   const [expandedId, setExpandedId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupAwards, setShowPopupAwards] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
       const [showPopupevent, setShowPopupevent] = useState(false);
       const [selectedIndex, setSelectedIndex] = useState(0);
      const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
      const [ChildrenSafetyCollData, setChildrenSafetyCollData] = useState<IChildrenSafety[]>();
const [showAwardsPopup, setShowAwardsPopup] = useState(false);

    const openPopup = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
   
    };

    const closePopupAwards  = () => {
    setShowPopupAwards(false);
    setSelectedItem(null);
    };
     const openPopupAwards  = (item) => {
    setSelectedItem(item);
    setShowPopupAwards(true);
    
    };
 
    const closePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
    };
    const closePopupAwardsevent  = () => {
    setShowPopupevent(false);
    setSelectedItem(null);
    };
     const openPopupAwardsevent  = (index) => {
    setSelectedIndex(index);
    setShowPopupevent(true);
    };
    const openAnnouncementPopup = (item) => {
  setShowAwardsPopup(false);        // 🔴 CLOSE awards popup
  setSelectedItem(item);
  setShowAnnouncementPopup(true);  // 🟢 OPEN announcement popup
};
const openAwardsPopup = (item) => {
  setShowAnnouncementPopup(false); // 🔴 CLOSE announcement popup
  setSelectedItem(item);
  setShowAwardsPopup(true);        // 🟢 OPEN awards popup
};
const closeAnnouncementPopup = () => {
  setShowAnnouncementPopup(false);
  setSelectedItem(null);
};

const closeAwardsPopup = () => {
  setShowAwardsPopup(false);
  setSelectedItem(null);
};
    const sliderSettingsevent = {
  dots: true,
  infinite: true, 
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,   
  initialSlide: selectedIndex, 
  autoplaySpeed: 5000,  
};
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isOpensub, setIsOpensub] = useState(false);

    const [activeArticle, setActiveArticle] = useState<number | null>(null);
    const history = useHistory();

    let spCrudObj: ISPCRUD;
    let itemsPerPage: number;
    itemsPerPage = 1;
    const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    };

    const getLoggedInUserGroups = async () => {
        let spCrudObj: ISPCRUD;
        spCrudObj = await USESPCRUD();
        return spCrudObj.getLoggedInSiteGroups(props).then((brrLoggedColl) => {
          console.log(brrLoggedColl);
          return brrLoggedColl;
    
        }, error => {
          console.log(error);
        });
    
      }
        const [displayName, setDisplayName] = useState("");
  const userProfile = async () => { 
    return await UserProfileOps().getLoggUserProfile(props).then(UserProfileresults => {
        return UserProfileresults;
    });
};
    function getFileLogo(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
          case 'doc':
            return wordlogo;
          case 'docx':
            return wordlogo;
          case 'pdf':
            return pdflogo;
          case 'rar':
            return '/path/to/assets/rar.png';
          // Add more cases for other file types as needed
          default:
            return '/path/to/assets/default.png';   
        }
      } 
 
    React.useEffect(() => {
 userProfile().then(res => {
      setDisplayName(res.DisplayName);
    });
   
    //         const isAdmin = props.context.pageContext.legacyPageContext.isSiteAdmin;

    // const hideGear = () => {
  
    //   const gear =
    //     document.querySelector('[data-automation-id="SettingsButton"]') ||
    //     document.querySelector('button[aria-label="Settings"]');

    //   if (gear && !isAdmin) {
    //     (gear as HTMLElement).style.display = "none";
    //   }
    // };

    // // run immediately
    // hideGear();

    // // run again after header loads
    // const interval = setInterval(() => {
    //   hideGear();
    // }, 1000);

    // return () => clearInterval(interval);

  

    
         // --------------------------------------- Sub Menu part ---------------------------------------

            getLoggedInUserGroups().then((brrUesrLoggedColl) => {
              const GroupData = [];
              const GroupDataTitle = [];
              
              brrUesrLoggedColl.map(brritems => {
                GroupData.push(brritems.Id); // Populate the GroupData array with group IDs
                GroupDataTitle.push(brritems.Title); // Populate the GroupData array with group IDs
            
              });
            
              console.log('User Groups:', GroupData);
              
              if (GroupData.length !== 0) {
                // Now fetch submenu data after updating GroupData
                // ISubMenuOps().getSubMenuData(props).then((SubMenuColl) => {
                //   console.log('SubMenu Data received:', SubMenuColl);
            
                //   // Set the fetched submenu data 
                //   setSubMenuCollData(SubMenuColl);
             
                //   // Filter submenu data based on the user's group access
                //   const filteredSubMenu = SubMenuColl.filter(item => {
                //     // Check if the item has GroupAccess and compare it with GroupData
                //     if (item.GroupAccess && Array.isArray(item.GroupAccess)) {
                //       // Check if there's any intersection between the user's groups and the item's GroupAccess
                //       return item.GroupAccess.some(group => GroupData.includes(group.Id));
                //     }
                //     return true; // If no GroupAccess defined, show the item by default
                //   });
            
                //   // Set the filtered submenu data
                //   setSubMenuCollData(filteredSubMenu);
                  
                // }, error => {
                //   console.error('Error fetching submenu data:', error);
                // });
              }
              ISubMenuOps().getSubMenuData(props).then((SubMenuColl) => {
                    console.log('SubMenu Data received:', SubMenuColl);

                    // Set all fetched submenu data without filtering
                    setSubMenuCollData(SubMenuColl);

                }, error => {
                    console.error('Error fetching submenu data:', error);
                });
            }, error => {
              console.log('Error fetching user group data:', error);
            });

        // --------------------------------------- Top Menu part ---------------------------------------

            ITopMenuOps().getTopMenuData(props).then((TopMenuColl) => {
              console.log(' TopMenu Data received:', TopMenuColl);
              setTopMenuCollData(TopMenuColl);
            }, error => {
              console.error('Error fetching data:', error);
            });
        ISiteNameOps().getSiteNameData(props).then((SiteNameColl) => {
        console.log(' SiteName Data received:', SiteNameColl);
        setSiteNameCollData(SiteNameColl);
        }, error => {
        console.error('Error fetching data:', error);
        });



        // --------------------------------------- Banner part ---------------------------------------

        ITopBannerOps().getTopBanners("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Created', isAscending: false }, 1000, props)
            .then(results => {
                setTopBannerCollData(results);
            });


        // --------------------------------------- CeoMessage part ---------------------------------------
        
        //  ICeoMessageOps().getTopCeoMessages("*,File/Name,EncodedAbsUrl,Modified", "File",
        //     "Status eq 'Active'", { column: 'Id', isAscending: false }, 1, props)
        //     .then((results) => {
        //         const filteredResults = results.filter(item => item.Status === 'Active');

        //         const charLimit = 450; // Limit to 450 characters
        //         const processedResults = filteredResults.map(item => {
        //             const truncateCharacters = (text, limit) => {
        //                 return text.length > limit ? text.substring(0, limit) + '...' : text;
        //             };
        //             // Apply truncation to the necessary property
        //             item.CeoMessage = truncateCharacters(item.CeoMessage, charLimit);
        //             return item;
        //         });

        //         setCeoMessageCollData(processedResults.slice(0, 1)); // Limit to 3 items
        //     });            
ICeoMessageOps().getTopCeoMessages("*,File/Name,EncodedAbsUrl,Modified", "File",
    "Status eq 'Active'", { column: 'Id', isAscending: false }, 1, props)
    .then((results) => {
        const filteredResults = results.filter(item => item.Status === 'Active');

        // No character limit or truncation
        const processedResults = filteredResults.map(item => {
            return item; // Just return the item as-is
        });

        setCeoMessageCollData(processedResults.slice(0, 1)); // Still limiting to 1 item
    });
        // ---------------------------------------  Announcement part  ---------------------------------------

        // IAnnouncementsOps().getTopAnnouncements("*,File/Name,EncodedAbsUrl,Modified", "File",
        //     "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
        //     .then((results) => {
        //         const filteredResults = results.filter(item => item.Status === 'Active');

        //         const charLimit = 120; // Limit to 120 characters
        //         const processedResults = filteredResults.map(item => {
        //             const truncateCharacters = (text, limit) => {
        //                 return text.length > limit ? text.substring(0, limit) + '...' : text;
        //             };
        //             // Apply truncation to the necessary property
        //             item.SubHeader = truncateCharacters(item.SubHeader, charLimit);
        //             item.AnnouncementDescription = truncateCharacters(item.AnnouncementDescription, charLimit);
        //             return item;   
        //         });

        //         setAnnouncementsCollData(processedResults.slice(0, 3)); // Limit to 3 items
        //     });
     
        IAnnouncementsOps().getTopAnnouncements("*,File/Name,EncodedAbsUrl,AnnouncementsFileUrl,Modified","File", "Status eq 'Active'",
                                { column: 'Id', isAscending: false },
                                3,
                                props
                            )
                            .then((results) => {
                                const filteredResults = results.filter(item => item.Status === 'Active');

                                const charLimit = 120;

                                const truncateCharacters = (text: string, limit: number) =>
                                text && text.length > limit ? text.substring(0, limit) + '...' : text;

                                const processedResults = filteredResults.map(item => ({
                                ...item,

                                // Truncated fields (for list / preview)
                                SubHeaderShort: truncateCharacters(item.SubHeader, charLimit),
                                AnnouncementDescriptionShort: truncateCharacters(item.AnnouncementDescription, charLimit),

                                // Full fields (for details / modal / read more)
                                SubHeaderFull: item.SubHeader,
                                AnnouncementDescriptionFull: item.AnnouncementDescription
                                }));
 
                                setAnnouncementsCollData(processedResults.slice(0, 3));
                            });
 
        // ---------------------------------------  AwardsRecolonization part  ---------------------------------------
  
IAwardsRecolonizationOps().getTopAwardsRecolonizations(
    "*,File/Name,EncodedAbsUrl,Modified",
    "File",
    "Status eq 'Active'",
    { column: 'Id', isAscending: false },
    3,
    props
)
.then((results) => {
    // Filter only Active items
    const filteredResults = results.filter(item => item.Status === 'Active');

    // Keep only full descriptions
    const processedResults = filteredResults.map(item => ({
        ...item,
        AwardsDescriptionFull: item.AwardsDescription || ''
    }));

    // Store up to 3 items
    setAwardsRecolonizationCollData(processedResults.slice(0, 3));
});
IChildrenSafetyOps().getIChildrenSafetyData(props).then((IChildrenSafetyColl) => {
          console.log('Children Safety Data received:', IChildrenSafetyColl);
          setChildrenSafetyCollData(IChildrenSafetyColl);
        })
        .catch((error) => {
          console.error('Error fetching SiteAnnouncements data:', error);
        });

        // IAwardsRecolonizationOps().getTopAwardsRecolonizations("*,File/Name,EncodedAbsUrl,Modified", "File",
        //     "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
        //     .then((results) => {
        //         const filteredResults = results.filter(item => item.Status === 'Active');

        //         const charLimit = 350; // Limit to 120 characters
        //         const processedResults = filteredResults.map(item => {
        //             const truncateCharacters = (text, limit) => {
        //                 return text.length > limit ? text.substring(0, limit) + '...' : text;
        //             };
        //             // Apply truncation to the necessary property
        //             item.AwardsDescription = truncateCharacters(item.AwardsDescription, charLimit);
        //             return item;
        //         });   

        //         setAwardsRecolonizationCollData(processedResults.slice(0, 3)); // Limit to 3 items
        //     });


        // --------------------------------------- Policie part ---------------------------------------

        IPoliciesOps().getTopPolicies("*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then(results => {
                setPoliciesCollData(results);
            });


        // --------------------------------------- Resource part ---------------------------------------

        ITrainingResourcesOps().getTopTrainingResources("*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then(results => {
                setTrainingResourcesCollData(results);
            });



        // --------------------------------------- Certificate part ---------------------------------------

        ICertificatesOps().getTopCertificates("*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then(results => {
                setCertificatesCollData(results);
            });



        // --------------------------------------- Download part ---------------------------------------

        IDownloadsOps().getTopDownloads("*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then(results => {
                setDownloadsCollData(results);
            });

        // --------------------------------------- Quicklink part ---------------------------------------

        IQuickLinksOps().getTopQuickLinks("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 4, props)
            .then(results => {
                setQuickLinksCollData(results);
            });

        // --------------------------------------- Resource part ---------------------------------------
 
        IEventsOps().getTopEvents("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then(results => {
                setEventsCollData(results);
                console.log("Event Data", results); 
            });
   
        // --------------------------------------- Resource part ---------------------------------------

        IEventGallaryOps().getTopEventGallarys("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 6, props)
            .then(results => {
                setEventGallaryCollData(results);
            });    

// code for alphabetic order 
let lastSorted = "";

  const trySort = () => {
    const menuList = document.querySelector(".ms-ContextualMenu-list");  
    if (!menuList) return;

    // get visible menu text of first item → used to prevent re-sorting same menu
    const firstItemText = menuList.querySelector("span")?.textContent || "";

    // Skip if already sorted
    if (lastSorted === firstItemText) return;

    lastSorted = firstItemText;

    const items = Array.from(menuList.querySelectorAll("li"));
    if (items.length === 0) return;

    // Sort alphabetically
    const sorted = items.sort((a, b) =>
      (a.querySelector("span")?.textContent || "")
        .localeCompare(b.querySelector("span")?.textContent || "")
    );

    // Replace items
    menuList.innerHTML = "";
    sorted.forEach(li => menuList.appendChild(li));

    console.log("Menu sorted instantly ✔");
  };

  // Very lightweight observer → only checks new elements
  const observer = new MutationObserver(() => {
    const menuExists = document.querySelector(".ms-ContextualMenu-list");
    if (menuExists) trySort();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => observer.disconnect();

        
    }, []);

    const getChildren = (ParantId) => {
    return TopMenuCollData.filter(item => item.ParantId === ParantId);
  };

  const getsubChildren = (ParantId) => {
    return SubMenuCollData.filter(item => item.ParantId === ParantId);
  };


 const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
    const firstDay = getFirstDayOfMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

    // Create an empty array for the calendar structure
    const calendar = [];
    let week = new Array(7).fill(null);

    // Fill the calendar array
    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          continue; // Skip until we hit the first day of the month
        }
        if (day <= daysInMonth) {
          week[j] = day;
          day++;
        }
      }
      calendar.push([...week]);
      week = new Array(7).fill(null);
    }

    return calendar;
  };

  const calendar = generateCalendar();

    const toggleArticle = (id) => {
        setActiveArticle((prev) => (prev === id ? null : id));
    };

    const validate = yup.object().shape({

        quiz: yup.string().test(
            "quiz",
            "Answer is required",
            (custCode) => {
                if (custCode) {
                    return true;
                } else {
                    return false;
                }
            }),

        // vendorId: yup.string().required("Please select vendor!")
    });
    const initialvalues = {
        quiz: '',
        condition: 'Draft',
        attachPlan: '',
        isDraft: false

    };

    function getFieldProps(formik: FormikProps<any>, field: string) {
        return { ...formik.getFieldProps(field), errorMessage: formik.errors[field] as string };
    }


    // ----------------------   Banner Slider ---------------------------------

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500, 
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,   
        arrows: true,
    };


    // ---------------------    Announcements Slider  --------------------------

    const sliderSettingsleader = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  // ---------------------    Award Slider  --------------------------

    const sliderSettingsAward = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

 // ----------------------------------   End   --------------------------------------------------


// ------------------------------------------        Document  redirect  -----------------------



const handleItemClick = (itemTitle, itemUrl) => {
    setSelectedTitle(itemTitle); // Set the selected title (optional: if you need it for later use)
    // navigate(`/HR/${itemTitle}`); // Redirect to the item's URL
    history.push(`/Library/${itemTitle}`); // Use history.push instead of navigate

  };

// -----------------------------------------------------------------------------------------


const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const openModal = () => {
    setIsModalOpen(true);

  };

// Function to toggle the menu state
  const toggleMenunew = () => {
    setIsOpen((prevState) => !prevState); // Toggle the state
  };
  const toggleMensub = () => {
    setIsOpensub((prevState) => !prevState); // Toggle the state
  };

  const openLinkInNewWindow = (url): void => {
    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }
// -----------------------------------------------------------------------------------------
const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
const [expandedIndex1, setExpandedIndex1] = useState<number | null>(null);
const [expandedIndex2, setExpandedIndex2] = useState<number | null>(null);
const siteUrl = props.currentSPContext.pageContext.web.absoluteUrl;
const handleReadMoreClick = (index) => {
  setExpandedIndex(expandedIndex === index ? null : index);
};
   const handleReadMoreClick2 = (index) => {
  setExpandedIndex2(expandedIndex2 === index ? null : index);
};
const handleReadMoreClicknext = (index) => {
  setExpandedIndex1(expandedIndex1 === index ? null : index);
};
    
    return (
        <Formik initialValues={initialvalues}
            validationSchema={validate}
            onSubmit={(values, helpers) => { }}>{
                formik => (
                    <div className='container-fluid'>
                        <div className='row header' style={{display:'none'}}>
                            <div className="col-md-1 col-sm-1 w--2">
                                <a href="#" onClick={(e) => {e.preventDefault();
                                        window.location.href = "https://patelengineering365.sharepoint.com/sites/MAM/SitePages/MAMHomePage.aspx#/"; // Navigate without refresh
                                    }}
                                    >
                                    <img src={logo} className="logo-box" alt=" Logo" />
                                </a>
                            </div>
                            <div className="col-md-11 col-sm-11 w--8">
                                <div style={{display:'none'}}>
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
                                                <a 
                                                    href={item?.Title ? item?.Title : 'javascript:void(0)'}
                                                    target={item.Title ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.Title}
                                                    {/* Check if there are children and show dropdown icon */}
                                                    {getChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                </a>
                                                {/* If there are children, display the dropdown */}
                                                {getChildren(item.Id).length > 0 && (
                                                    <div className="dropdown">
                                                    <ul>
                                                        {getChildren(item.Id).map((childItem) => (
                                                        <li key={childItem.Id} className="dropdown-link">
                                                            {childItem.Url?.startsWith("http") ? (
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                e.preventDefault(); // Prevent default anchor behavior
                                                                window.open(childItem.Url, "_blank", "noopener,noreferrer"); // Open in new tab
                                                                }}
                                                            >
                                                                {childItem.Title}
                                                            </a>
                                                            ) : (
                                                            <Link to={childItem.Url || "#"}>
                                                                {childItem.Title}
                                                            </Link>
                                                            )}
                                                        </li>
                                                        ))}
                                                    </ul>
                                                    </div>
                                                )}
                                                </li>
                                            ))
                                            ) : (
                                            <div className="no-data hide-div">No data available</div>
                                            )}
                                        </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
       
                        </div>
                        <div className="row m--20">
                            
                            {SiteNameCollData && SiteNameCollData.length > 0 &&
                                SiteNameCollData.map((item, index) => (
                                    <div key={index}>
                                        <div className="image-container">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.location.href = "../SitePages/HomePage.aspx";
                                                }}
                                            >  
                                                <img
                                                    src={
                                                        item?.TOPIMAGEURL?.Url
                                                            ? item.TOPIMAGEURL.Url
                                                            : topimage   // fallback image
                                                    }
                                                    className="topimagebox"
                                                />

                                                <img
                                                    src={patelnewlogo}
                                                    className="footerimgboxtop"
                                                /> 
                                            </a>
                                        </div>

                                        {/* <div>{item.Title}</div> */}
                                    </div>
                                ))
                            } 
                            {/* <div className="image-container">
                                            <a href="#" onClick={(e) => {e.preventDefault();
                                                window.location.href = "../SitePages/HomePage.aspx"; // Navigate without refresh
                                                }} >
                                             <img src={topimage} className="topimagebox" />
                                             <img src={patelfooterlogo} className="footerimgboxtop" /></a>
                                             </div> */}
                <div className="text-container" >
                {SiteNameCollData !== undefined && SiteNameCollData.length > 0 ? SiteNameCollData.map((item, index) => (
                  <div key={index}>
                    {item.Title} 
                  </div>
                )) : ""}
                 
                </div>
              </div>
                         <div className='row header' style={{display:'none'}}>
                            <div className="col-md-1 col-sm-1 w--2">
                                <a href="#" onClick={(e) => {e.preventDefault();
                                        window.location.href = "https://patelengineering365.sharepoint.com/sites/MAM/SitePages/MAMHomePage.aspx#/"; // Navigate without refresh
                                    }}
                                    >
                                    <img src={logo} className="logo-box" alt=" Logo" />
                                </a>
                            </div>
                            <div className="col-md-11 col-sm-11 w--8">
                                <div style={{display:'none'}}>
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
                                                <a 
                                                    href={item?.Title ? item?.Title : 'javascript:void(0)'}
                                                    target={item.Title ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.Title}
                                                    {/* Check if there are children and show dropdown icon */}
                                                    {getChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                </a> 
                                                {/* If there are children, display the dropdown */}
                                                {getChildren(item.Id).length > 0 && (
                                                    <div className="dropdown">
                                                    <ul>
                                                        {getChildren(item.Id).map((childItem) => (
                                                        <li key={childItem.Id} className="dropdown-link">
                                                            {childItem.Url?.startsWith("http") ? (
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                e.preventDefault(); // Prevent default anchor behavior
                                                                window.open(childItem.Url, "_blank", "noopener,noreferrer"); // Open in new tab
                                                                }}
                                                            >
                                                                {childItem.Title}
                                                            </a>
                                                            ) : (
                                                            <Link to={childItem.Url || "#"}>
                                                                {childItem.Title}
                                                            </Link>
                                                            )}
                                                        </li>
                                                        ))}
                                                    </ul>
                                                    </div>
                                                )}
                                                </li>
                                            ))
                                            ) : (
                                            <div className="no-data hide-div">No data available</div>
                                            )}
                                        </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
 
                        </div>
                        <div className='row'>
                            <div className='col-md-12 p--0'>
                                <div className='main-box topbanneruser'>
                                     <div className="banner-username"><span style={{fontWeight:'100'}}>Welcome,</span> {displayName} !</div>
                                    {TopBannerCollData && TopBannerCollData.length > 0 ? (
                                            TopBannerCollData.length === 1 ? (
                                                <div>
                                                    <div className="banner-container">
                                                        <img src={TopBannerCollData[0].FileUrl} className="banner-image" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Slider {...sliderSettings}>
                                                    {TopBannerCollData.map((item) => (
                                                        <div key={item.Id} className='topbannerslider'>
                                                            <div className="banner-container">
                                                                <img src={item.FileUrl} className="banner-image" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Slider>
                                            )
                                        ) : (
                                            <p className='hide-div'>No banners available</p>
                                        )}
                                </div>
                            </div>
                        </div>
                        
                         <div className="row m--20 mt--5">
                            <div className="image-container">
                                 <span className='wwelcomebanner'><span style={{fontWeight:'100'}}>Welcome,</span> {displayName} !</span> 
                  {/* <img src={bottomimage} className="topimagebox wid82" /> */}
                  {SiteNameCollData && SiteNameCollData.length > 0 ? (
  SiteNameCollData.map((item, index) => (  
    <img
                                                    src={
                                                        item?.BOTTOMIMAGEURL?.Url
                                                            ? item.BOTTOMIMAGEURL.Url
                                                            : bottomimage   // fallback image
                                                    }
                                                    className="topimagebox wid82"
                                                />
  ))
) : null}
                </div>
                <div className="textbottom-container" >
                    
                    {SiteNameCollData !== undefined && SiteNameCollData.length > 0 ? SiteNameCollData.map((item, index) => (
                  <div key={index}>
                    {item.Title}
                  </div>
                   
                )) : ""}  
                </div>
                 <div className='row subheader'>
                             <div className="col-md-1 col-sm-1 wid-10" style={{display:'none'}}>
                                <div className="topheading">
                                  <h2> {props.currentSPContext.pageContext.web.serverRelativeUrl.split('/')[2]}</h2>
                                </div> 
                             </div>
                                <div className="col-md-12 col-sm-11 w--8">
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
                
                                    <div className={`nav-btn libbox subnav-btn ${isOpensub ? 'open' : ''}`} id="navsubsection">
                                    <div className="nav-links">
                                        <ul className="menubar2 helpme">  
                                             {SubMenuCollData && SubMenuCollData.length > 0 ? (
                                            SubMenuCollData.filter(item => item.ParantId === 0)  
                                            .sort((a, b) => a.Title.localeCompare(b.Title))
                                            .map((item) => (
                                                <li 
                                                key={item.Id}
                                                className="nav-link navhover"
                                                onClick={() => handleItemClick(item.Title, item.Url || '#')}
                                                > 
                                                <a
                                                    href={item?.Url ? item?.Url : "javascript:void(0)"}
                                                    target={item.Url ? "_blank" : "_self"}
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.Title}
                                                    {/* Check if there are children and show dropdown icon */}
                                                    {getsubChildren(item.Id).length > 0 && <i className="fa fa-angle-down"></i>}
                                                </a>
                                    
                                                {/* If there are children, display the dropdown */}
                                                {getsubChildren(item.Id).length > 0 && (
                                                    <div className="dropdown">
                                                    <ul>
                                                        {getsubChildren(item.Id).map((childItem) => (
                                                        <li
                                                            key={childItem.Id}
                                                            className="dropdown-link"
                                                            onClick={(e) => {
                                                            e.stopPropagation(); // Prevent triggering the parent <li> click
                                                            handleItemClick(childItem.Title, childItem.Url || '#');
                                                            }}
                                                        >
                                                            {childItem.Url?.startsWith("https") || childItem.Url?.startsWith("http") ? (
                                                            // <Link to={childItem.Title}>
                                                            //     {childItem.Title}
                                                            // </Link>
                                                            <a href='#' onClick={() => { openLinkInNewWindow(childItem.Url) }}>{childItem.Title}</a>
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
                                            <div className="no-data hide-div">No data available</div>
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
                        </div> 
                         </div>
                       <div className='submaincontainer'>
                        <div className='row  mt-39'>
                            <div className='col-md-9'>
                                <div className='row pt-20'>

                                    {CeoMessageCollData && CeoMessageCollData.length > 0 ? (
                                            CeoMessageCollData.map((item) => ( 
                                            <div className="datasection h-200">
                                                <div className="topheadingsection">
                                                <div className="ceomsg">
                                                    <span style={{ paddingLeft: "5px" }}>Message From HOD</span> 
                                                </div> 
                                                <div className="readmoresection">
                                                    {/* <i className="fa fa-angle-right" aria-hidden="true" style={{color:'#000'}}></i> */}
                                                    <a
                                                        href={`${siteUrl}/SitePages/HomePage.aspx#/CMDMessage`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="a--tag" 
                                                        >
                                                        See All
                                                        
                                                        </a>
                                                    </div>
                                                {/* <div className="readmoresection">
                                                    <a href='#' onClick={() => { openModal();}}>
                                                        Read More</a>
                                                </div> */}
                                                </div> 
                                                <div className="row ceobox"> 
                                                <div className="col-md-3 col-sm-3 wid20">
                                                    <div style={{marginLeft:'15px'}}>
                                                    <img src={item.FileUrl} alt="CEO" />
                                                    </div>  
                                                </div>
                                                <div className="col-md-9 col-sm-9 wid80 d-flex align-items-center justify-content-center">
                                                    <div className="messagebox">
                                                    {item.CeoMessage}
                                                    </div>
                                                </div>   
                                                </div>  
                                            </div>  
                                            ))
                                        ) : (
                                            <div className='hide-div'>No data available</div>
                                        )}



                                        {/*----------------------------------------- Popup for selected item  -------------------------------*/}

                                            <div className=''>
                                                <Dialog
                                                    hidden={!isModalOpen}
                                                    onDismiss={closeModal} // Close modal when clicked outside
                                                    dialogContentProps={{
                                                    type: DialogType.largeHeader,
                                                    title: (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#000' }}>
                                                        <span>Message From CMD</span>
                                                        <button onClick={closeModal} className='close-button'>
                                                            <span className="fa fa-close" />
                                                        </button>
                                                        </div>
                                                    ), // Title of the modal with close button
                                                    }}
                                                >
                                                    <div className='row'>
                                                    <div className='col-md-12 col-sm-12'>
                                                        <div className='modelheader'>
                                                        {/* Display CEO messages */}
                                                        {CeoMessageCollData && CeoMessageCollData.length > 0 ? (
                                                            CeoMessageCollData.map((item, index) => (
                                                            <div key={index} className="row ceobox">
                                                                <div className="col-md-3 col-sm-12">
                                                                <div>
                                                                    <img src={item.FileUrl} alt="CEO" />
                                                                </div>
                                                                </div>
                                                                <div className="col-md-9 col-sm-12">
                                                                <div className="modelmessagebox">
                                                                    {item.CeoMessage}
                                                                </div>
                                                                </div>
                                                            </div>
                                                            ))
                                                        ) : (
                                                            <p className='hide-div'>No CEO messages available</p> // If no data is available, show this message
                                                        )}
                                                        </div>
                                                    </div>
                                                    </div>
                                                    {/* <DialogFooter>
                                                            <PrimaryButton onClick={closeModal} text="Close" className='cbtn'>
                                                                <span className="fa fa-close" /> Close
                                                            </PrimaryButton>
                                                            </DialogFooter> */}
                                                </Dialog>
                                            </div>

                                </div>
                                <div className="row pt-20">
                                    <div className="col-md-6 col-sm-12 pl-0 pr-0">
                                        <div className="datasection2">
                                        <div className="topheadingsection">
                                            <div className="ceomsg ml-15"><span style={{ paddingLeft: "5px" }}>Announcements
                                            </span>
                                            </div> 
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
    
                                        </div> */}
  
                                        </div>
                                        <>
                                            <div className="row sarsalmainsection Announcementsdots">
                                                {AnnouncementsCollData && AnnouncementsCollData.length > 0 ? (
                                                AnnouncementsCollData.length === 1 ? (
                                                    <div className="banner-card">
                                                   <img src={AnnouncementsCollData[0].FileUrl}
                                                            alt="Announcement"
                                                            style={{ cursor: AnnouncementsCollData[0].AnnouncementsFileUrl ? "pointer" : "default" }}
                                                            onClick={() => {
                                                                            const url = AnnouncementsCollData[0]?.AnnouncementsFileUrl;
                                                                             if (url) {
                                                                                window.open(url, "_blank", "noopener,noreferrer");
                                                                            }
                                                            }} 
                                                            />  
                                                            
                                                    <div>   
                                                        <span className="carosaltitle fw-500"> 
                                                        {AnnouncementsCollData[0].Header}
                                                        </span>
                                                        <div className="carosalsubtitle limt2line">
                                                        {AnnouncementsCollData[0].SubHeader}
                                                        </div>
                                                         <div className="carosaldescription">
                                                                <p
                                                                style={{
                                                                    fontSize: "13px",
                                                                    lineHeight: "1.5",
                                                                    margin: 0,  

                                                                    // collapsed view 
                                                                    display: expandedIndex === 2 ? "block" : "-webkit-box",
                                                                    WebkitLineClamp: expandedIndex === 2 ? "unset" : 3,
                                                                    WebkitBoxOrient: "vertical", 

                                                                    // expanded view scrolling
                                                                    maxHeight: expandedIndex === 2 ? "58px" : "auto",
                                                                    overflowY: expandedIndex === 2 ? "auto" : "hidden",
                                                                }} 
                                                                >  
                                                                {AnnouncementsCollData[0].AnnouncementDescription} 
                                                                </p>
                                                                    
                                                                <span
                                                                style={{ 
                                                                    color: "red",   
                                                                    fontSize: "11px",
                                                                    cursor: "pointer",
                                                                    fontWeight: "400",    
                                                                }}  
                                                                onClick={() => handleReadMoreClick(2)}
                                                                >  
                                                                {expandedIndex === 0 ? "Read Less" : "Read More"} 
                                                                </span>  
                                                            </div>
                                                        {/* <div className="carosaldescription">
                                                        {AnnouncementsCollData[0].AnnouncementDescription.substring(0, 100)}...
                                                        <span
                                                            className="read-more" style={{color:'red' ,paddingLeft:'10px'}}
                                                              onClick={() => openAnnouncementPopup(AnnouncementsCollData[0])}
                                                        > 
                                                            Read More 
                                                        </span>
                                                        </div> */}
                                                        <div className="datesection">
                                                        {AnnouncementsCollData[0].formattedDate}
                                                        </div>
                                                    </div>   
                                                    </div>        
                                                ) : (  
                                                    <Slider {...sliderSettingsleader}> 
                                                    {AnnouncementsCollData.map((item, index) => (
                                                        <div key={item.Id} className="banner-card"> 
                                                            <img 
                                                                src={item.FileUrl}   
                                                                alt="Announcement"
                                                                style={{ cursor: item.AnnouncementsFileUrl ? "pointer" : "default" }}
                                                                onClick={() => {
                                                                    const url = item?.AnnouncementsFileUrl; 
                                                                    if (url) {
                                                                        window.open(url, "_blank", "noopener,noreferrer");
                                                                    } 
                                                                }}
                                                                />
                                                                                                                 {/* <img src={item.FileUrl} alt="" /> */}
                                                        <div> 
                                                            <span className="carosaltitle fw-500">{item.Header}</span>
                                                            <div className="carosalsubtitle limt2line">{item.SubHeader}</div>
                                                            <div className="carosaldescription">
                                                            {/* {item.AnnouncementDescription.substring(0, 100)}... */}
                                                            {/* <span
                                                                style={{
                                                                    color: 'red',
                                                                    paddingLeft: '10px',   
                                                                    fontWeight: '400',
                                                                     fontSize: '11px',
                                                                    cursor: 'pointer',
                                                                    }}
                                                                 onClick={() => openAnnouncementPopup(item)}
                                                            >    
                                                                Read More   
                                                            </span> */}
                                                            </div>
                                                            <div className="carosaldescription">
                                                                <p
                                                                style={{
                                                                    fontSize: "13px",
                                                                    lineHeight: "1.5", 
                                                                    margin: 0,

                                                                    // collapsed view
                                                                    display: expandedIndex === index ? "block" : "-webkit-box",
                                                                    WebkitLineClamp: expandedIndex === index ? "unset" : 3,
                                                                    WebkitBoxOrient: "vertical", 
   
                                                                    // expanded view scrolling
                                                                    maxHeight: expandedIndex === index ? "58px" : "auto",
                                                                    overflowY: expandedIndex === index ? "auto" : "hidden",
                                                                }} 
                                                                >            
                                                                {item.AnnouncementDescription}  
                                                                </p>
                                                            
                                                                <span
                                                                style={{ 
                                                                    color: "red",
                                                                    fontSize: "11px",
                                                                    cursor: "pointer",
                                                                    fontWeight: "400", 
                                                                }} 
                                                                onClick={() => handleReadMoreClick(index)}
                                                                >
                                                                {expandedIndex === index ? "Read Less" : "Read More"}
                                                                </span>
                                                            </div>
                                                            <div className="datesection">{item.formattedDate}</div>
                                                        </div>
                                                        </div>      
                                                    ))} 
                                                    </Slider>   
                                                ) 
                                                ) : (
                                                <p className="hide-div">No banners available</p>
                                                )}
                                            </div> 

                                            {/* Popup Modal 
                                            {showAnnouncementPopup  && selectedItem && (
                                                <div className="popup--overlay">
                                                <div className="popup--pcontent">
                                                    <span className="close--btn" onClick={closeAnnouncementPopup}>
                                                    ×
                                                    </span> 

                                                   
                                                    <p>{selectedItem.AnnouncementDescription}</p>
                                                  
                                                </div> 
                                                </div>
                                            )}*/}
                                            </>
                                        
                                        </div> 
                                    </div>
                                    <div className="col-md-6 col-sm-12 pr-0 pl--0  pm-0">
                                        <div className="datasection Awardsbox">
                                        <div className="topheadingsection">
                                            <div className="ceomsg awsceo"><span style={{ paddingLeft: "5px" }}>Awards & Recognition
                                            </span></div>
 
                                        </div>
                                        <div className="row p-20">
                                            <div className="col-md-12 col-sm-12 pr-0 pl-0 Awardssection">
                                                        {AwardsRecolonizationCollData && AwardsRecolonizationCollData.length > 0 ? (
                                                            AwardsRecolonizationCollData.length === 1 ? (
                                                            <div> 
                                                                <div className="row">
                                                                <div className="col-md-5 col-sm-5"> 
                                                                    <div> 
                                                                    <img
                                                                        src={AwardsRecolonizationCollData[0].FileUrl}
                                                                        className="sliderimg"
                                                                        alt={AwardsRecolonizationCollData[0].NameofEmployee}
                                                                    />  
                                                                    </div>  
                                                                </div> 
                                                                <div className="col-md-7 col-sm-7">
                                                                    <div style={{ textAlign: 'left' }}>
                                                                    <div className="carosaltitle carosaltitle-white">{AwardsRecolonizationCollData[0].NameofEmployee}</div>
                                                                    <div className="carosal-subtitle">{AwardsRecolonizationCollData[0].Position}</div>
                                                                    <div className="carosal-subtitle tropytext">
                                                                        {AwardsRecolonizationCollData[0]?.AwardName && (
                                                                            <>
                                                                            <i className="fa fa-trophy" aria-hidden="true"></i>
                                                                            {AwardsRecolonizationCollData[0].AwardName}
                                                                            </>
                                                                        )}  
                                                                        </div>
                                                                    {/* <div className="carosal-subtitle tropytext">
                                                                        <i className="fa fa-trophy" aria-hidden="true"></i>
                                                                        {AwardsRecolonizationCollData[0].AwardName}
                                                                    </div> */}
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                  <div className="awscarosaldescriptionfour">
                                                                <p
                                                                style={{
                                                                    fontSize: "13px",
                                                                    lineHeight: "1.5",
                                                                    margin: 0,   

                                                                    // collapsed view
                                                                    display: expandedIndex2 === 1 ? "block" : "-webkit-box",
                                                                    WebkitLineClamp: expandedIndex2 === 1 ? "unset" : 4,
                                                                    WebkitBoxOrient: "vertical", 

                                                                    // expanded view scrolling
                                                                    maxHeight: expandedIndex2 === 1 ? "127px" : "auto",
                                                                    overflowY: expandedIndex2 === 1 ? "auto" : "hidden",
                                                                }} 
                                                                >   
                                                                {AwardsRecolonizationCollData[0].AwardsDescription} 
                                                                </p>   
                                                             
                                                                <span
                                                                style={{ 
                                                                    color: "red",
                                                                    fontSize: "11px",
                                                                    cursor: "pointer",
                                                                    fontWeight: "400", 
                                                                }} 
                                                                onClick={() => handleReadMoreClick2(1)}
                                                                >
                                                                {expandedIndex === 0 ? "Read Less" : "Read More"}
                                                                </span>
                                                            </div>
                                                                {/* <div className="awscarosaldescriptionfour">
                                                                {AwardsRecolonizationCollData[0].AwardsDescription.substring(0, 200)}...{' '}
                                                                 <span  
                                                                    style={{ 
                                                                    color: 'red',
                                                                  textAlign:'left',
                                                                    fontWeight: '400',
                                                                    fontSize: '11px',
                                                                    cursor: 'pointer',
                                                                    paddingLeft:'10px',
                                                                    
                                                                    }} 
                                                                    onClick={() => openAwardsPopup(AwardsRecolonizationCollData[0])}
                                                                    
                                                                > 
                                                                    Read More
                                                                </span>
                                                                </div>   */}
                                                                {/* <div  
                                                                    style={{
                                                                    color: 'red',  
                                                                  textAlign:'left',
                                                                    fontWeight: '400',
                                                                    fontSize: '11px', 
                                                                    cursor: 'pointer',
                                                                    }}
                                                                    onClick={() => openPopupAwards(AwardsRecolonizationCollData[0])}
                                                                    
                                                                > 
                                                                    Read More
                                                                </div>  */}
                                                            </div>
                                                            ) : (
                                                            <Slider {...sliderSettingsAward}>
                                                                 {AwardsRecolonizationCollData.map((item, index) => (
                                                                <div key={item.Id}>
                                                                    <div className="row">
                                                                    <div className="col-md-5 col-sm-5">
                                                                        <div>
                                                                        <img src={item.FileUrl} className="sliderimg" alt={item.NameofEmployee} />
                                                                        </div>
                                                                    </div> 
                                                                    <div className="col-md-7 col-sm-7"> 
                                                                        <div style={{ textAlign: 'left' }}>
                                                                        <div className="carosaltitle">{item.NameofEmployee}</div>
                                                                        <div className="carosal-subtitle">{item.Position}</div>
                                                                        <div className="carosal-subtitle tropytext">
                                                                        {item?.AwardName && (
                                                                            <> 
                                                                            <i className="fa fa-trophy" aria-hidden="true"></i> 
                                                                            {item.AwardName}
                                                                            </>  
                                                                        )}         
            
                                                                            {/* <i className="fa fa-trophy" aria-hidden="true"></i>
                                                                            {item.AwardName} */}
                                                                        </div>
                                                                        </div>  
                                                                    </div>   
                                                                    </div> 
                                                                     <div className="awscarosaldescriptionfour">
                                                                <p
                                                                style={{  
                                                                    fontSize: "13px",
                                                                    lineHeight: "1.5", 
                                                                    margin: 0, 

                                                                    // collapsed view
                                                                    display: expandedIndex1 === index ? "block" : "-webkit-box",
                                                                    WebkitLineClamp: expandedIndex1 === index ? "unset" : 4,
                                                                    WebkitBoxOrient: "vertical",  

                                                                    // expanded view scrolling
                                                                    maxHeight: expandedIndex1 === index ? "127px" : "auto",
                                                                    overflowY: expandedIndex1 === index ? "auto" : "hidden",
                                                                }} 
                                                                >  
                                                                {item.AwardsDescription} 
                                                                </p>     
                                                            
                                                                <span
                                                                style={{ 
                                                                    color: "red",
                                                                    fontSize: "11px",
                                                                    cursor: "pointer",
                                                                    fontWeight: "400", 
                                                                }}  
                                                                onClick={() => handleReadMoreClicknext(index)}
                                                                >
                                                                {expandedIndex1 === index ? "Read Less" : "Read More"}
                                                                </span>
                                                            </div>
                                                                    {/* <div className="awscarosaldescriptionfour">
                                                                    {item.AwardsDescription.substring(0, 200)}...{' '}
                                                                    <span  
                                                                        style={{  
                                                                        color: 'red',
                                                                        fontWeight: '400', 
                                                                        fontSize: '11px',
                                                                        cursor: 'pointer',  
                                                                        textAlign:'left' ,
                                                                         paddingLeft:'10px',
                                                                        }}  
                                                                        onClick={() => openAwardsPopup(item)}
                                                                    > 
                                                                        Read More
                                                                    </span> 
                                                                    </div>  */}
                                                                    {/* <div  
                                                                        style={{ 
                                                                        color: 'red', 
                                                                        fontWeight: '400',
                                                                        fontSize: '11px', 
                                                                        cursor: 'pointer',  
                                                                        textAlign:'left'
                                                                        }} 
                                                                        onClick={() => openPopupAwards(item)}
                                                                    > 
                                                                        Read More
                                                                    </div> */}
                                                                </div>     
                                                                ))}
                                                            </Slider>
                                                            )
                                                        ) : (
                                                            <p className="hide-div">No banners available</p>
                                                        )}

                                                        {/* Modal / Popup */}
                                                        {showAwardsPopup  && selectedItem && (
                                                        <div className="popup--overlay">
                                                        <div className="popup--pcontent mauto">
                                                            <span className="close--btn" onClick={closeAwardsPopup}>
                                                            ×
                                                            </span>  
              
                                                        
                                                            <p style={{textAlign:'left'}}>{selectedItem.AwardsDescription}</p>
                                                   
                                                </div>     
                                                </div>   
                                            )}     
                                                        </div>               
                                        </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="row pt-20">
                                    <div className="col-md-6 col-sm-12 pl-0 pr-0">
                                        <div className="datasection wordbox"> 
                                        <div className="topheadingsection">   
                                            <div className="ceomsg ml-15">
                                            <span style={{ paddingLeft: "5px" }}>Policies</span>
                                            </div> 
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
                                            </div> */}
                                        </div>
                                        <div className="row ptlr-10 policies">
                                            <div className="col-md-12 col-sm-12 pr-0 pl-0 annucarosalsection">
                                            <ul>
                                                {PoliciesCollData !== undefined && PoliciesCollData.length > 0 ? (
                                                PoliciesCollData.map((item, index) => (
                                                    <li key={index}>
                                                    {/* Display file image or logo based on the file extension */}
                                                    {item.File && item.File.Name && (
                                                        <a href='#' style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            window.open(item.ServerRedirectedEmbedUrl, '_blank');
                                                        }}
                                                        >
                                                        <img
                                                            src={getFileLogo(item.File.Name)}
                                                            alt={item.File.Name}
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' , display:'none'}}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Policy Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}


                                                    </li>
                                                ))
                                                ) : (
                                                <li className='hide-div'>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-12  pr-0 pl--0">
                                        <div className="datasection wordbox">
                                        <div className="topheadingsection">
                                            <div className="ceomsg">
                                            <span style={{ paddingLeft: "5px" }}>Training Resources</span>
                                            </div>
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
                                            </div> */}
                                        </div>
                                        <div className="row ptlr-10 policies">
                                            <div className="col-md-12 col-sm-12 pr-0 pl-0 annucarosalsection">
                                            <ul>
                                                {TrainingResourcesCollData !== undefined && TrainingResourcesCollData.length > 0 ? (
                                                TrainingResourcesCollData.map((item, index) => (
                                                    <li key={index}>
                                                    {/* Display file image or logo based on the file extension */}
                                                    {item.File && item.File.Name && (
                                                        <a
                                                        href='#'
                                                        style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            window.open(item.ServerRedirectedEmbedUrl, '_blank');
                                                        }}
                                                        >
                                                        <img
                                                            src={getFileLogo(item.File.Name)}
                                                            alt={item.File.Name}
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px'  , display:'none'}}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Training Resources Title'}
                                                        </a>
                                                    )}
                                                    </li>
                                                ))
                                                ) : (
                                                <li className='hide-div'>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row pt-20">
                                    <div className="col-md-6 col-sm-12 pl-0 pr-0">
                                        <div className="datasection wordbox">
                                        <div className="topheadingsection">
                                            <div className="ceomsg ml-15">
                                            <span style={{ paddingLeft: "5px" }}>Certificates</span>
                                            </div>
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
                                            </div> */}
                                        </div>
                                        <div className="row ptlr-10 policies">
                                            <div className="col-md-12 col-sm-12 pr-0 pl-0 annucarosalsection">
                                            <ul>
                                                {CertificatesCollData !== undefined && CertificatesCollData.length > 0 ? (
                                                CertificatesCollData.map((item, index) => (
                                                    <li key={index}>
                                                    {/* Display file image or logo based on the file extension */}
                                                    {item.File && item.File.Name && (
                                                        <a
                                                        href='#'
                                                        style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            window.open(item.ServerRedirectedEmbedUrl, '_blank');
                                                        }}
                                                        >
                                                        <img
                                                            src={getFileLogo(item.File.Name)}
                                                            alt={item.File.Name}
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px'  , display:'none'}}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Certificate Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}



                                                    </li>
                                                ))
                                                ) : (
                                                <li className='hide-div'>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-12  pr-0  pl--0">
                                        <div className="datasection wordbox">
                                        <div className="topheadingsection">
                                            <div className="ceomsg">
                                            <span style={{ paddingLeft: "5px" }}>Downloads</span>
                                            </div>
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
                                            </div> */}
                                        </div>
                                        <div className="row ptlr-10 policies">
                                            <div className="col-md-12 col-sm-12 pr-0 pl-0 annucarosalsection">
                                            <ul>
                                                {DownloadsCollData !== undefined && DownloadsCollData.length > 0 ? (
                                                DownloadsCollData.map((item, index) => (
                                                    <li key={index}>
                                                    {/* Display file image or logo based on the file extension */}
                                                    {item.File && item.File.Name && (
                                                        <a
                                                        href='#'
                                                        style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            window.open(item.ServerRedirectedEmbedUrl, '_blank');
                                                        }}
                                                        >
                                                        <img
                                                            src={getFileLogo(item.File.Name)}
                                                            alt={item.File.Name}
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px', display:'none' }}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Download Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}


                                                    </li>
                                                ))
                                                ) : (
                                                <li className='hide-div'>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
       
                                    </div>  
                                </div>
                            </div> 
                            <div className="col-md-3 col-sm-12 pt-20" >

                                <div className='row pl-10'>
                                <div className="datasection qlbox">
                                <div className="topheadingsection">
                                    <div className="ceomsg">
                                    <span style={{ paddingLeft: "5px" }}>Quick Links</span>
                                    </div>
                                    {/* <div className="readmoresection">See all</div> */}
                                </div>
                                <div className="row p-20">
                                    <div className="col-md-12 col-sm-12  pl-0 annucarosalsection">
                                    <div className="row ">
                                        {QuickLinksCollData && QuickLinksCollData.length > 0 ? (
                                        QuickLinksCollData.map((item, index) => (
                                            <div key={index} className="col-md-3 col-sm-12 plr-5">
                                            <a style={{ color: "#000" }}
                                                href={item.LinkUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="qlink-item"
                                            >
                                                <div className="qlinnerbox">
                                                {/* Use dynamic image source if available */}
                                                <img
                                                    src={item.FileUrl || './assets/Patel Images/teams.png'}
                                                    alt={item.LinkName}

                                                />
                                                </div>
                                                <div className="qltitle">{item.LinkName}</div>
                                            </a>
                                            </div>
                                        ))
                                        ) : (
                                        <div className="no-data hide-div">No QuickLinks available</div>
                                        )}
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div className="row pt-20 pl-10">
                                <div className="datasection qlbox">
                                    <div className="ceomsg" style={{ borderLeft: "3px solid #f6f6f6" }}>
                                    <span style={{ paddingLeft: "5px" }}>{currentDate.toLocaleString('default', { month: 'long' })}</span>
                                    </div>
                                    <div className="row mr-0">
                                    <div className="col-md-12 col-sm-12">
                                        <div className="table-responsive">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>S</th>
                                                <th>M</th>
                                                <th>T</th>
                                                <th>W</th>
                                                <th>T</th>
                                                <th>F</th>
                                                <th>S</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {calendar.map((week, index) => (
                                                <tr key={index}>
                                                {week.map((day, index) => (
                                                    <td key={index} className={day === currentDate.getDate() ? "todaydate" : ""}>
                                                    {day}
                                                    </td>
                                                ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>

                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="row pt-20 pl-10">
                                <div className="datasection eventbox">
                                    <div className="topheadingsection">
                                    <div className="ceomsg"><span style={{ paddingLeft: '5px' }}>Events</span></div>
                                    {/* <div className="readmoresection">
                                        <a href="#">See all</a>
                                        </div> */}
                                    </div>
                                    {EventsCollData !== undefined && EventsCollData.length > 0 ? (
                                    EventsCollData.map((item, index) => (
                                        <div className="row PE-tb pt--10" key={index}>
                                        <div className="col-md-3 col-sm-12 pr-0 w--100">
                                            <div className="mbox">
                                                <img src={item.FileUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-9 col-sm-12 pr-0 w--100">
                                            <div className="desc-box lh--1">
                                            {item.EventDescription}
                                            </div>
                                            <div className="timebox">
                                            <span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                                            {item.StartTime} <span>-</span> {item.EndTime}
                                            </div>
                                            <div className="timebox">
                                                <span>
                                                    <i className="fa fa-calendar pr--5"  aria-hidden="true"></i>
                                                </span>
                                                {new Date(item.EventDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }).replace(/ /g, ", ")}
                                                </div>
 
                                        </div>
                                        </div>        
                                    ))  
                                    ) : (
                                    <div className='hide-div'>No data available</div>   
                                    )}    
                                </div>
                                   
                                </div>      
                                <div className="row pl--20 pt-20 pl-12">
                                <div className="datasection wordbox ebox">
                                    <div className="topheadingsection">
                                    <div className="ceomsg" ><span style={{ paddingLeft: "5px" }}>Event-Gallery
                                    </span></div>
                                    {/* <div className="readmoresection" style={{ right: "28px" }}>
                                        <a href="#">See all</a>
                                    </div> */}

                                    </div>
                                    <div className="row ptb-5">

                                    {EventGallaryCollData && EventGallaryCollData.length > 0 ? (
                                        EventGallaryCollData.map((item, index) => (
                                            // <div className='MainGallery'>
                                            //     <div key={index} className="eventimg">
                                            //         <img src={item.FileUrl} alt={item.FileUrl} />
                                            //     </div>
                                            // </div>
                                        <div className="col-md-4 p--10 col-sm-12 MainGallery">
                                            <div key={index} className="eventimg">
                                            {/* Dynamically rendering the image or any content */}
                                            <img src={item.FileUrl} alt={item.FileUrl} 
                                            style={{ cursor: "pointer" }} 
                                                onClick={() => openPopupAwardsevent(index)}/>
                                            {/* <p>{item.FileUrl}</p> */}
                                            {/* Add more dynamic content as per your QuickLinksCollData structure */}
                                            </div>
                                        </div>     
                                        ))  
                                    ) : ( 
                                        <div className='hide-div'>No events available</div>
                                    )}

                                    </div> 
                                    {showPopupevent && (
                                        <div className="popup-overlay pt-20">
                                            <div className="popup-content p-36 w-76">
                                            <span className="close-btn" onClick={() => setShowPopupevent(false)}>
                                                ×
                                            </span>
 
                                            {EventGallaryCollData?.length > 0 && (
                                                <Slider {...sliderSettingsevent}>
                                                {EventGallaryCollData.map((item, index) => (
                                                    <div key={index} className="slide-item h-500">
                                                    <img
                                                        src={item.FileUrl}
                                                        alt={`Gallery image ${index + 1}`}
                                                    />
                                                    </div>
                                                ))}
                                                </Slider>
                                            )}
                                            </div>   
                                        </div>
                                        )}
                                </div>     
                                </div> 
                            </div>
                        </div>  
                        <div className="row pt--20 pb-20">
              <div className="site-announcements-container plr--0"> 
                                  {ChildrenSafetyCollData && ChildrenSafetyCollData.length > 0 && (
                                    ChildrenSafetyCollData.map((item, index) => (
                                      <div key={index} className="announcement-card" style={{borderRadius:'0'}}>
                                        <img  src={item.FileUrl} alt={item.Header} className="announcement--image" />
                                        <div className="announcement-overlay">
                                          <h3 className="announcement-title">{item.Header}</h3>
                                         
                                        <div style={{marginLeft:'50px'}}> <a href={item?.UrlLink?.Url || '#'} target="_blank" rel="noopener noreferrer" className="announcement-button learnmore-btn learnmorebtn">
                                        Learn More
                                          </a></div>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>

              <div>
                 
</div>       
     
                </div>
                       </div>
 {SiteNameCollData && SiteNameCollData.length > 0 && SiteNameCollData.map((site, i) => (
  <div
    className="footerbox"  
    key={i}
  style={{
  backgroundImage: site.footerbgcolor ? site.footerbgcolor.replace(/;$/, '') : "linear-gradient(90deg, #1e3a6d, #fff 64%)",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}}
  >
    <div className="row valign">
      <div className="col-md-1 col-sm-12 valigncenter">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li style={{ display: 'none' }}>
            <a href="">About Us</a>
          </li>
          <li style={{ display: 'none' }}>
            <a href="">Contact Us</a>
          </li>
        </ul>
      </div>

      <div className="col-md-9 col-sm-12 ftext valigncenter f-footer wid-81">
        © 2026 <span className="innertxt" style={{paddingLeft:'4px'}}>Patel Engineering Limited</span> <span className="plr3">|</span> All Rights Reserved.
      </div>

      <div className="col-md-2 col-sm-12 valigncenter txtRight">
        <img src={patelnewlogo} className="footerimgbox" alt="Patel Engineering Logo" />
      </div>
    </div>
  </div>
))}    
 
 
                        {/* <div className="footerbox">
                                      <div className="row valign">
                                      <div className="col-md-5 col-sm-12 valigncenter">
                                            <ul>
                                            <li>
                                              <a href="">Home</a>
                                            </li>
                                            <li style={{display:'none'}}>
                                              <a href="">About Us</a>
                                            </li>
                                            <li style={{display:'none'}}>
                                              <a href="">Contact Us</a>
                                            </li>
                                          </ul></div>
                                          
                                          <div className="col-md-5 col-sm-12 ftext valigncenter">@ 2025 <span className="innertxt"> Patel Engineering Limited. </span>All Rights Reserved.</div>
                                          <div className="col-md-2 col-sm-12 valigncenter txtRight"><img src={patelfooterlogo} className="footerimgbox" /></div>
                                      </div>
                                      </div> */}
                    </div>
                )
            } 
        </Formik>
    );
}

