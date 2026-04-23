

import SPCRUDOPS from '../dal/spcrudops';
import { ITools } from '../interface/ITools';
import { ISafetyPortalProps } from "../interface/ISafetyPortalProps";

export interface IToolsOps {
    getToolsData(props: ITools): Promise<ITools[]>;
}

export default function ToolsOps() {
    const spCrudOps = SPCRUDOPS();

    const getToolsData = async ( props: ISafetyPortalProps): Promise<ITools[]> => {
        try {
            const spCrudOpsInstance = await spCrudOps;
            const filter = "Status eq 'Active'";
            const results = await spCrudOpsInstance.getData(
                "Tools",
                "*,Id,Tools,Url,Status",
                "", 
                filter,
                { column: 'ID', isAscending: true }, // Sorting by Modified in descending order
                props
            );
    
            console.log('Results from API of Tools:', results);
    
            const brr: Array<ITools> = new Array<ITools>();
            results.map((item: any) => {
                brr.push({
                    Id: item.Id,
                    Tools: item.Tools,
                    Url: item.Url ? item.Url.Url : '',
                    Status: item.Status
                });
            });
    
            console.log('Processed Data:', brr);
            return brr;
        } catch (error) {
            console.error('Error in getToolsData:', error.message);
            throw error;
        }
    };
    

    return {
        getToolsData
    };
}
