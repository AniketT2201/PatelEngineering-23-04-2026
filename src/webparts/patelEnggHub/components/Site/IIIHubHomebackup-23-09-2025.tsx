import * as React from 'react';
import { useState, useMemo } from 'react';
import USESPCRUD, { ISPCRUD } from '../../../services/bal/spcrud';

import topimage from '../../assets/Safety Portal Images/topdeptimg.png';
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




import Slider from 'react-slick';
import { ISafetyPortalProps } from '../../../services/interface/ISafetyPortalProps';
import './SPlandingpage.scss';




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


    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isOpensub, setIsOpensub] = useState(false);

    const [activeArticle, setActiveArticle] = useState<number | null>(null);
    const history = useHistory();

    let spCrudObj: ISPCRUD;
    let itemsPerPage: number;
    itemsPerPage = 1;

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
                ISubMenuOps().getSubMenuData(props).then((SubMenuColl) => {
                  console.log('SubMenu Data received:', SubMenuColl);
            
                  // Set the fetched submenu data
                  setSubMenuCollData(SubMenuColl);
            
                  // Filter submenu data based on the user's group access
                  const filteredSubMenu = SubMenuColl.filter(item => {
                    // Check if the item has GroupAccess and compare it with GroupData
                    if (item.GroupAccess && Array.isArray(item.GroupAccess)) {
                      // Check if there's any intersection between the user's groups and the item's GroupAccess
                      return item.GroupAccess.some(group => GroupData.includes(group.Id));
                    }
                    return true; // If no GroupAccess defined, show the item by default
                  });
            
                  // Set the filtered submenu data
                  setSubMenuCollData(filteredSubMenu);
                  
                }, error => {
                  console.error('Error fetching submenu data:', error);
                });
              }
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

        IAnnouncementsOps().getTopAnnouncements("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then((results) => {
                const filteredResults = results.filter(item => item.Status === 'Active');

                const charLimit = 120; // Limit to 120 characters
                const processedResults = filteredResults.map(item => {
                    const truncateCharacters = (text, limit) => {
                        return text.length > limit ? text.substring(0, limit) + '...' : text;
                    };
                    // Apply truncation to the necessary property
                    item.SubHeader = truncateCharacters(item.SubHeader, charLimit);
                    item.AnnouncementDescription = truncateCharacters(item.AnnouncementDescription, charLimit);
                    return item;
                });

                setAnnouncementsCollData(processedResults.slice(0, 3)); // Limit to 3 items
            });
        // ---------------------------------------  AwardsRecolonization part  ---------------------------------------


        IAwardsRecolonizationOps().getTopAwardsRecolonizations("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 3, props)
            .then((results) => {
                const filteredResults = results.filter(item => item.Status === 'Active');

                const charLimit = 350; // Limit to 120 characters
                const processedResults = filteredResults.map(item => {
                    const truncateCharacters = (text, limit) => {
                        return text.length > limit ? text.substring(0, limit) + '...' : text;
                    };
                    // Apply truncation to the necessary property
                    item.AwardsDescription = truncateCharacters(item.AwardsDescription, charLimit);
                    return item;
                });

                setAwardsRecolonizationCollData(processedResults.slice(0, 3)); // Limit to 3 items
            });


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
            });

        // --------------------------------------- Resource part ---------------------------------------

        IEventGallaryOps().getTopEventGallarys("*,File/Name,EncodedAbsUrl,Modified", "File",
            "Status eq 'Active'", { column: 'Id', isAscending: false }, 6, props)
            .then(results => {
                setEventGallaryCollData(results);
            });



        
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
        speed: 500,
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
const siteUrl = props.currentSPContext.pageContext.web.absoluteUrl;



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
                                            <div className="no-data">No data available</div>
                                            )}
                                        </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
 
                        </div>
                        <div className="row m--20">
                            <div className="image-container">
                                            <a href="#" onClick={(e) => {e.preventDefault();
                                                window.location.href = "../SitePages/HomePage.aspx"; // Navigate without refresh
                                                }} >
                                             <img src={topimage} className="topimagebox" /></a>
                                             </div>
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
                                            <div className="no-data">No data available</div>
                                            )}
                                        </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
 
                        </div>
                        <div className='row'>
                            <div className='col-md-12 p--0'>
                                <div className='main-box'>
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
                                                        <div key={item.Id}>
                                                            <div className="banner-container">
                                                                <img src={item.FileUrl} className="banner-image" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Slider>
                                            )
                                        ) : (
                                            <p>No banners available</p>
                                        )}
                                </div>
                            </div>
                        </div>
                         <div className="row m--20 mt--5">
                            <div className="image-container">
                  <img src={bottomimage} className="topimagebox wid82" />
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
                                        <ul className="menubar2">
                                             {SubMenuCollData && SubMenuCollData.length > 0 ? (
                                            SubMenuCollData.filter(item => item.ParantId === 0).map((item) => (
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
                        </div>
                         </div>
                       
                        <div className='row m-0'>
                            <div className='col-md-9'>
                                <div className='row pt-20'>

                                    {CeoMessageCollData && CeoMessageCollData.length > 0 ? (
                                            CeoMessageCollData.map((item) => ( 
                                            <div className="datasection h-200">
                                                <div className="topheadingsection">
                                                <div className="ceomsg">
                                                    <span style={{ paddingLeft: "5px" }}>Message From CMD</span>
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
                                                <div className="col-md-2 col-sm-2">
                                                    <div>
                                                    <img src={item.FileUrl} alt="CEO" />
                                                    </div> 
                                                </div>
                                                <div className="col-md-10 col-sm-10">
                                                    <div className="messagebox">
                                                    {item.CeoMessage}
                                                    </div>
                                                </div>
                                                </div>
                                            </div> 
                                            ))
                                        ) : (
                                            <div>No data available</div>
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
                                                            <p>No CEO messages available</p> // If no data is available, show this message
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
                                            <div className="ceomsg"><span style={{ paddingLeft: "5px" }}>Announcements
                                            </span>
                                            </div>
                                            {/* <div className="readmoresection">
                                            <a href="#">See all</a>
    
                                        </div> */}

                                        </div>
                                        <div className="row sarsalmainsection">

                                            {AnnouncementsCollData && AnnouncementsCollData.length > 0 ? (
                                            AnnouncementsCollData.length === 1 ? (
                                                <div>
                                                    <img src={AnnouncementsCollData[0].FileUrl}  />
                                                        <div>
                                                            <span className="carosaltitle">{AnnouncementsCollData[0].Header}</span>
                                                            <div className="carosalsubtitle">{AnnouncementsCollData[0].SubHeader}</div>
                                                            <div className="carosaldescription">
                                                                {AnnouncementsCollData[0].AnnouncementDescription}
                                                            </div>
                                                            <div className="datesection"> {AnnouncementsCollData[0].formattedDate}</div>
                                                        </div>
                                                </div>
                                            ) : (
                                                <Slider {...sliderSettingsleader}>
                                                    {AnnouncementsCollData.map((item) => (
                                                        <div key={item.Id}>
                                                            <img src={item.FileUrl} />
                                                            <div>
                                                                <span className="carosaltitle">{item.Header}</span>
                                                                <div className="carosalsubtitle">{item.SubHeader}</div>
                                                                <div className="carosaldescription">
                                                                    {item.AnnouncementDescription}
                                                                </div>
                                                                <div className="datesection"> {item.formattedDate}</div>
                                                            </div>
                                                            

                                                        </div>
                                                    ))}
                                                </Slider>
                                            )
                                            ) : (
                                                <p>No banners available</p>
                                            )}

                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 pr-0 pl--0 pt--20">
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
                                                                        <div className="col-md-4 col-sm-12">
                                                                            <div>
                                                                                <img src={AwardsRecolonizationCollData[0].FileUrl}  className='sliderimg' />
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-md-8 col-sm-12">
                                                                            <div style={{textAlign:'left'}}>
                                                                            <div className="carosaltitle">{AwardsRecolonizationCollData[0].NameofEmployee}</div>
                                                                            <div className="carosal-subtitle">{AwardsRecolonizationCollData[0].Position}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="awscarosaldescription">
                                                                        {AwardsRecolonizationCollData[0].AwardsDescription}
                                                                    </div>
                                                            </div>
                                                
                                                    ) : (
                                                        <Slider {...sliderSettingsAward}>
                                                            {AwardsRecolonizationCollData.map((item) => (
                                                                <div key={item.Id}>
                                                                    <div className="row">
                                                                        <div className="col-md-4 col-sm-12">
                                                                            <div>
                                                                                <img src={item.FileUrl} className='sliderimg' />
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-md-8 col-sm-12">
                                                                            <div style={{textAlign:'left'}}>
                                                                            <div className="carosaltitle">{item.NameofEmployee}</div>
                                                                            <div className="carosal-subtitle">{item.Position}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="awscarosaldescription">
                                                                        {item.AwardsDescription}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    )
                                                    ) : (
                                                        <p>No banners available</p>
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
                                            <div className="ceomsg">
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
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Policy Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}


                                                    </li>
                                                ))
                                                ) : (
                                                <li>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-12  pr-0 pt--20 pl--0">
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
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Training Resources Title'}
                                                        </a>
                                                    )}
                                                    </li>
                                                ))
                                                ) : (
                                                <li>No policies available.</li>
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
                                            <div className="ceomsg">
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
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Certificate Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}



                                                    </li>
                                                ))
                                                ) : (
                                                <li>No policies available.</li>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 col-sm-12  pr-0 pt--20 pl--0">
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
                                                            style={{ maxWidth: '30px', maxHeight: '30px', marginRight: '10px' }}
                                                        />
                                                        {item.File.Name ? item.File.Name.substring(0, item.File.Name.lastIndexOf('.')) : 'Download Title'}
                                                        </a>
                                                    )}

                                                    {/* Display file name without extension and handle click to download */}


                                                    </li>
                                                ))
                                                ) : (
                                                <li>No policies available.</li>
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
                                    <div className="col-md-12 col-sm-12 pr-0 pl-0 annucarosalsection">
                                    <div className="row">
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
                                        <div className="no-data">No QuickLinks available</div>
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
                                    <div className="row">
                                    <div className="col-md-12 col-sm-12 pr-0">
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
                                        <div className="col-md-3 col-sm-12 pr-0">
                                            <div className="mbox">
                                                <img src={item.FileUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-9 col-sm-12 pr-0">
                                            <div className="desc-box">
                                            {item.EventDescription}
                                            </div>
                                            <div className="timebox">
                                            <span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                                            {item.StartTime} <span>-</span> {item.EndTime}
                                            </div>
                                        </div>
                                        </div>
                                    ))
                                    ) : (
                                    <div>No data available</div>
                                    )}
                                </div>
                                
                                </div>
                                <div className="row pt-20 pl-10">
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
                                        <div className="col-md-4 p-0 col-sm-12 MainGallery">
                                            <div key={index} className="eventimg">
                                            {/* Dynamically rendering the image or any content */}
                                            <img src={item.FileUrl} alt={item.FileUrl} />
                                            {/* <p>{item.FileUrl}</p> */}
                                            {/* Add more dynamic content as per your QuickLinksCollData structure */}
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <div>No events available</div>
                                    )}

                                    </div>

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Formik>
    );
}

