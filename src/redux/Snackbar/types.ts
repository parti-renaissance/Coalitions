export enum Severity {
  error = 'error',
  success = 'success',
}

export interface SnackbarConfig {
  severity: Severity;
  message: string;
}
