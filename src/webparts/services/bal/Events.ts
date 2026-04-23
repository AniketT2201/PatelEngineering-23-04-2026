import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IEvents } from '../interface/IEvents';


export interface IEventsOps {
    getAllEvents(props: ISafetyPortalProps): Promise<IEvents[]>;
    getEventById(Id: string | number, props: ISafetyPortalProps): Promise<IEvents>;
    getEvents(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopEvents(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function EventsOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllEvents = async (props: ISafetyPortalProps): Promise<IEvents[]> => {
        return await (await spCrudOps).getData("Events", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IEvents> = new Array<IEvents>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        EventName: item.EventName,
                        StartDate: item.startDate,
                        EndDate: item.EndDate,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        EventDescription: item.EventDescription,
                        EventDate: item.EventDate,
                        StartTime: item.StartTime,
                        EndTime: item.EndTime
                    });
                });
                return output;
            });
    };

    const getEventById = async (Id: string | number, props: ISafetyPortalProps): Promise<IEvents> => {
        return await (await spCrudOps).getData("Events", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IEvents> = new Array<IEvents>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        EventName: item.EventName,
                        StartDate: item.startDate,
                        EndDate: item.EndDate,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        EventDescription: item.EventDescription,
                        EventDate: item.EventDate,
                        StartTime: item.StartTime,
                        EndTime: item.EndTime
                    });
                });
                return output[0];
            });
    };

    const getEvents = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IEvents[]> => {
        return await (await spCrudOps).getData("Events", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IEvents> = new Array<IEvents>();
                results.map(item => {
                    output.push({
                       Id: item.Id,
                        EventName: item.EventName,
                        StartDate: item.startDate,
                        EndDate: item.EndDate,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        EventDescription: item.EventDescription,
                        EventDate: item.EventDate,
                        StartTime: item.StartTime,
                        EndTime: item.EndTime
                    });
                });
                return output;
            });
    };

    const getTopEvents = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IEvents[]> => {
            return await (await spCrudOps).getTopData("Events", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IEvents> = new Array<IEvents>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            EventName: item.EventName,
                            StartDate: item.startDate,
                            EndDate: item.EndDate, 
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl,
                            EventDescription: item.EventDescription,
                            EventDate: item.EventDate,
                            StartTime: item.StartTime,
                            EndTime: item.EndTime
                        });
                    });
                    return output;
                });
        };
    return {
        getAllEvents,
        getEventById,
        getEvents,
        getTopEvents
    };

}