import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IQuickLinks } from '../interface/IQuickLinks';


export interface IQuickLinksOps {
    getAllQuickLinks(props: ISafetyPortalProps): Promise<IQuickLinks[]>;
    getQuickLinkById(Id: string | number, props: ISafetyPortalProps): Promise<IQuickLinks>;
    getQuickLinks(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopQuickLinks(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function QuickLinksOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllQuickLinks = async (props: ISafetyPortalProps): Promise<IQuickLinks[]> => {
        return await (await spCrudOps).getData("QuickLinks", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IQuickLinks> = new Array<IQuickLinks>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        LinkName:item.LinkName,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        LinkUrl:item.LinkUrl
                        
                    });
                });
                return output;
            });
    };

    const getQuickLinkById = async (Id: string | number, props: ISafetyPortalProps): Promise<IQuickLinks> => {
        return await (await spCrudOps).getData("QuickLinks", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IQuickLinks> = new Array<IQuickLinks>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        LinkName:item.LinkName,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        LinkUrl:item.LinkUrl
                        
                    });
                });
                return output[0];
            });
    };

    const getQuickLinks = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IQuickLinks[]> => {
        return await (await spCrudOps).getData("QuickLinks", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IQuickLinks> = new Array<IQuickLinks>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        LinkName:item.LinkName,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        LinkUrl:item.LinkUrl
                    });
                });
                return output;
            });
    };

    const getTopQuickLinks = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IQuickLinks[]> => {
            return await (await spCrudOps).getTopData("QuickLinks", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IQuickLinks> = new Array<IQuickLinks>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Name:item.Name,
                            LinkName:item.LinkName,
                            File: item.File,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl,
                            LinkUrl:item.LinkUrl
                        });
                    });
                    return output;
                });
        };
    return {
        getAllQuickLinks,
        getQuickLinkById,
        getQuickLinks,
        getTopQuickLinks
    };

}