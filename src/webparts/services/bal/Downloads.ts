import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IDownloads } from '../interface/IDownloads';

export interface IDownloadsOps {
    getAllDownloads(props: ISafetyPortalProps): Promise<IDownloads[]>;
    getDownloadById(Id: string | number, props: ISafetyPortalProps): Promise<IDownloads>;
    getDownloads(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopDownloads(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function DownloadsOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllDownloads = async (props: ISafetyPortalProps): Promise<IDownloads[]> => {
        return await (await spCrudOps).getData("Downloads", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IDownloads> = new Array<IDownloads>();
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

    const getDownloadById = async (Id: string | number, props: ISafetyPortalProps): Promise<IDownloads> => {
        return await (await spCrudOps).getData("Downloads", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IDownloads> = new Array<IDownloads>();
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

    const getDownloads = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IDownloads[]> => {
        return await (await spCrudOps).getData("Downloads", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IDownloads> = new Array<IDownloads>();
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

    const getTopDownloads = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IDownloads[]> => {
            return await (await spCrudOps).getTopData("Downloads", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IDownloads> = new Array<IDownloads>();
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
        getAllDownloads,
        getDownloadById,
        getDownloads,
        getTopDownloads
    };

}