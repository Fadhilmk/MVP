const PhoneNumberList = ({ phoneNumbers, onPhoneNumberClick }) => {
    if (!phoneNumbers || phoneNumbers.length === 0) {
      return <p>No phone numbers available</p>;
    }
  
    return (
      <div className="p-4">
        {phoneNumbers.map((number) => (
          <div
            key={number}
            className="p-2 border rounded mb-2 cursor-pointer"
            onClick={() => onPhoneNumberClick(number)}
          >
            {number}
          </div>
        ))}
      </div>
    );
  };
  
  export default PhoneNumberList;
  