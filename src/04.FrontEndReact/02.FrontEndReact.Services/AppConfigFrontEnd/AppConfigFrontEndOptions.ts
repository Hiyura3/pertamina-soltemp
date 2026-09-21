export type AppConfigFrontEndOptions = {
  appNickName: string;
  appFullName: string;
  backEndApiBaseUrl: string;
  authenticationBaseUrl: string;
};

const configuredBackendUrl = import.meta.env.VITE_BACKEND_API_BASE_URL?.trim();
const configuredAuthenticationUrl = import.meta.env.VITE_AUTHENTICATION_BASE_URL?.trim();

export const appConfigFrontEndOptions: AppConfigFrontEndOptions = {
  appNickName: "SolutionTemplate2",
  appFullName: "Solution Template 2",
  backEndApiBaseUrl: configuredBackendUrl || `${window.location.origin}/solutiontemplate2_api`,
  authenticationBaseUrl: configuredAuthenticationUrl || window.location.origin,
};
