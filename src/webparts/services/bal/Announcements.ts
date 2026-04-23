import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IAnnouncements } from '../interface/IAnnouncements';

export interface IAnnouncementsOps {
    getAllAnnouncements(props: ISafetyPortalProps): Promise<IAnnouncements[]>;
    getAnnouncementById(Id: string | number, props: ISafetyPortalProps): Promise<IAnnouncements>;
    getAnnouncements(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopAnnouncements(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function AnnouncementsOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllAnnouncements = async (props: ISafetyPortalProps): Promise<IAnnouncements[]> => {
        return await (await spCrudOps).getData("Announcements", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IAnnouncements> = new Array<IAnnouncements>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status, 
                        FileUrl: item.EncodedAbsUrl,
                        Header:item.Header,
                        SubHeader:item.SubHeader,
                        AnnouncementDescription:item.AnnouncementDescription,
                        AnnouncementDate:item.AnnouncementDate,
                        AnnouncementsFileUrl:item.AnnouncementsFileUrl.Url

                    }); 
                });
                return output;
            });
    };

    const getAnnouncementById = async (Id: string | number, props: ISafetyPortalProps): Promise<IAnnouncements> => {
        return await (await spCrudOps).getData("Announcements", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IAnnouncements> = new Array<IAnnouncements>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        Header:item.Header,
                        SubHeader:item.SubHeader,
                        AnnouncementDescription:item.AnnouncementDescription,
                        AnnouncementDate:item.AnnouncementDate,
                         AnnouncementsFileUrl:item.AnnouncementsFileUrl.Url
                        
                    });
                });
                return output[0];
            });
    };

    const getAnnouncements = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IAnnouncements[]> => {
        return await (await spCrudOps).getData("Announcements", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IAnnouncements> = new Array<IAnnouncements>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        Header:item.Header,
                        SubHeader:item.SubHeader,
                        AnnouncementDescription:item.AnnouncementDescription,
                        AnnouncementDate:item.AnnouncementDate,
                         AnnouncementsFileUrl:item.AnnouncementsFileUrl.Url

                    });
                });
                return output;
            });
    };

    const getTopAnnouncements = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IAnnouncements[]> => {
            return await (await spCrudOps).getTopData("Announcements", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IAnnouncements> = new Array<IAnnouncements>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Name:item.Name,
                            File: item.File,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl,
                            Header:item.Header,
                            SubHeader:item.SubHeader,
                            AnnouncementDescription:item.AnnouncementDescription,
                            AnnouncementDate:item.AnnouncementDate,
                            AnnouncementsFileUrl: item.AnnouncementsFileUrl?.Url || ""

                        }); 
                    });
                    return output;
                });
        };
    return {
        getAllAnnouncements,
        getAnnouncementById,
        getAnnouncements,
        getTopAnnouncements
    };

}