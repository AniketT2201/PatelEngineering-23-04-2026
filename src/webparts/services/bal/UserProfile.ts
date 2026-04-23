import SPCRUDOPS from '../dal/spcrudops';
import { IUserProfile } from '../interface/IUserProfile';
import { ISafetyPortalProps } from "../interface/ISafetyPortalProps";



export interface UserProfileOps {
    getLoggUserProfile(props: ISafetyPortalProps): Promise<IUserProfile>;
}

export default function LoggUserProfileOps() {
    const spCrudOps = SPCRUDOPS();
        const getLoggUserProfile = async (props: ISafetyPortalProps): Promise<IUserProfile> => {
            return await (await spCrudOps).currentProfile(props).then(results => {
                    let brr: Array<IUserProfile> = new Array<IUserProfile>();
                    if(results !== undefined){
                        brr.push({
                            AccountName: results.AccountName,
                            DisplayName:results.DisplayName,
                            UserProfileProperties:results.UserProfileProperties!==undefined?results.UserProfileProperties:[],
                            Location:results.UserProfileProperties.find((prop: { Key: string; }) => prop.Key === 'Office')?.Value || "Location not found"
                        });
                    }
                    return brr[0];
 
                        
                       
                }
                );
        //});
    };





    return {
        getLoggUserProfile
    };
}