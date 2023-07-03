export function getAPIBase() {
  let M;
  if (Boolean(process.env.REACT_APP_MGNL_IS_PREVIEW)) {
    M = process.env.REACT_APP_MGNL_BASE_AUTHOR;
  } else {
    M = process.env.REACT_APP_MGNL_BASE_PUBLIC;
  }
  let API_BASE = process.env.REACT_APP_MGNL_HOST + M;
  return API_BASE;
}

export function getRouterBasename() {
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;
  var pathname = window.location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + ".*"), "") + nodeName;
  }
  return "/";
}

export function getVersion(path) {
  return new URLSearchParams(path).get("mgnlVersion");
}
