import React, { useState } from "react";
import ExpandIcon from "../component/icons/ExpandIcon";
import CollapseIcon from "../component/icons/CollapseIcon";

interface RecipientListProps {
  title: string;
  showSearch?: boolean;
  recipients: Record<string, string[]>;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: any;
  onToggleRecipient: any;
  buttonLabel: string;
  buttonClass: string;
  onButtonClick: any;
  onKeyDown?: any;
}

const RecipientList: React.FC<RecipientListProps> = ({
  title,
  showSearch = false,
  recipients,
  expandedGroups,
  onToggleGroup,
  onToggleRecipient,
  buttonLabel,
  buttonClass,
  onButtonClick,
  onKeyDown,
}) => {
  const [search, setSearch] = useState("");

  const filteredRecipients = Object.entries(recipients).reduce(
    (acc, [domain, emails]) => {
      const filteredEmails = emails.filter((email) =>
        email.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredEmails.length > 0) {
        acc[domain] = filteredEmails;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="email-manager">
      <div className="recipient-card">
        <h3>{title}</h3>

        {showSearch && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email"
            className="search-input"
            onKeyDown={onKeyDown}
          />
        )}

        {Object.keys(filteredRecipients).length === 0 ? (
          <p className="no-data">No data available</p>
        ) : (
          Object.entries(filteredRecipients).map(([domain, emails]) => (
            <div className="group-container" key={domain}>
              <div className="group">
                <div
                  className="group-header"
                  onClick={() => onToggleGroup(domain)}
                >
                  <div className="svg-container">
                    {expandedGroups[domain] ? (
                      <CollapseIcon className="collapse-icon" size={12} />
                    ) : (
                      <ExpandIcon className="expand-icon" size={12} />
                    )}
                  </div>
                  <span onClick={() => onToggleRecipient(domain, true)}>
                    {domain}
                  </span>
                </div>
                {expandedGroups[domain] && (
                  <ul>
                    {emails.map((email) => (
                      <li
                        key={email}
                        onClick={() => onToggleRecipient(email, false)}
                      >
                        <span className="email-name">{email}</span>
                        <button
                          className={buttonClass}
                          onClick={() => onButtonClick(email, false)}
                        >
                          {buttonLabel}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipientList;
