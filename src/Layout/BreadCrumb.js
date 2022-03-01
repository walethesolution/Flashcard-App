import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ urlName = "", url = "", pageName = "Page Name" }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link className="m-1" to="/">
            <i className="bi bi-house m-1"></i>Home
          </Link>
        </li>

        {url !== "" ? (
          <li className="breadcrumb-item text-secondary">
            <p className="m-1 text-info"></p>
            <Link to={url}>{urlName}</Link>
          </li>
        ) : (
          ""
        )}

        <li className="breadcrumb-item active" aria-current="page">
          <p className="m-1 text-info">{pageName}</p>
        </li>
      </ol>
    </nav>
  );
}

export default BreadCrumb;
