export function getAPIBase(isPreview) {
  let M;
  if (isPreview) {
    M = process.env.REACT_APP_MGNL_HOST_PREVIEW;
  } else {
    M = process.env.REACT_APP_MGNL_HOST_PUBLISHED;
  }
  return M;
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
