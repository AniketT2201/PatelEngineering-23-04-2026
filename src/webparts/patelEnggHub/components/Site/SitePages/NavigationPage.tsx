import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import USESPCRUD, { ISPCRUD } from '../../../../services/bal/spcrud';
import ISubMenuOps from '../../../../services/bal/SubMenu';
import ToolsOps from '../../../../services/bal/Tools';
import { ITools } from '../../../../services/interface/ITools';

import { ISafetyPortalProps } from '../../../../services/interface/ISafetyPortalProps';
import { ITopbanner } from '../../../../services/interface/ITopBanner';
import ITopBannerOps from '../../../../services/bal/TopBanner';
import { ISubMenu } from '../../../../services/interface/ISubMenu';
import './NavigationPage.scss';
import '../SPlandingpage.scss';
import logo from '../../../assets/Safety Portal Images/logonew.png';
import MAMTopImg from '../../../assets/Safety Portal Images/MAMtopimg.png';
import patelnewlogo from '../../../assets/Safety Portal Images/patelnewlogo.png';
import dashboardImg from '../../../assets/Safety Portal Images/banner11.png';
//import * as $ from 'jquery';
import { SPComponentLoader } from '@microsoft/sp-loader';
SPComponentLoader.loadCss('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
 
export const NavigationPage: React.FC<ISafetyPortalProps> = (props) => {
  const history = useHistory();

  const [srSubMenus, setSrSubMenus] = useState<ITools[]>([]);
  const [srOpenMenuId, setSrOpenMenuId] = useState<number | null>(null);

  /* ---------- Load User Groups + SubMenu ---------- */
  useEffect(() => {
    const loadMenus = async () => {
      const spCrud: ISPCRUD = await USESPCRUD();
      const userGroups = await spCrud.getLoggedInSiteGroups(props);
      const groupIds = userGroups.map(g => g.Id);
      const submenuData = await ToolsOps().getToolsData(props);

      setSrSubMenus(submenuData);
    };

    loadMenus();
  }, []);

  /* ---------- Helpers ---------- */
  const srGetChildren = (parentId: number) =>
    srSubMenus.filter(item => item.Id === parentId);

  const srNavigate = (url?: string, title?: string) => {
    if (url?.startsWith('http')) {
      window.open(url, '_blank');
    } else if (title) {
      history.push(`/Library/${title}`);
    }
  };

  /* ---------- UI ---------- */
  return (
    <div>
      {/* ===== Header ===== */}
      <div className="row m--20">
        <div className="image-container">
          <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                window.location.href = "../SitePages/HomePage.aspx";
            }}
          >
            <img src={MAMTopImg} className="topimagebox" />
            <img src={patelnewlogo} className="footerimgboxtop" /> 
          </a>
        </div>
      </div>
      <div className="sr-layout-root">
        {/* ===== Sidebar ===== */}
        <aside className="sr-sidebar">
          <div className="sr-brand">MM_MIS</div>
          <ul className="sr-menu-list">
            {srSubMenus
              .map(item => (
                <li
                  key={item.Id}
                  className="sr-menu-item-wrapper"
                  onClick={() => srNavigate(item.Url, item.Tools)}
                >
                  <button className="sr-menu-item">
                    <span>{item.Tools}</span>
                  </button>
                </li>
              ))}
          </ul>
        </aside>
        {/* ===== Dashboard ===== */}
        <main className="sr-dashboard">
          <div className="sr-dashboard-card" 
            // style={{
            //   backgroundImage: `url(${dashboardImg})`, 
            //   backgroundSize: 'cover', 
            //   backgroundPosition: 'center', 
            //   width: '100%'
            // }}
          >
            <div></div>
            {/* <img
              src={dashboardImg}
              alt="Dashboard"
              className="sr-dashboard-image"
            /> */}
          </div>
        </main>
      
      </div>
    </div>
  );
};
