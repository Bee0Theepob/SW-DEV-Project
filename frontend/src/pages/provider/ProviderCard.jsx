import { useState } from "react";
import { useSelector } from "react-redux";
import { addAppointment } from "../../features/appointment/service";
import "./ProviderCard.css";

function ProviderCard({ provider }) {
  const { user, loyaltyPoint } = useSelector((state) => state.auth);
  const [apptDate, setApptDate] = useState("");

  const rentThisCar = async () => {
    if (!apptDate) {
      alert("Please select a date.");
      return;
    }

    if (new Date(apptDate) < new Date()) {
      alert("Booking date is invalid.");
      return;
    }

    const apptData = {
      user: user._id,
      provider: provider._id,
      apptDate,
    };
    console.log("Appointment Data:", apptData);
    try {
      const response = await addAppointment(user.token, apptData);
      if (response.success) {
        alert("Car rented successfully!");
      } else {
        alert(`Failed to rent car: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error renting car:", error);
      alert("Your appointment is exceeding the limit of 3 cars.");
    }
  };

  return (
    <div className='provider-card'>
      <h2 className='provider-name'>{provider.name}</h2>
      <p className='provider-detail'>
        <strong>Address:</strong> {provider.address}
      </p>
      <p className='provider-detail'>
        <strong>Telephone:</strong> {provider.tel}
      </p>
      <p>
        {user.loyaltyPoint === 0 && <strong>Price: </strong> && provider.price}
        {user.loyaltyPoint > 0 && (
          <>
            <strong>Price: </strong>
            <s>{provider.price}</s>
            {(provider.price * (100 - user.loyaltyPoint)) / 100}
          </>
        )}
      </p>
      <input
        type='date'
        name='apptDate'
        value={apptDate}
        onChange={(e) => setApptDate(e.target.value)}
      />
      <button className='btn' onClick={rentThisCar}>
        Rent this Car
      </button>
    </div>
  );
}

export default ProviderCard;
