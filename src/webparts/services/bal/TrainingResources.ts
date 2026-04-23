import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { ITrainingResources } from '../interface/ITrainingResources';

export interface ITrainingResourcesOps {
    getAllTrainingResources(props: ISafetyPortalProps): Promise<ITrainingResources[]>;
    getTrainingResourceById(Id: string | number, props: ISafetyPortalProps): Promise<ITrainingResources>;
    getTrainingResources(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopTrainingResources(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function TrainingResourcesOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllTrainingResources = async (props: ISafetyPortalProps): Promise<ITrainingResources[]> => {
        return await (await spCrudOps).getData("TrainingResources", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ITrainingResources> = new Array<ITrainingResources>();
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

    const getTrainingResourceById = async (Id: string | number, props: ISafetyPortalProps): Promise<ITrainingResources> => {
        return await (await spCrudOps).getData("TrainingResources", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ITrainingResources> = new Array<ITrainingResources>();
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

    const getTrainingResources = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<ITrainingResources[]> => {
        return await (await spCrudOps).getData("TrainingResources", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<ITrainingResources> = new Array<ITrainingResources>();
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

    const getTopTrainingResources = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<ITrainingResources[]> => {
            return await (await spCrudOps).getTopData("TrainingResources", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<ITrainingResources> = new Array<ITrainingResources>();
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
        getAllTrainingResources,
        getTrainingResourceById,
        getTrainingResources,
        getTopTrainingResources
    };

}