import { CommonDisplayTextFor } from "./DisplayTextFor";

function action(entityType: string, entityName: string, actionName: string) {
  return `${entityType} ${entityName} has been successfully ${actionName.toLowerCase()}.`;
}

export const SuccessMessageFor = {
  Action: action,
  Added: (entityType: string, entityName: string) => action(entityType, entityName, CommonDisplayTextFor.Add + "ed"),
  Created: (entityType: string, entityName: string) => action(entityType, entityName, "Created"),
  Updated: (entityType: string, entityName: string) => action(entityType, entityName, CommonDisplayTextFor.Update + "d"),
  Deleted: (entityType: string, entityName: string) => action(entityType, entityName, CommonDisplayTextFor.Delete + "d"),
  Submitted: (entityType: string, entityName: string) => action(entityType, entityName, CommonDisplayTextFor.Submit + "ted"),
  Published: (entityType: string, entityName: string) => action(entityType, entityName, CommonDisplayTextFor.Publish + "ed"),
};
