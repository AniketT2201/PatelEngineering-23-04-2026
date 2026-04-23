import * as React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import USESPCRUD, { ISPCRUD } from '../../../../../services/bal/spcrud';
import { ICeoMessage }  from '../../../../../services/interface/ICeoMessage';
import ICeoMessageOps from '../../../../../services/bal/CeoMessage';
import './commoncss.scss';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { useHistory, Link } from 'react-router-dom';
import { ISafetyPortalProps } from '../../../../../services/interface/ISafetyPortalProps';
 
  

export const CMDMessage: React.FunctionComponent<ISafetyPortalProps> = (props: ISafetyPortalProps) => {
  let GroupData = [];

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  
  const [coordinates, setCoordinates] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Location, setLocation] = useState<string>('');
  const history = useHistory();
  const [calendar, setCalendar] = useState<(number | string)[][]>([]);
  const [weatherData, setWeatherData] = useState(null);
  const [userCity, setUserCity] = useState('DefaultCity');
const [groupdata, setgroupdata]= useState(0);
    const [CeoMessageCollData, setCeoMessageCollData] = React.useState<ICeoMessage[]>();
  

  const [selectedId, setSelectedId] = useState(null);
  let spCrudObj: ISPCRUD;
  let itemsPerPage: number;
  let appMatrixResult = []; 

  itemsPerPage = 1;
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };
  const toggleMenu2 = () => {
    setIsMenuOpen(prevState => !prevState);
  };

 
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [weather, setWeather] = React.useState<{
    temperature: string;
    description: string;
    city: string;
    imageUrl:any;
  } | null>(null);

 
 
  

  React.useEffect(() => {
    
    
    let Location = "";
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
    
    
   
    
     
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);


  }, [itemOffset, itemsPerPage]);

  const validate = yup.object().shape({//ReqDesc ReqType ReqDate //vendorId//CompNameId


  });

  const initialvalues = {
    quiz: '',
    condition: 'Draft',
    attachPlan: '',
    isDraft: false

  };

 
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensub, setIsOpensub] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Function to toggle the menu state
 
  const siteUrl = props.currentSPContext.pageContext.web.absoluteUrl;
  return (
    <div className="mainsection">
       
    
          <Formik initialValues={initialvalues}
            validationSchema={validate}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={(values, helpers) => { }}>{
              (          formik: any) => ( 
                // <div>
                <div className="mainSection-management">  
                    <div className="homelink">
                        <i className="fa fa-home"></i>
                        <a href="../SitePages/HomePage.aspx" >Home</a>
                        <i className="fa fa-angle-right"></i>
                    </div> 
                   <div className="plr--30" style={{paddingBottom:'20px'}}>
                    <div className="header-management-box">Message From CMD</div>
                    <div>
                      <div className="row ptb-5 msgboxsection "> 
                         {CeoMessageCollData !== undefined && CeoMessageCollData.length > 0 ? (
                              CeoMessageCollData.map((item, index) => (
                                <div key={index}>
                                  
                                  <div className="row">
                                <div className="col-md-4 col-sm-12 text-center"> 
                                <img src={item.FileUrl} className="ceomsg--box" />
                                </div>
                                <div className="col-md-8 col-sm-12">
                                <div className='pr-33'>
                                  <div><i className="fa fa-quote-left"></i></div>
                                <div className='innermessagebox'>{item.CeoMessage}</div>
                               
                                <div className='text-right'> <i className="fa fa-quote-right"></i></div>
                                </div>
                                </div>
                          </div>
                                </div>
                              ))
                            ) : (
                              <div  className="alert alert-info">No Message From CMD </div>
                            )}  
                            </div>
                    </div>
     
    
                  </div>
    
                  </div>
              )
            }  
          </Formik>
    
        </div>
  );

}