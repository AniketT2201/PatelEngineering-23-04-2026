import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IEventGallary } from '../interface/IEventGallary';


export interface IEventGallaryOps {
    getAllEventGallarys(props: ISafetyPortalProps): Promise<IEventGallary[]>;
    getEventGallaryById(Id: string | number, props: ISafetyPortalProps): Promise<IEventGallary>;
    getEventGallarys(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopEventGallarys(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function EventGallaryOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllEventGallarys = async (props: ISafetyPortalProps): Promise<IEventGallary[]> => {
        return await (await spCrudOps).getData("EventGallery", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IEventGallary> = new Array<IEventGallary>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl
                    });
                });
                return output;
            });
    };

    const getEventGallaryById = async (Id: string | number, props: ISafetyPortalProps): Promise<IEventGallary> => {
        return await (await spCrudOps).getData("EventGallery", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IEventGallary> = new Array<IEventGallary>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl
                    });
                });
                return output[0];
            });
    };

    const getEventGallarys = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IEventGallary[]> => {
        return await (await spCrudOps).getData("EventGallery", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IEventGallary> = new Array<IEventGallary>();
                results.map(item => {
                    output.push({
                       Id: item.Id,
                       Status: item.Status,
                       FileUrl: item.EncodedAbsUrl
                    });
                });
                return output;
            });
    };

    const getTopEventGallarys = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IEventGallary[]> => {
            return await (await spCrudOps).getTopData("EventGallery", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IEventGallary> = new Array<IEventGallary>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl
                        });
                    });
                    return output;
                });
        };
       

    return {
        getAllEventGallarys,
        getEventGallaryById,
        getEventGallarys,
        getTopEventGallarys,
    };

}  