import * as React from 'react';
import styles from './PatelEnggHub.module.scss';
//import { IPatelEnggHubProps } from './IPatelEnggHubProps';++++++++++++++++++++++++++++++++++++++++++++++++++++++6666666666666

import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp/presets/all';
import SPCRUDOPS from '../../services/dal/spcrudops';
import {ISafetyPortalProps} from '../../services/interface/ISafetyPortalProps';
//const banner: any = require('../assets/download.png');
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, match, useParams, Redirect } from 'react-router-dom';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
//const logo: any = require('../assets/logo.png');
//import {ProjectSiteHome} from '../../patelEnggHub/components/Site/Home';
import {SPLandingPage} from './Site/SPLandingPage';
import {IIIHubHome} from './Site/IIIHubHome';
import {NavigationPage} from './Site/SitePages/NavigationPage';
import {HrPage} from './Site/SitePages/Hrlib';
// import {TreeStructure} from './Site/SitePages/TreeStructure';
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');

//  import {ListViewlatestpages} from '../../patelEnggHub/components/Site/ViewMorePages/Listviewlatest';
import {CMDMessage} from '../components/Site/SitePages/ViewMorePages/CMDMessage'; 


import { ListView } from '@pnp/spfx-controls-react';
export default class PatelEnggHub extends React.Component<ISafetyPortalProps> {
  public state = {
   siteColl: [] as [],siteNavigationColl: [] as []
  }; 
  constructor(props: ISafetyPortalProps | Readonly<ISafetyPortalProps>) {
    super(props);
    sp.setup({
        spfxContext: this.props.currentSPContext
    });
    this.state = {
        siteColl: [], siteNavigationColl:[]
    };
    this.getInProgressBlockReleaseRequests = this.getInProgressBlockReleaseRequests.bind(this);
    this.getGlobalNavigation = this.getGlobalNavigation.bind(this);   
}

public async componentWillMount() {
 await this.getInProgressBlockReleaseRequests();
 await this.getGlobalNavigation();
}

public getInProgressBlockReleaseRequests = async () => {
  const spCrudOps = SPCRUDOPS();
    return  (await spCrudOps).getNavigation(this.props).then(results => {
      if(results!==undefined)
      {
        if(results._raw.PrimaryQueryResult.RelevantResults.Table.Rows)
        {
          this.setState({ siteColl: results._raw.PrimaryQueryResult.RelevantResults.Table.Rows });

          console.log(results);
        }
        
        return results;
      }
      
        },(error: any) => {
          console.log(error);
      });
        
//});

}
public getGlobalNavigation = async () => {
  const spCrudOps = SPCRUDOPS();

    return  (await spCrudOps).getNewNavigation(this.props).then(results => {
      if(results!==undefined)
      {
        if(results)
        {
          this.setState({ siteNavigationColl: results });

          console.log(results);
        }
        
        return results;
      }
      
        },(error: any) => {
          console.log(error);
      });
        
//});

}
  public render(): React.ReactElement<ISafetyPortalProps> {
    let Title:string;
    let Path:string;
    return (
      <section className=''>
          <div className='row'>
              <HashRouter>
                <Switch>
                  {/* <Route path='/' exact={true} render={() => <SPLandingPage  {...this.props} />} /> */}
                  <Route path='/' exact={true} render={() => <IIIHubHome  {...this.props} />} />
                  
                  {/* <Route path='/Library/:itemTitle'  render={() => <PoliciesViewmore  {...this.props} />} /> */}
                  <Route path='/Library/:itemTitle'  render={() => <HrPage  {...this.props} />} />
                  <Route path='/CMDMessage'  render={() => <CMDMessage  {...this.props} />} />
                  <Route path='/NavigationPage'  render={() => <NavigationPage  {...this.props} />} />
                  {/* <Route path='/TreeStructure'  render={() => <TreeStructure  {...this.props} />} /> */}
                  </Switch>
              </HashRouter> 
          </div>
      </section>
    );
     
  }
}
