define(["require", "exports", "TFS/WorkItemTracking/Services"], function (require, exports, WitService) {
    "use strict";
    exports.__esModule = true;
    //var control: Control;
    var fieldName = "Microsoft.VSTS.TCM.Steps";
    var provider = function () {
        return {
            onLoaded: function (workItemLoadedArgs) {
                WitService.WorkItemFormService.getService()
                    .then(function (service) { return service.getFieldValue(fieldName); })
                    .then(function (steps) { return document.body.innerText = steps; });
            },
            onFieldChanged: function (fieldChangedArgs) {
                var changedValue = fieldChangedArgs.changedFields[fieldName];
                if (changedValue !== undefined) {
                    document.body.innerText = changedValue;
                }
            }
        };
    };
    VSS.register(VSS.getContribution().id, provider);
});
