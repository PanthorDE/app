export type ApiResponse<T> = {
  /** Response data */
  data: T[];
  /** UNIX-Timestamp */
  requested_at: number;
};

export type ErrorResponse = {
  status: 'Error';
  requested_at?: number;
};

export type ValidSecretResponse = {
  status: 'Success';
  name: string;
  requested_at: number;
};

export type TimezoneResponse =
  | {
      date: string;
      timezone_type: number;
      timezone: string;
    }
  | '-';
