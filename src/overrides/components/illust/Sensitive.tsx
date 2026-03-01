const Sensitive = ({ value }: { value: false | "R-18" | "R-18G" }) => {
  return (
    <>
      {value !== false && (
        <div className={"sensitive"}>
          <div className={"sensitive_inner"}>
            <div className={"sensitive_content"}>{value}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sensitive;
