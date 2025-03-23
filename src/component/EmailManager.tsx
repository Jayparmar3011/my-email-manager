import React, { useState } from "react";
import "../style/emailManager.scss";
import { initialRecipients } from "../data/RecipientList";
import { groupByDomain } from "../utils/groupByDomain";
import RecipientList from "../component/RecipientCard";

const EmailManager = () => {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [expandedAvailableGroups, setExpandedAvailableGroups] = useState<Record<string, boolean>>({});
  const [expandedSelectedGroups, setExpandedSelectedGroups] = useState<Record<string, boolean>>({});

  // Select button functionality
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
    setExpandedSelectedGroups((prev) => ({
      ...prev,
      [value]: false,
    }));
  };

  // Remove button functionality
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
    setExpandedAvailableGroups((prev) => ({
      ...prev,
      [value]: false,
    }));
  };

  // Expand/collapse functionality
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

  const availableRecipients = recipients.filter((recipient) => !recipient.isSelected);
  const selectedRecipients = recipients.filter((recipient) => recipient.isSelected);


  // on enter it's add the email on company's box
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      const email = e.currentTarget.value.trim();
      const domain = email.split("@")[1];

      if (!domain) return;

      const domainExists = availableRecipients.some((r) => r.email.endsWith(`@${domain}`));

      if (domainExists) {
        setRecipients((prev) => [...prev, { email, isSelected: false }]);
        setExpandedAvailableGroups((prev) => ({
          ...prev,
          [domain]: true,
        }));
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <>
      <div className="title-container">
        <h1>Email Manager</h1>
      </div>
      <div className="email-manager-container">
         {/* Available Recipients card */}
        <RecipientList
          title="Available Recipients"
          showSearch={true}
          recipients={groupByDomain(availableRecipients)}
          expandedGroups={expandedAvailableGroups}
          onToggleGroup={toggleAvailableGroup}
          onToggleRecipient={handleToggle}
          buttonLabel="Select"
          buttonClass="select-button"
          onButtonClick={handleToggle}
          onKeyDown={handleKeyDown}
        />
       {/* Selected Recipients card */}
        <RecipientList
          title="Selected Recipients"
          showSearch={false}
          recipients={groupByDomain(selectedRecipients)}
          expandedGroups={expandedSelectedGroups}
          onToggleGroup={toggleSelectedGroup}
          onToggleRecipient={handleRemove}
          buttonLabel="Remove"
          buttonClass="remove-button"
          onButtonClick={handleRemove}
        />
      </div>
    </>
  );
};

export default EmailManager;
