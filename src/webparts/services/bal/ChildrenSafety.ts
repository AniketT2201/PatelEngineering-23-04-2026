import { ISafetyPortalProps } from "../../services/interface/ISafetyPortalProps";
import SPCRUDOPS from "../dal/spcrudops";
import { IChildrenSafety } from "../interface/IChildrenSafety";

export interface IChildrenSafetyOps {
    getIChildrenSafetyData(props: ISafetyPortalProps): Promise<IChildrenSafety[]>;
}

export default function IChildrenSafetyOps() {
    const spCrudOps = SPCRUDOPS();

    const getIChildrenSafetyData = async (
        props: ISafetyPortalProps
    ): Promise<IChildrenSafety[]> => {
        try {   
            const spCrudOpsInstance = await spCrudOps;

            const results = await spCrudOpsInstance.getData(
                "ChildrenSafety",
                "Id,Status,Header,HeaderDescription,UrlLink,PageLink,AttachmentFiles",
                "AttachmentFiles",
                "Status eq 'Active'",
                { column: "Modified", isAscending: false }, // Descending order
                props
            );
  
            console.log("Results from API ChildrenSafety:", results);

            const highlights: IChildrenSafety[] = results.map((item: any) => {
                const fileUrl =
                    item.AttachmentFiles && item.AttachmentFiles.length > 0
                        ? item.AttachmentFiles[0].ServerRelativeUrl
                        : "";

                return {
                    Id: item.Id,
                    Status: item.Status,
                    FileUrl: fileUrl,
                    Header: item.Header,
                    HeaderDescription: item.HeaderDescription,
                    UrlLink: item.UrlLink,
                    PageLink: item.PageLink
                };
            });  

            console.log("Processed ChildrenSafety:", highlights);
            return highlights;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in ChildrenSafety:", error.message);
            } else {
                console.error("Unknown error in ChildrenSafety:", error);
            }
            throw error;
        }
    };

    return {
        getIChildrenSafetyData
    };
}
