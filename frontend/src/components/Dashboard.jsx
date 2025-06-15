import React, { useState, useEffect } from "react";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.BASE_URL;

const Dashboard = () => {
  // State to manage the current step of the form (1 for input, 2 for confirmation/print)

  const [step, setStep] = useState(1);

  const [isFormValid, setIsFormValid] = useState(false);
  const [pdfBlob, setPdfBlob] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
  });

  //Form validation
  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Confirm to Print
  const handleConfirm = async () => {
    setIsLoading(true);
    if (isFormValid) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/order/confirm-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });
        if (response.ok) {
          const blob = await response.blob();
          setPdfBlob(blob);
          setStep(2);
        }
      } catch (error) {
        console.log("Error while logging in", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handler for the "Print" button click in the confirmation step
  const handlePrint = () => {
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    console.log(a);
    a.href = url;
    a.download = `delivery_label_${Date.now()}.pdf`; // creating filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  // Handler to go back to the previous step from the confirmation step
  const handleGoBack = () => {
    setStep(1);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("id");
    console.log("logout");
  };

  return (
    <div>
      <div className="flex justify-around m-auto">
        <h1 className="text text-2xl">Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-warning">
          Logout
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="card w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 md:p-8">
          {/* Card header */}
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-center mb-6 text-gray-800">
              {step === 1 ? "Order Information" : "Confirm & Print"}
            </h2>

            {/* Conditional rendering based on the current step */}
            {step === 1 && (
              // Step 1: Input Form
              <div className="space-y-4">
                {/* Sender Name Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-700">
                      Sender Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    placeholder="Enter sender's name"
                    className="input input-bordered w-full rounded-lg px-4 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={formData.senderName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Sender Address Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-700">
                      Sender Address
                    </span>
                  </label>
                  <input
                    type="text"
                    name="senderAddress"
                    placeholder="Enter sender's address"
                    className="input input-bordered w-full rounded-lg px-4 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={formData.senderAddress}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Receiver Name Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-700">
                      Receiver Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="receiverName"
                    placeholder="Enter receiver's name"
                    className="input input-bordered w-full rounded-lg px-4 py-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Receiver Address Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">
                      Receiver Address
                    </span>
                  </label>
                  <input
                    type="text"
                    name="receiverAddress"
                    placeholder="Enter receiver's address"
                    className="input input-bordered w-full "
                    value={formData.receiverAddress}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Confirm Button */}
                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-success w-full rounded-lg py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 border border-gray-300 active:scale-9 disabled:bg-gray-400 disabled:text-gray-800"
                    onClick={handleConfirm}
                    disabled={!isFormValid || isLoading}>
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              // Step 2: Confirmation and Print View
              <div className="space-y-6 text-gray-700">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
                  Review Your Details
                </h3>
                {/* Display Sender Details */}
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    Sender Information:
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.senderName}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.senderAddress}
                  </p>
                </div>
                {/* Display Receiver Details */}
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    Receiver Information:
                  </p>
                  <p>
                    <strong>Name:</strong> {formData.receiverName}
                  </p>
                  <p>
                    <strong>Address:</strong> {formData.receiverAddress}
                  </p>
                </div>
                {/* Buttons for Print and Go Back */}
                <div className="card-actions flex justify-between mt-8 space-x-4">
                  <button
                    className="btn btn-outline btn-secondary flex-1 rounded-lg py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={handleGoBack}>
                    Go Back
                  </button>
                  <button
                    className="btn btn-success flex-1 rounded-lg py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={handlePrint}>
                    Print Label
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
