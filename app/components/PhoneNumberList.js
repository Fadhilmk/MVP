const PhoneNumberList = ({ phoneNumbers, onPhoneNumberClick }) => {
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
  