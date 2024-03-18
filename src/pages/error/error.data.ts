import * as assets from "@/assets";

interface httpError {
  status: number;
  message?: string;
  asset?: string;
}

const predefinedError: httpError[] = [
  { status: 400, message: "Bad Request", asset: assets.err400 },
  { status: 401, message: "Unauthorized", asset: assets.err401 },
  { status: 402, message: "Payment Required" },
  { status: 403, message: "Forbidden" },
  { status: 404, message: "Not Found" },
  { status: 405, message: "Method Not Allowed" },
  { status: 406, message: "Not Acceptable" },
  { status: 407, message: "Proxy Authentication Required" },
  { status: 408, message: "Request Timeout" },
  { status: 409, message: "Conflict" },
  { status: 410, message: "Gone" },
  { status: 411, message: "Length Required" },
  { status: 412, message: "Precondition Failed" },
  { status: 413, message: "Payload Too Large" },
  { status: 414, message: "URI Too Long" },
  { status: 415, message: "Unsupported Media Type" },
  { status: 416, message: "Range Not Satisfiable" },
  { status: 417, message: "Expectation Failed" },
  { status: 418, message: "I'm a teapot" },
  { status: 421, message: "Misdirected Request" },
  { status: 422, message: "Unprocessable Entity" },
  { status: 423, message: "Locked" },
  { status: 424, message: "Failed Dependency" },
  { status: 425, message: "Too Early" },
  { status: 426, message: "Upgrade Required" },
  { status: 428, message: "Precondition Required" },
  { status: 429, message: "Too Many Requests" },
  { status: 431, message: "Request Header Fields Too Large" },
  { status: 451, message: "Unavailable For Legal Reasons" },
  { status: 500, message: "Internal Server Error" },
  { status: 501, message: "Not Implemented" },
  { status: 502, message: "Bad Gateway" },
  { status: 503, message: "Service Unavailable" },
  { status: 504, message: "Gateway Timeout" },
  { status: 505, message: "HTTP Version Not Supported" },
  { status: 506, message: "Variant Also Negotiates" },
  { status: 507, message: "Insufficient Storage" },
  { status: 508, message: "Loop Detected" },
  { status: 510, message: "Not Extended" },
  { status: 511, message: "Network Authentication Required" },
];

export { predefinedError, type httpError };
