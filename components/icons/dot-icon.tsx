interface IDotIcon {
  status?: "Draft" | "Published";
}
const DotIcon = ({ status }: IDotIcon) => {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="6" height="6" rx="3" fill={status === "Published" ? "#34D399" : "#EAB308"} />
    </svg>
  );
};

export default DotIcon;
