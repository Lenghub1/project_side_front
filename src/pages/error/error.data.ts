import * as assets from "@/assets";

interface ErrorResponse {
  status: number;
  message?: string;
  asset?: string;
}

const predefinedError: ErrorResponse[] = [
  { status: 400, message: "Bad Request", asset: assets.err400 },
  { status: 401, message: "Unauthorized", asset: assets.err401 },
  {
    status: 402,
    message: "Payment Required",
    asset: assets.something_went_wrong,
  },
  { status: 403, message: "Forbidden", asset: assets.something_went_wrong },
  { status: 404, message: "Not Found", asset: assets.err404 },
  {
    status: 405,
    message: "Method Not Allowed",
    asset: assets.something_went_wrong,
  },
  {
    status: 406,
    message: "Not Acceptable",
    asset: assets.something_went_wrong,
  },
  {
    status: 407,
    message: "Proxy Authentication Required",
    asset: assets.something_went_wrong,
  },
  {
    status: 408,
    message: "Request Timeout",
    asset: assets.something_went_wrong,
  },
  { status: 409, message: "Conflict", asset: assets.something_went_wrong },
  { status: 410, message: "Gone", asset: assets.something_went_wrong },
  {
    status: 411,
    message: "Length Required",
    asset: assets.something_went_wrong,
  },
  {
    status: 412,
    message: "Precondition Failed",
    asset: assets.something_went_wrong,
  },
  {
    status: 413,
    message: "Payload Too Large",
    asset: assets.something_went_wrong,
  },
  { status: 414, message: "URI Too Long", asset: assets.something_went_wrong },
  {
    status: 415,
    message: "Unsupported Media Type",
    asset: assets.something_went_wrong,
  },
  {
    status: 416,
    message: "Range Not Satisfiable",
    asset: assets.something_went_wrong,
  },
  {
    status: 417,
    message: "Expectation Failed",
    asset: assets.something_went_wrong,
  },
  { status: 418, message: "I'm a teapot", asset: assets.something_went_wrong },
  {
    status: 421,
    message: "Misdirected Request",
    asset: assets.something_went_wrong,
  },
  {
    status: 422,
    message: "Unprocessable Entity",
    asset: assets.something_went_wrong,
  },
  { status: 423, message: "Locked", asset: assets.something_went_wrong },
  {
    status: 424,
    message: "Failed Dependency",
    asset: assets.something_went_wrong,
  },
  { status: 425, message: "Too Early", asset: assets.something_went_wrong },
  {
    status: 426,
    message: "Upgrade Required",
    asset: assets.something_went_wrong,
  },
  {
    status: 428,
    message: "Precondition Required",
    asset: assets.something_went_wrong,
  },
  {
    status: 429,
    message: "Too Many Requests",
    asset: assets.something_went_wrong,
  },
  {
    status: 431,
    message: "Request Header Fields Too Large",
    asset: assets.something_went_wrong,
  },
  {
    status: 451,
    message: "Unavailable For Legal Reasons",
    asset: assets.something_went_wrong,
  },
  {
    status: 500,
    message: "Internal Server Error",
    asset: assets.something_went_wrong,
  },
  {
    status: 501,
    message: "Not Implemented",
    asset: assets.something_went_wrong,
  },
  { status: 502, message: "Bad Gateway", asset: assets.something_went_wrong },
  {
    status: 503,
    message: "Service Unavailable",
    asset: assets.something_went_wrong,
  },
  {
    status: 504,
    message: "Gateway Timeout",
    asset: assets.something_went_wrong,
  },
  {
    status: 505,
    message: "HTTP Version Not Supported",
    asset: assets.something_went_wrong,
  },
  {
    status: 506,
    message: "Variant Also Negotiates",
    asset: assets.something_went_wrong,
  },
  {
    status: 507,
    message: "Insufficient Storage",
    asset: assets.something_went_wrong,
  },
  { status: 508, message: "Loop Detected", asset: assets.something_went_wrong },
  { status: 510, message: "Not Extended", asset: assets.something_went_wrong },
  {
    status: 511,
    message: "Network Authentication Required",
    asset: assets.something_went_wrong,
  },
];

export { predefinedError, type ErrorResponse };
