import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { IAwardsRecolonization } from '../interface/IAwardsRecolonization';

export interface IAwardsRecolonizationOps {
    getAllAwardsRecolonizations(props: ISafetyPortalProps): Promise<IAwardsRecolonization[]>;
    getAwardsRecolonizationById(Id: string | number, props: ISafetyPortalProps): Promise<IAwardsRecolonization>;
    getAwardsRecolonizations(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopAwardsRecolonizations(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function AwardsRecolonizationOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllAwardsRecolonizations = async (props: ISafetyPortalProps): Promise<IAwardsRecolonization[]> => {
        return await (await spCrudOps).getData("AwardsRecolonization", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IAwardsRecolonization> = new Array<IAwardsRecolonization>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        NameofEmployee:item.NameofEmployee,
                        Position:item.Position,
                        AwardsDescription:item.AwardsDescription,
                        AwardName:item.AwardName

                    });
                });
                return output;
            });
    };

    const getAwardsRecolonizationById = async (Id: string | number, props: ISafetyPortalProps): Promise<IAwardsRecolonization> => {
        return await (await spCrudOps).getData("AwardsRecolonization", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<IAwardsRecolonization> = new Array<IAwardsRecolonization>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        NameofEmployee:item.NameofEmployee,
                        Position:item.Position,
                        AwardsDescription:item.AwardsDescription,
                        AwardName:item.AwardName
                        
                    });
                });
                return output[0];
            });
    };

    const getAwardsRecolonizations = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<IAwardsRecolonization[]> => {
        return await (await spCrudOps).getData("AwardsRecolonization", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<IAwardsRecolonization> = new Array<IAwardsRecolonization>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl,
                        NameofEmployee:item.NameofEmployee,
                        Position:item.Position,
                        AwardsDescription:item.AwardsDescription,
                        AwardName:item.AwardName

                    });
                });
                return output;
            });
    };

    const getTopAwardsRecolonizations = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<IAwardsRecolonization[]> => {
            return await (await spCrudOps).getTopData("AwardsRecolonization", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<IAwardsRecolonization> = new Array<IAwardsRecolonization>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Name:item.Name,
                            File: item.File,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl,
                            NameofEmployee:item.NameofEmployee,
                            Position:item.Position,
                            AwardsDescription:item.AwardsDescription,
                            AwardName:item.AwardName

                        });
                    });
                    return output;
                });
        };
    return {
        getAllAwardsRecolonizations,
        getAwardsRecolonizationById,
        getAwardsRecolonizations,
        getTopAwardsRecolonizations
    };

}