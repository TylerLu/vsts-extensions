//import { Control } from "control";
import * as ExtensionContracts from "TFS/WorkItemTracking/ExtensionContracts";
import * as WitService from "TFS/WorkItemTracking/Services";

//var control: Control;
const fieldName = "Microsoft.VSTS.TCM.Steps";

var provider = () => {
    return {
        onLoaded: (workItemLoadedArgs: ExtensionContracts.IWorkItemLoadedArgs) => {
            WitService.WorkItemFormService.getService()
            .then(service => service.getFieldValue(fieldName))
            .then(steps => document.body.innerText = steps as string)

        },
        onFieldChanged: (fieldChangedArgs: ExtensionContracts.IWorkItemFieldChangedArgs) => {
            var changedValue = fieldChangedArgs.changedFields[fieldName];
            if (changedValue !== undefined) {
                document.body.innerText = changedValue as string
            }
        }
    }
};

VSS.register(VSS.getContribution().id, provider);