/* eslint-disable @typescript-eslint/no-explicit-any */
const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-background)",
    border: "1px solid var(--color-light)",
    color: "var(--color-light)",
    boxShadow: "none",
    borderRadius: "var(--border-radius-medium)",
    minHeight: "40px",
    "&:hover": {
      border: "1px solid var(--color-secondary)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-accent)",
    borderRadius: "var(--border-radius-medium)",
    overflow: "hidden",
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-accent)",
    padding: 0,
    // Add custom scrollbar styling
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--color-secondary)",
      borderRadius: "var(--border-radius-medium)",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "var(--color-primary)",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "var(--color-background",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-light)",
    fontSize: "var(--text-small)", // Smaller font size
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "var(--color-light)",
    fontSize: "var(--text-small)", // Smaller font size
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "var(--color-light)",
    padding: "4px", // Smaller padding for indicator
    "&:hover": {
      color: "var(--color-secondary)",
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-light)",
  }),
  option: (provided: any, state: { isFocused: boolean }) => ({
    ...provided,
    backgroundColor: state.isFocused ? "var(--color-secondary)" : "transparent",
    color: state.isFocused ? "var(--color-dark)" : "var(--color-light)",
    cursor: "pointer",
    padding: "10px 12px",
  }),
}

export default customSelectStyles
