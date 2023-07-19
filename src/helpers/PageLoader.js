import React from "react";
import config from "../magnolia.config";
import { getAPIBase } from "./AppHelpers";

import { EditablePage } from "@magnolia/react-editor";
import { EditorContextHelper } from "@magnolia/react-editor";

import { magnoliaFetch } from "./Api";

class PageLoader extends React.Component {
  state = {};

  loadPage = async (force) => {
    // Bail out if already loaded content.
    if (!force && this.state.pathname === window.location.pathname) return;

    const spaRootNodePath = process.env.REACT_APP_MGNL_APP_BASE;
    const magnoliaContext = EditorContextHelper.getMagnoliaContext(
      window.location.href,
      spaRootNodePath
    );
    console.log("magnoliaContext:", magnoliaContext);

    const apiBase = getAPIBase(magnoliaContext.isMagnolia);
    console.log("apiBase:", apiBase);

    const searchParams = new URLSearchParams({});

    const relativePageURL = `${magnoliaContext.nodePath}?${searchParams}`;

    const fullContentURL = `${apiBase}${process.env.REACT_APP_MGNL_API_PAGES}${relativePageURL}`;

    let pageResponse;
    let pageJson;

    try {
      pageResponse = await magnoliaFetch(fullContentURL);
      // pageResponse = await fetch(fullContentURL);
      pageJson = await pageResponse.json();
      console.log("page content:", pageJson);
    } catch (error) {
      console.log(`Problem with page fetch.`);
      console.log(
        `Please check that the page exists (${relativePageURL}), and the url is correct:
        ${fullContentURL}`
      );
      console.log(error);

      return null;
    }

    const templateId = pageJson["mgnl:template"];
    console.log("templateId:", templateId);

    let templateJson = null;
    if (magnoliaContext.isMagnolia) {
      const templateAnnotationURL = `${apiBase}${process.env.REACT_APP_MGNL_API_ANNOTATIONS}${relativePageURL}`;
      const templateResponse = await magnoliaFetch(templateAnnotationURL);
      templateJson = await templateResponse.json();
      console.log("annotations:", templateJson);
    }

    this.setState({
      init: true,
      content: pageJson,
      templateAnnotations: templateJson,
      pathname: window.location.pathname,
    });
  };

  componentDidMount() {
    const handler = (event) => {
      try {
        if (typeof event.data !== "string") {
          return;
        }
        const message = JSON.parse(event.data);
        if (message.action === "refresh") {
          this.loadPage(true);
        }
      } catch (e) {
        console.error("Failed to parse " + event.data);
      }
    };

    window.addEventListener("message", handler);

    this.loadPage(false);
  }

  componentDidUpdate() {
    this.loadPage();
  }

  render() {
    if (this.state.init) {
      console.log("config:", config);

      return (
        <EditablePage
          templateAnnotations={this.state.templateAnnotations || {}}
          content={this.state.content}
          config={config}
        ></EditablePage>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default PageLoader;
