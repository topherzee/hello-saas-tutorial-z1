import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAPIBase } from "../helpers/AppHelpers";

import { magnoliaFetch } from "../helpers/Api";

const Navigation = () => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const fetchNav = async () => {
      const apiBase = getAPIBase();

      const baseUrl =
        apiBase +
        process.env.REACT_APP_MGNL_API_NAV +
        process.env.REACT_APP_MGNL_APP_BASE;
      let response;
      let data;
      try {
        response = await magnoliaFetch(baseUrl);
        data = await response.json();
      } catch (error) {
        console.log(`Problem with navigation fetch.`);
        console.log(
          `Please check that the page exists (${process.env.REACT_APP_MGNL_APP_BASE}), and the url is correct:
        ${baseUrl}`
        );
        return null;
      }
      const subRes = await magnoliaFetch(`${baseUrl}@nodes`);
      const childNodesData = await subRes.json();
      // JCR returns an array, but Norsu returns object with more info
      const childNodes = childNodesData.results
        ? childNodesData.results
        : childNodesData;
      setNavItems([data, ...childNodes]);
    };

    if (navItems.length < 1) {
      fetchNav();
    }
  }, [navItems]);

  return (
    <nav className="Navigation">
      {navItems.map((item) => {
        // console.log("navItems", navItems);
        try {
          return (
            <NavLink
              activeClassName="active"
              key={item["@id"]}
              to={item["@path"].replace(
                process.env.REACT_APP_MGNL_APP_BASE,
                ""
              )}
            >
              {item.navigationTitle || item.name}
            </NavLink>
          );
        } catch (error) {
          console.log("Problem with navigation. Maybe no pages exist yet.");
          return null;
        }
      })}
    </nav>
  );
};

export default Navigation;
