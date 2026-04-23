import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from '../dal/spcrudops';
import { ICertificates } from '../interface/ICertificates';

export interface ICertificatesOps {
    getAllCertificates(props: ISafetyPortalProps): Promise<ICertificates[]>;
    getCertificateById(Id: string | number, props: ISafetyPortalProps): Promise<ICertificates>;
    getCertificates(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
    getTopCertificates(columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: ISafetyPortalProps)
}

export default function CertificatesOps() {
    const spCrudOps = SPCRUDOPS();

    const getAllCertificates = async (props: ISafetyPortalProps): Promise<ICertificates[]> => {
        return await (await spCrudOps).getData("Certificates", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ICertificates> = new Array<ICertificates>();
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

    const getCertificateById = async (Id: string | number, props: ISafetyPortalProps): Promise<ICertificates> => {
        return await (await spCrudOps).getData("Certificates", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", "File", "ID eq " + Id + " and Status eq 'Active'"
            , { column: 'Id', isAscending: false }, props).then(results => {
                var output: Array<ICertificates> = new Array<ICertificates>();
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

    const getCertificates = async (columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string; isAscending: boolean; }, p0: number, props: ISafetyPortalProps): Promise<ICertificates[]> => {
        return await (await spCrudOps).getData("Certificates", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
            , orderby, props).then(results => {
                var output: Array<ICertificates> = new Array<ICertificates>();
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

    const getTopCertificates = async (columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: ISafetyPortalProps): Promise<ICertificates[]> => {
            return await (await spCrudOps).getTopData("Certificates", "*,Title,File/Name,File/EncodedAbsUrl,File/ServerRedirectedEmbedUrl,Status,Modified", columnsToExpand, filters
                , orderby, top, props).then(results => {
                    var output: Array<ICertificates> = new Array<ICertificates>();
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
        getAllCertificates,
        getCertificateById,
        getCertificates,
        getTopCertificates
    };

}