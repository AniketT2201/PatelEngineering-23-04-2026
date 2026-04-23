import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { ITopbanner } from '../interface/ITopBanner';

export interface ITopBannerOps {
    getAllBanners(props: ISafetyPortalProps): Promise<ITopbanner[]>;
    getBannerById(Id: string | number, props: ISafetyPortalProps): Promise<ITopbanner>;
    getBanners(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopBanners(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function BannerOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllBanners = async (props: ISafetyPortalProps): Promise<ITopbanner[]> => {
        return await (await spCrudOps).getData("TopBanner", "*,File/Name,EncodedAbsUrl,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ITopbanner> = new Array<ITopbanner>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl

                    });
                });
                return output;
            });
    };

    const getBannerById = async (Id: string | number, props: ISafetyPortalProps): Promise<ITopbanner> => {
        return await (await spCrudOps).getData("TopBanner", "*,File/Name,EncodedAbsUrl,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ITopbanner> = new Array<ITopbanner>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl

                        
                    });
                });
                return output[0];
            });
    };

    const getBanners = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<ITopbanner[]> => {
        return await (await spCrudOps).getData("TopBanner", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<ITopbanner> = new Array<ITopbanner>();
                results.map(item => {
                    output.push({
                        Id: item.Id,
                        Name:item.Name,
                        File: item.File,
                        Status: item.Status,
                        FileUrl: item.EncodedAbsUrl

                    });
                });
                return output;
            });
    };

    const getTopBanners = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<ITopbanner[]> => {
            return await (await spCrudOps).getTopData("TopBanner", "*,File/Name,EncodedAbsUrl,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<ITopbanner> = new Array<ITopbanner>();
                    results.map(item => {
                        output.push({
                            Id: item.Id,
                            Name:item.Name,
                            File: item.File,
                            Status: item.Status,
                            FileUrl: item.EncodedAbsUrl

                        });
                    });
                    return output;
                });
        };
    return {
        getAllBanners,
        getBannerById,
        getBanners,
        getTopBanners
    };

}