import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { ISiteName } from '../interface/ISiteName';

export interface ISiteNameOps {
    getSiteNameData(props: ISafetyPortalProps): Promise<ISiteName[]>;
}

export default function SiteNameOps() {
    const spCrudOps = SPCRUDOPS();

    const getSiteNameData = async (props: ISafetyPortalProps): Promise<ISiteName[]> => {
        try {
            const spCrudOpsInstance = await spCrudOps;
            const results = await spCrudOpsInstance.getData(
                "SiteName",
                "*",
                "",
                "Status eq 'Active'",
                { column: 'ID', isAscending: false },
                props
            );

            console.log('Results from API for SiteName:', results);

            const processed: ISiteName[] = results.map((item: any) => ({
                Title: item.Title,
                TOPIMAGEURL: item.TOPIMAGEURL ? { Url: item.TOPIMAGEURL.Url } : undefined,
                BOTTOMIMAGEURL: item.BOTTOMIMAGEURL ? { Url: item.BOTTOMIMAGEURL.Url } : undefined,
                footerbgcolor: item.footerbgcolor ?? ""
            }));

            console.log('Processed Data SiteName:', processed);
            return processed;

        } catch (error) {
    console.error('Error in getSiteNameData:', (error as any).message);
    throw error;
}
    };

    return {
        getSiteNameData
    };
}


// import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
// import SPCRUDOPS from '../dal/spcrudops';
// import { ISiteName } from '../interface/ISiteName';

// export interface ISiteNameOps {
//     getSiteNameData(props: ISiteName): Promise<ISiteName[]>;
// }

// export default function SiteNameOps() {
//     const spCrudOps = SPCRUDOPS();

//     const getSiteNameData = async ( props: ISafetyPortalProps): Promise<ISiteName[]> => {
//         try {
//             const spCrudOpsInstance = await spCrudOps;
//             const results = await spCrudOpsInstance.getData(
//                 "SiteName",
//                 "*",
//                 "",
//                 "Status eq 'Active'",
//                 { column: 'ID', isAscending: false }, // Sorting by Modified in descending order
//                 props
//             );
    
//             console.log('Results from API for SiteNAme:', results);
    
//             const brr: Array<ISiteName> = new Array<ISiteName>();
//             results.map((item: { Title:any }) => {
//                 brr.push({
//                    Title:item.Title
//                 });
//             });
    
//             console.log('Processed Data:', brr);
//             return brr;
//         } catch (error) {
//             console.error('Error in getSiteNameData:', error.message);
//             throw error;
//         }
//     };
    

//     return {
//         getSiteNameData
//     };
// }
