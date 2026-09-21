export const ConfirmationMessageFor = {
  Delete: (entityType: string, entityName?: string) =>
    entityName
      ? `Are you sure you want to delete ${entityType} ${entityName}?`
      : `Are you sure you want to delete this ${entityType}?`,
  Publish: (entityType: string, entityName?: string) =>
    entityName
      ? `Are you sure you want to publish ${entityType} ${entityName}?`
      : `Are you sure you want to publish this ${entityType}?`,
  Action: (actionName: string, entityType: string, entityName?: string) =>
    entityName
      ? `Are you sure you want to ${actionName.toLowerCase()} ${entityType} ${entityName}?`
      : `Are you sure you want to ${actionName.toLowerCase()} this ${entityType}?`,
};
