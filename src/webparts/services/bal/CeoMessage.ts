import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import {ICeoMessage  } from '../interface/ICeoMessage';

export interface ICeoMessageOps {
    getAllCeoMessages(props: ISafetyPortalProps): Promise<ICeoMessage[]>;
    getCeoMessageById(Id: string | number, props: ISafetyPortalProps): Promise<ICeoMessage>;
    getCeoMessages(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopCeoMessages(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function CeoMessageOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllCeoMessages = async (props: ISafetyPortalProps): Promise<ICeoMessage[]> => {
        return await (await spCrudOps).getData("CeoMessage", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ICeoMessage> = new Array<ICeoMessage>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        CeoMessage:item.CeoMessage

                    });
                });
                return output;
            });
    };

    const getCeoMessageById = async (Id: string | number, props: ISafetyPortalProps): Promise<ICeoMessage> => {
        return await (await spCrudOps).getData("CeoMessage", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ICeoMessage> = new Array<ICeoMessage>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        CeoMessage:item.CeoMessage

                        
                    });
                });
                return output[0];
            });
    };

    const getCeoMessages = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<ICeoMessage[]> => {
        return await (await spCrudOps).getData("CeoMessage", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<ICeoMessage> = new Array<ICeoMessage>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        CeoMessage:item.CeoMessage

                    });
                });
                return output;
            });
    };

    const getTopCeoMessages = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<ICeoMessage[]> => {
            return await (await spCrudOps).getTopData("CeoMessage", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<ICeoMessage> = new Array<ICeoMessage>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Name:item.Name,
                            File: item.File,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl,
                            CeoMessage:item.CeoMessage

                        });
                    });
                    return output;
                });
        };
    return {
        getAllCeoMessages,
        getCeoMessageById,
        getCeoMessages,
        getTopCeoMessages
    };

}