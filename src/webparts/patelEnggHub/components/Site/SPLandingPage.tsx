import * as React from 'react';
import { useState, useMemo } from 'react';
import USESPCRUD, { ISPCRUD } from '../../../services/bal/spcrud';
import './SPlandingpage.scss';
import { ISafetyPortalProps } from '../../../services/interface/ISafetyPortalProps';
import styles from '../PatelEnggHub.module.scss';
import { Formik, FormikProps, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';
import patelfooterlogo from '../../assets/Safety Portal Images/patelfooterlogo.png';
SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

import logo from '../../assets/Safety Portal Images/logonew.png';
import { SPComponentLoader } from '@microsoft/sp-loader';

import { ITopMenu } from '../../../services/interface/ITopMenu';
import ITopMenuOps from '../../../services/bal/TopMenu';
import { ISubMenu } from '../../../services/interface/ISubMenu';
import ISubMenuOps from '../../../services/bal/SubMenu';
import { ITopbanner } from '../../../services/interface/ITopBanner';
import ITopBannerOps from '../../../services/bal/TopBanner';
import { ICeoMessage } from '../../../services/interface/ICeoMessage';
import ICeoMessageOps from '../../../services/bal/CeoMessage';
import { IAnnouncements } from '../../../services/interface/IAnnouncements';
import IAnnouncementsOps from '../../../services/bal/Announcements';
import { IAwardsRecolonization } from '../../../services/interface/IAwardsRecolonization';
import AwardsRecolonizationOps from '../../../services/bal/AwardsRecolonization';
import { IPolicies } from '../../../services/interface/IPolicies';
import IPoliciesOps from '../../../services/bal/Policies';
import { ITrainingResources } from '../../../services/interface/ITrainingResources';
import ITrainingResourcesOps from '../../../services/bal/TrainingResources';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

import { ICertificates } from '../../../services/interface/ICertificates';
import ICertificatesOps from '../../../services/bal/Certificates';
import { IDownloads } from '../../../services/interface/IDownloads';
import IDownloadsOps from '../../../services/bal/Downloads';
import { IQuickLinks } from '../../../services/interface/IQuickLinks';
import IQuickLinksOps from '../../../services/bal/QuickLinks';
import { IEvents } from '../../../services/interface/IEvents';
import IEventsOps from '../../../services/bal/Events';
import { IEventGallary } from '../../../services/interface/IEventGallary';
import IEventGallaryOps from '../../../services/bal/EventGallary';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useHistory, Link } from 'react-router-dom';
import wordlogo from '../../assets/Safety Portal Images/spword.png';
import pdflogo from '../../assets/Safety Portal Images/pdf.png';


import { Modal, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

export const SPLandingPage: React.FunctionComponent<ISafetyPortalProps> = (props: ISafetyPortalProps) => {
  let GroupData = [];


  const [spCrud, setSPCRUD] = React.useState<ISPCRUD>();
  const [selectedTitle, setSelectedTitle] = useState(null);

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState<boolean>(false);
  const [issafetyModalOpen, setIssafetyModalOpen] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [TopMenuCollData, setTopMenuCollData] = useState<ITopMenu[]>();
  const [SubMenuCollData, setSubMenuCollData] = useState<ISubMenu[]>();
  const [TopBannerCollData, setTopBannerCollData] = useState<ITopbanner[]>();
  const [CeoMessageCollData, setCeoMessageCollData] = useState<ICeoMessage[]>();
  const [AnnouncementsCollData, setAnnouncementsCollData] = useState<IAnnouncements[]>();
  const [AwardsRecolonizationCollData, setAwardsRecolonizationCollData] = useState<IAwardsRecolonization[]>();
  const [PoliciesCollData, setPoliciesCollData] = useState<IPolicies[]>();
  const [TrainingResourcesCollData, setTrainingResourcesCollData] = useState<ITrainingResources[]>();
  const [CertificatesCollData, setCertificatesCollData] = useState<ICertificates[]>();
  const [DownloadsCollData, setDownloadsCollData] = useState<IDownloads[]>();
  const [QuickLinksCollData, setQuickLinksCollData] = useState<IQuickLinks[]>();
  const [EventGallaryCollData, setEventGallaryCollData] = useState<IEventGallary[]>();
  const [EventsCollData, setEventsCollData] = useState<IEvents[]>();

  const [currentDate, setCurrentDate] = useState(new Date());
  const history = useHistory();
  // const navigate = useNavigate();


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  const [selectedId, setSelectedId] = useState(null);
  // for file extension logo



  function getFileLogo(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
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






  // Open the second modal
  const openSecondModal = () => setIsSecondModalOpen(true);
  const opensafetyModal = () => setIssafetyModalOpen(true);
  // for second model


  const newsId = 123;
  let spCrudObj: ISPCRUD;
  let itemsPerPage: number;
  let appMatrixResult = [];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  const toggleMenu2 = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  // const getChildren = (ParantId) => {
  //     return TopMenubarCollData.filter(item => item.ParantId === ParantId);
  //   };



  React.useEffect(() => {
   if (props.context.pageContext.legacyPageContext.isSiteAdmin) {

    setTimeout(() => {
      const gear = document.querySelector("#O365_MainLink_Settings");

      if (gear) {
        (gear as HTMLElement).style.display = "none";
      }

    }, 1500);

  }
    // getLoggedInUserGroups().then((brrUesrLoggedColl) => {
    //   brrUesrLoggedColl.map(brritems => {
    //     console.log(brrUesrLoggedColl)

    //     GroupData.push(brritems.Id);
    //   });
    //   console.log(brrUesrLoggedColl);
    //   if (GroupData.length !== 0) {


    //   }
    // }, error => {
    //   console.log(error);
    // });


    // Fetch the logged-in user's group data and update GroupData
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

      // const filteredSubMenu1 = SubMenuColl.filter(item => {
      //   // Check if the item has GroupAccess and compare it with GroupData
      //   if (item.GroupAccess && Array.isArray(item.GroupAccess)) {
      //     // Check if there's any intersection between the user's groups and the item's GroupAccess
      //     return item.GroupAccess.some(group => GroupData.includes(group.Title));
      //   }
      //   return true; // If no GroupAccess defined, show the item by default
      // });
      // if(filteredSubMenu1.length>0){
      //   alert('You are not Authorize for this page!!');
      //   history.push('/');
      // }

      // Set the filtered submenu data
      setSubMenuCollData(filteredSubMenu);
      
    }, error => {
      console.error('Error fetching submenu data:', error);
    });
  }
  
}, error => {
  console.log('Error fetching user group data:', error);
});


    ITopMenuOps().getTopMenuData(props).then((TopMenuColl) => {
      console.log(' TopMenu Data received:', TopMenuColl);
      setTopMenuCollData(TopMenuColl);
    }, error => {
      console.error('Error fetching data:', error);
    });
    // ISubMenuOps().getSubMenuData(props).then((SubMenuColl) => {
    //   console.log(' SubMenu Data received:', SubMenuColl);
    //   setSubMenuCollData(SubMenuColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });



    // ITopBannerOps().getTopBannerData(props).then((TopBannerColl) => {
    //   console.log(' ITopBanner Data received:', TopBannerColl);
    //   setTopBannerCollData(TopBannerColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });


    // ICeoMessageOps().getCeoMessageData(props).then((CeoMessageColl) => {
    //   console.log(' Ceo Message Data received:', CeoMessageColl);
    //   setCeoMessageCollData(CeoMessageColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    

    // IAnnouncementsOps().getAnnouncementsData(props).then((AnnouncementsColl) => {
    //   console.log('Announcements Data received:', AnnouncementsColl);

    //   // Assuming the AnnouncementsColl contains a date field called 'announcementDate'
    //   const formattedAnnouncements = AnnouncementsColl.map((announcement) => {
    //     const dateString = announcement.AnnouncementDate; // Example date field
    //     const date = new Date(dateString);

    //     // Format the date to 'Jan 31, 2024'
    //     const formattedDate = new Intl.DateTimeFormat('en-US', {
    //       year: 'numeric',
    //       month: 'short',
    //       day: 'numeric',
    //     }).format(date);

    //     return {
    //       ...announcement,
    //       formattedDate: formattedDate,
    //     };
    //   });

    //   // Set the formatted data in the state or perform other actions
    //   setAnnouncementsCollData(formattedAnnouncements);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    // AwardsRecolonizationOps().getAwardsRecolonizationData(props).then((AwardsRecolonizationColl) => {
    //   console.log(' Awards and Recolonization Data received:', AwardsRecolonizationColl);
    //   setAwardsRecolonizationCollData(AwardsRecolonizationColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    // IPoliciesOps().getPoliciesData(props).then((PoliciesColl) => {
    //   console.log(' Policies Data received:', PoliciesColl);
    //   const latestPolicies = PoliciesColl.slice(-3).reverse();
    //   setPoliciesCollData(latestPolicies);
    //   //setPoliciesCollData(PoliciesColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });
    // ITrainingResourcesOps().getTrainingResourcesData(props).then((TrainingResourcesColl) => {
    //   console.log(' Policie Data received:', TrainingResourcesColl);
    //   const latestPolicies = TrainingResourcesColl.slice(-3).reverse();
    //   setTrainingResourcesCollData(latestPolicies);
    //   //setPoliciesCollData(PoliciesColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    // ICertificatesOps().getCertificatesData(props).then((CertificatesColl) => {
    //   console.log(' Certificates Data received:', CertificatesColl);
    //   const latestCertificates = CertificatesColl.slice(-3).reverse();
    //   setCertificatesCollData(latestCertificates);
    //   //setPoliciesCollData(PoliciesColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });


    // IDownloadsOps().getDownloadsData(props).then((DownloadsColl) => {
    //   console.log(' Policie Data received:', DownloadsColl);
    //   const latestDownloads = DownloadsColl.slice(-3).reverse();
    //   setDownloadsCollData(latestDownloads);
    //   //setPoliciesCollData(PoliciesColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    // IQuickLinksOps().getQuickLinksData(props).then((QuickLinksColl) => {
    //   console.log(' QuickLinks Data received:', QuickLinksColl);
    //   const latestDownloads = QuickLinksColl.slice(-4);
    //   setQuickLinksCollData(latestDownloads);
    //   //setQuickLinksCollData(QuickLinksColl);
    // }, error => {
    //   console.error('Error fetching data:', error);
    // });
    // IEventsOps().getEventsData(props).then((EventsColl) => {
    //   console.log('Events Data received:', EventsColl);

    //   // Slice the first 3 events from the fetched data
    //   const top3Events = EventsColl.slice(0, 3);

    //   // Map through the top 3 events and format the date and other components
    //   const EventsCollData = top3Events.map((Event) => {
    //     const dateString = Event.EventDate; // Example date field
    //     const date = new Date(dateString);

    //     // Format the date to 'Jan 31, 2024'
    //     const formattedDate = new Intl.DateTimeFormat('en-US', {
    //       year: 'numeric',
    //       month: 'short',
    //       day: 'numeric',
    //     }).format(date);

    //     // Extract individual date components (e.g., month, day, date, etc.)
    //     const EventDate = new Date(Event.EventDate);
    //     const monthName = formatMonthName(EventDate);
    //     const dayName = formatDayName(EventDate);
    //     const dayDate = EventDate.getDate(); // Day of the month (e.g., "31")

    //     return {
    //       ...Event,
    //       formattedDate,  // Add formatted date to the result
    //       monthName,      // Add monthName to the event object
    //       dayName,        // Add dayName to the event object
    //       dayDate,        // Add dayDate to the event object
    //     };
    //   });

    //   // Assuming there's a state setter like 'setEventsCollData' to update the event data
    //   setEventsCollData(EventsCollData);

    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    // IEventGallaryOps().getEventGallaryData(props).then((EventGallaryColl) => {
    //   console.log(' EventGallary Data received:', EventGallaryColl);
    //   const latestDownloads = EventGallaryColl.slice(-6).reverse();
    //   setEventGallaryCollData(latestDownloads);

    // }, error => {
    //   console.error('Error fetching data:', error);
    // });

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);


  }, [itemOffset, itemsPerPage]);



  const getChildren = (ParantId) => {
    return TopMenuCollData.filter(item => item.ParantId === ParantId);
  };

  const getsubChildren = (ParantId) => {
    return SubMenuCollData.filter(item => item.ParantId === ParantId);
  };


  const validate = yup.object().shape({//ReqDesc ReqType ReqDate //vendorId//CompNameId


  });

  const initialvalues = {
    quiz: '',
    condition: 'Draft',
    attachPlan: '',
    isDraft: false

  };

  const handleClick = () => {
    event.preventDefault();
    // Navigate programmatically
    history.push('/NewsViewMore');
  };

  function getFieldProps(formik: FormikProps<any>, field: string) {
    return { ...formik.getFieldProps(field), errorMessage: formik.errors[field] as string };
  }

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

  // const handlePrevMonth = () => {
  //   setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  // };

  // const handleNextMonth = () => {
  //   setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  // };
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
  const calendar = generateCalendar();

  // for find day month date time
  function formatDate(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const EventDate = new Date(date);
    const dayOfWeek = daysOfWeek[EventDate.getDay()]; // Get the day of the week (e.g., "Fri")
    const day = EventDate.getDate(); // Get the day of the month (e.g., "31")
    const month = monthsOfYear[EventDate.getMonth()]; // Get the month (e.g., "Feb")

    return `${day} ${month}, ${dayOfWeek}`;
  }

  function formatTime(timeString) {
    const hours = timeString.slice(0, 2); // Extract hours
    const minutes = timeString.slice(3, 5); // Extract minutes

    let ampm = 'AM';
    let formattedHours = parseInt(hours, 10);
    if (formattedHours >= 12) {
      ampm = 'PM';
      if (formattedHours > 12) {
        formattedHours -= 12; // Convert to 12-hour format
      }
    }
    if (formattedHours === 0) formattedHours = 12; // Handle midnight (00:00)

    return `${formattedHours}:${minutes} ${ampm}`;
  }

  // Additional functions for month name, day name, and day of the month
  function formatMonthName(date) {
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsOfYear[date.getMonth()];
  }

  function formatDayName(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }
  // for redirect next page
  const handleClickAnnouncements = (event) => {
    event.preventDefault();
    window.open('../Announcements/Forms/AllItems.aspx', '_blank');
  };
  const handleClickPolicies = (event) => {
    event.preventDefault();
    window.open('../Policies/Forms/AllItems.aspx', '_blank');
  };
  const handleClickTrainingResources = (event) => {
    event.preventDefault();
    window.open('../TrainingResources/Forms/AllItems.aspx', '_blank');
  };
  const handleClickCertificates = (event) => {
    event.preventDefault();
    window.open('../Certificates/Forms/AllItems.aspx', '_blank');
  };
  const handleClickDownloads = (event) => {
    event.preventDefault();
    window.open('../Downloads/Forms/AllItems.aspx', '_blank');
  };
  const handleClickEvents = (event) => {
    event.preventDefault();
    window.open('../Events/Forms/AllItems.aspx', '_blank');
  };
  const handleClickEventGallary = (event) => {
    event.preventDefault();
    window.open('../Events/Forms/AllItems.aspx', '_blank');
    //window.open('/../../Events/Forms/AllItems.aspx', '_blank');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };
  const openModal = () => {
    setIsModalOpen(true);

  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensub, setIsOpensub] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle the menu state
  const toggleMenunew = () => {
    setIsOpen((prevState) => !prevState); // Toggle the state
  };
  const toggleMensub = () => {
    setIsOpensub((prevState) => !prevState); // Toggle the state
  };

  const handleItemClick = (itemTitle, itemUrl) => {
    setSelectedTitle(itemTitle); // Set the selected title (optional: if you need it for later use)
    // navigate(`/HR/${itemTitle}`); // Redirect to the item's URL
    history.push(`/Library/${itemTitle}`); // Use history.push instead of navigate

  };
  

  return (
    <div>


      <Formik initialValues={initialvalues}
        validationSchema={validate}
        onSubmit={(values, helpers) => { }}>{
          formik => (
            // <div>
            <div className="container-fluid">
              <div className="row header">
                <div className="col-md-1 col-sm-1 w--2">
                <a href="#" onClick={(e) => {e.preventDefault();
                    window.location.href = "https://patelengineering365.sharepoint.com/sites/MAM/SitePages/MAMHomePage.aspx#/"; // Navigate without refresh
                  }}
                >
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

              </div>

              

              <div className="main-box">
                
                <div className="row topsliderbox">
                      
                      {/* {TopBannerCollData && TopBannerCollData.length > 0 ? (
                            TopBannerCollData.length === 1 ? (
                                <div>
                                    <div className="banner-container">
                                        <img src={TopBannerCollData[0].FileUrl} className="banner-image" />
                                    </div>
                                </div>
                            ) : (
                                <Slider {...settings}>
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
                        )} */}



                  {/* <Slider {...settings}>
                    {TopBannerCollData !== undefined && TopBannerCollData.length > 0 ? TopBannerCollData.map((image, index) => (
                      <div key={index}>
                        <img src={image.FileUrl} alt={`Slide ${index + 1}`} className='sliderimg' />

                      </div>
                    )) : ""}
                  </Slider> */}
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
                <div className="row pt-10">
                  <div className="col-md-9 col-sm-12">
                    <div className="row pt-20">


                      {CeoMessageCollData && CeoMessageCollData.length > 0 ? (
                        CeoMessageCollData.map((item) => (
                          <div className="datasection h-200">
                            <div className="topheadingsection">
                              <div className="ceomsg">
                                <span style={{ paddingLeft: "5px" }}>Message From CMD</span>
                              </div>
                              <div className="readmoresection">
                                <a href='#'
                                  onClick={() => {

                                    openModal();  // Ensure item.Id exists before calling openModal


                                  }}>Read More</a>
                              </div>
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
                        <div className="datasection">
                          <div className="topheadingsection">
                            <div className="ceomsg"><span style={{ paddingLeft: "5px", marginLeft:'12px' }}>Announcements
                            </span>
                            </div>
                            <div className="readmoresection">
                              <a href="#" onClick={handleClickAnnouncements}>See all</a>
                              {/* <a href="/sites/PatelEngineeringSafetyPortal/Announcements/Forms/AllItems.aspx" target="_blank">See all</a> */}</div>

                          </div>
                          <div className="row sarsalmainsection">
                            <Slider {...settings}>
                              {AnnouncementsCollData !== undefined && AnnouncementsCollData.length > 0 ? AnnouncementsCollData.map((item, index) => (
                                <div key={index}>
                                  <img src={item.FileUrl} alt={`Slide ${index + 1}`} className='sliderimg' />
                                  <div>
                                    <span className="carosaltitle">{item.Header}</span>
                                    <div className="carosalsubtitle">{item.SubHeader}</div>
                                    <div className="carosaldescription">
                                      {item.AnnouncementDescription}
                                    </div>
                                    <div className="datesection"> {item.formattedDate}</div>
                                  </div>
                                </div>
                              )) : ""}
                            </Slider>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 pr-0 pl--0 pt--20">
                        <div className="datasection Awardsbox">
                          <div className="topheadingsection">
                            <div className="ceomsg awsceo"><span style={{ paddingLeft: "5px" }}>Awards & Recolonization
                            </span></div>

                          </div>
                          <div className="row p-20">
                            <div className="col-md-12 col-sm-12 pr-0 pl-0 Awardssection">
                              <Slider {...settings}>
                                {AwardsRecolonizationCollData !== undefined && AwardsRecolonizationCollData.length > 0 ? AwardsRecolonizationCollData.map((item, index) => (
                                  <div key={index}>
                                    <div className="row">
                                      <div className="col-md-4 col-sm-12">

                                        <div>
                                          <img src={item.FileUrl} alt={`Slide ${index + 1}`} className='sliderimg' />
                                        </div>

                                      </div>
                                      <div className="col-md-8 col-sm-12">
                                        <div style={{textAlign:'left'}}>
                                          <div className="carosaltitle">{item.NameofEmployee}</div>
                                          <div className="carosal-subtitle">{item.Position}</div>
                                        </div>
                                      </div>
                                    </div>


                                    <div>

                                      <div className="awscarosaldescription">
                                        {item.AwardsDescription}
                                      </div>

                                    </div>
                                  </div>
                                )) : ""}
                              </Slider>



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
                              <span style={{ paddingLeft: "5px" , marginLeft:'12px' }}>Policies</span>
                            </div>
                            <div className="readmoresection">
                              <a href="#" onClick={handleClickPolicies}>See all</a>
                            </div>
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
                            <div className="readmoresection">
                              <a href="#" onClick={handleClickTrainingResources}>See all</a>
                            </div>
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
                    <div className="row pt-20">
                      <div className="col-md-6 col-sm-12 pl-0 pr-0">
                        <div className="datasection wordbox">
                          <div className="topheadingsection">
                            <div className="ceomsg">
                              <span style={{ paddingLeft: "5px" , marginLeft:'12px' }}>Certificates</span>
                            </div>
                            <div className="readmoresection">
                              <a href="#" onClick={handleClickCertificates}>See all</a>
                            </div>
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
                            <div className="readmoresection">
                              <a href="#" onClick={handleClickDownloads}>See all</a></div>
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

                  <div className="col-md-3 col-sm-12 pt-20 pr-0 pl--3" >
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
                                    // href={item.Url || '#'}
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
                    <div className="pt-20">
                      <div className="datasection qlbox">
                        <div className="ceomsg" style={{ borderLeft: "3px solid #f6f6f6" }}>
                          <span style={{ paddingLeft: "5px" }}>{currentDate.toLocaleString('default', { month: 'long' })}</span>
                        </div>
                        <div className="row">
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

                    <div className="pt-20">
                      <div className="datasection eventbox">
                        <div className="topheadingsection">
                          <div className="ceomsg"><span style={{ paddingLeft: '5px' }}>Events</span></div>
                          <div className="readmoresection">
                            <a href="#" onClick={handleClickEvents}>See all</a></div>
                        </div>
                        {EventsCollData !== undefined && EventsCollData.length > 0 ? (
                          EventsCollData.map((item, index) => (
                            <div className="row PE-tb pt--10" key={index}>
                              <div className="col-md-3 col-sm-12 pr-0">
                                <div className="mbox">
                                  <div className="monthbox">
                                    {item.monthName}
                                  </div>
                                  <div className="subbpx">
                                    {item.dayDate}
                                  </div>
                                  <div className="daybox">
                                    {item.dayName}
                                  </div>
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
                          <div className="ceomsg" ><span style={{ paddingLeft: "5px" }}>Event-Gallary
                          </span></div>
                          <div className="readmoresection" style={{ right: "28px" }}>
                            <a href="#" onClick={handleClickEventGallary}>See all</a></div>

                        </div>
                        <div className="row ptb-5">

                          {EventGallaryCollData && EventGallaryCollData.length > 0 ? (
                            EventGallaryCollData.map((item, index) => (
                              <div className="col-md-4 col-sm-12">
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
              <div className="footerbox">
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
                  
                  <div className="col-md-5 col-sm-12 ftext valigncenter">@ 2025<span className="innertxt"> Patel Engineering Limited. </span>All Rights Reserved.</div>
                  <div className="col-md-2 col-sm-12 valigncenter txtRight"><img src={patelfooterlogo} className="footerimgbox" /></div>
              </div>
              </div>


            </div>

          )
        }
      </Formik>

    </div>
  );

}