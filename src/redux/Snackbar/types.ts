export enum Severity {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export interface SnackbarConfig {
  severity: Severity;
  message: string;
}
