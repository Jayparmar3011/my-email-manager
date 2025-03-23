import React, { useState } from "react";
import "../style/emailManager.scss";
import { initialRecipients } from "../data/RecipientList";
import { groupByDomain } from "../utils/groupByDomain";
import ExpandIcon from "../component/icons/ExpandIcon";
import CollapseIcon from "../component/icons/CollapseIcon";

const EmailManager = () => {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [search, setSearch] = useState("");
  const [expandedAvailableGroups, setExpandedAvailableGroups] = useState<
    Record<string, boolean>
  >({});
  const [expandedSelectedGroups, setExpandedSelectedGroups] = useState<
    Record<string, boolean>
  >({});

  const handleToggle = (value: string, isDomain: boolean) => {
    setRecipients((prev) =>
      prev.map((r) =>
        isDomain && r.email.endsWith(`@${value}`)
          ? { ...r, isSelected: true }
          : r.email === value
          ? { ...r, isSelected: true }
          : r
      )
    );
  };

  const handleRemove = (value: string, isDomain: boolean) => {
    setRecipients((prev) =>
      prev.map((r) =>
        isDomain && r.email.endsWith(`@${value}`)
          ? { ...r, isSelected: false }
          : r.email === value
          ? { ...r, isSelected: false }
          : r
      )
    );
  };

  const toggleAvailableGroup = (domain: string) => {
    setExpandedAvailableGroups((prev) => ({
      ...prev,
      [domain]: !prev[domain],
    }));
  };

  const toggleSelectedGroup = (domain: string) => {
    setExpandedSelectedGroups((prev) => ({
      ...prev,
      [domain]: !prev[domain],
    }));
  };

  const availableRecipients = recipients.filter(
    (recipient) => !recipient.isSelected
  );
  const selectedRecipients = recipients.filter(
    (recipient) => recipient.isSelected
  );

  const filteredAvailableRecipients = availableRecipients.filter((recipient) =>
    recipient.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="title-container">
        <h1>Email Manager</h1>
      </div>
      <div className="email-manager-container">
        <div className="email-manager">
          <div className="recipient-card">
            <h3>Available Recipients</h3>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search email"
              className="search-input"
            />
            {availableRecipients.length === 0 ? (
              <p className="no-data">No data available</p>
            ) : (
              Object.entries(groupByDomain(filteredAvailableRecipients)).map(
                ([domain, emails]) => (
                  <div className="group-container">
                    <div key={domain} className="group">
                      <div
                        className="group-header"
                        onClick={() => toggleAvailableGroup(domain)}
                      >
                        <div className="svg-container">
                          {expandedAvailableGroups[domain] ? (
                            <ExpandIcon className="expand-icon" size={12} />
                          ) : (
                            <CollapseIcon className="collapse-icon" size={12} />
                          )}
                        </div>
                        <span onClick={() => handleToggle(domain, true)}>
                          {domain}
                        </span>
                      </div>
                      {expandedAvailableGroups[domain] && (
                        <ul>
                          {emails.map((email) => (
                            <li
                              key={email}
                              onClick={() => handleToggle(email, false)}
                            >
                              {email}
                              <button
                                className="select-button"
                                onClick={() => handleToggle(email, false)}
                              >
                                Select
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>

        <div className="email-manager">
          <div className="recipient-card">
            <h3>Selected Recipients</h3>
            {selectedRecipients.length === 0 ? (
              <p className="no-data">No data available</p>
            ) : (
              Object.entries(groupByDomain(selectedRecipients)).map(
                ([domain, emails]) => (
                  <div key={domain} className="group">
                    <div
                      className="group-header"
                      onClick={() => toggleSelectedGroup(domain)}
                    >
                      <div className="svg-container">
                        {/* <svg
                          className={`expand-icon ${
                            expandedSelectedGroups[domain] ? "expanded" : ""
                          }`}
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg> */}

                        {expandedSelectedGroups[domain] ? (
                          <ExpandIcon className="expand-icon" size={12} />
                        ) : (
                          <CollapseIcon className="collapse-icon" size={12} />
                        )}
                      </div>
                      <span onClick={() => handleRemove(domain, true)}>
                        {domain}
                      </span>
                    </div>
                    {expandedSelectedGroups[domain] && (
                      <ul>
                        {emails.map((email) => (
                          <li
                            key={email}
                            onClick={() => handleRemove(email, false)}
                          >
                            {email}
                            <button
                              className="remove-button"
                              onClick={() => handleRemove(email, false)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailManager;
