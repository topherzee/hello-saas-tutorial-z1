/** Appends headers required for livesync feaature. */
async function magnoliaFetch(url) {
  const liveSyncSessionId = process.env.REACT_APP_MGNL_LIVE_SYNC_SESSION_ID;

  // console.log(
  //   "magnoliaFetch. Fetching ",
  //   url,
  //   " with livesync session id:",
  //   liveSyncSessionId
  // );

  const headers = new Headers();
  if (liveSyncSessionId && liveSyncSessionId.trim() !== "") {
    headers.append("live-sync-session-id", liveSyncSessionId);
  }

  const response = await fetch(url, {
    headers: headers,
  });
  return response;
}

export { magnoliaFetch };
