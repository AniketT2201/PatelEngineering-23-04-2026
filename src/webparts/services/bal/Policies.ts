import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IPolicies } from '../interface/IPolicies';

export interface IPoliciesOps {
    getAllPolicies(props: ISafetyPortalProps): Promise<IPolicies[]>;
    getPolicieById(Id: string | number, props: ISafetyPortalProps): Promise<IPolicies>;
    getPolicies(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopPolicies(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function PoliciesOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllPolicies = async (props: ISafetyPortalProps): Promise<IPolicies[]> => {
        return await (await spCrudOps).getData("Policies", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IPolicies> = new Array<IPolicies>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Title: item.Title,
                        File: {
                            Name: item.File.Name, 
                            EncodedAbsUrl: item.File.EncodedAbsUrl,
                        },
                        Status: item.Status,
                        EncodedAbsUrl: item.EncodedAbsUrl,
                        ServerRedirectedEmbedUrl:item.ServerRedirectedEmbedUrl 
                    });
                });
                return output;
            });
    };

    const getPolicieById = async (Id: string | number, props: ISafetyPortalProps): Promise<IPolicies> => {
        return await (await spCrudOps).getData("Policies", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IPolicies> = new Array<IPolicies>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Title: item.Title,
                        File: {
                            Name: item.File.Name, 
                            EncodedAbsUrl: item.File.EncodedAbsUrl,
                        },
                        Status: item.Status,
                        EncodedAbsUrl: item.EncodedAbsUrl,
                        ServerRedirectedEmbedUrl:item.ServerRedirectedEmbedUrl 
                        
                    });
                });
                return output[0];
            });
    };

    const getPolicies = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IPolicies[]> => {
        return await (await spCrudOps).getData("Policies", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IPolicies> = new Array<IPolicies>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Title: item.Title,
                        File: {
                            Name: item.File.Name, 
                            EncodedAbsUrl: item.File.EncodedAbsUrl,
                        },
                        Status: item.Status,
                        EncodedAbsUrl: item.EncodedAbsUrl,
                        ServerRedirectedEmbedUrl:item.ServerRedirectedEmbedUrl 

                    });
                });
                return output;
            });
    };

    const getTopPolicies = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IPolicies[]> => {
            return await (await spCrudOps).getTopData("Policies", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IPolicies> = new Array<IPolicies>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                        Title: item.Title,
                        File: {
                            Name: item.File.Name, 
                            EncodedAbsUrl: item.File.EncodedAbsUrl,
                        },
                        Status: item.Status,
                        EncodedAbsUrl: item.EncodedAbsUrl,
                        ServerRedirectedEmbedUrl:item.ServerRedirectedEmbedUrl 

                        });
                    });
                    return output;
                });
        };
    return {
        getAllPolicies,
        getPolicieById,
        getPolicies,
        getTopPolicies
    };

}