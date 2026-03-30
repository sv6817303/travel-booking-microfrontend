const InsurancePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              International Travel + Medical Insurance
            </h1>
          </div>
          <div className="mt-10 bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Travel Destinations
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Select destinations"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="md:col-span-4 text-center">
                <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Explore Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">99%</p>
            <p className="text-gray-500">Claim Settlement Ratio</p>
          </div>
          <div>
            <p className="text-4xl font-bold">24X7</p>
            <p className="text-gray-500">Customer support by TATA AIG</p>
          </div>
          <div>
            <p className="text-4xl font-bold">Min. $50K</p>
            <p className="text-gray-500">
              Medical coverage with cashless hospitalisation
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold">1,00,000+</p>
            <p className="text-gray-500">Customers covered</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What are the Benefits of Travel Insurance by MakeMyTrip?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We cover almost everything to make your travel easy and secure
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold">Medical Coverage</h3>
              <p className="mt-2 text-gray-500">
                Offers complete medical insurance plan and assistance, including
                medical consultation cost, global cashless hospitalisation and
                transportation/evacuation cost in case of medical emergencies.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="text-xl font-bold">Travel Coverage</h3>
              <p className="mt-2 text-gray-500">
                Secures your trips against unforseen challenges, including loss
                of check-in luggage or passport, non-refundable ticket cost in
                case of trip cancellation, flight delays and more.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold">On-trip Support</h3>
              <p className="mt-2 text-gray-500">
                Provides global on-call and on-ground assistance for ambulance,
                medical tele-consultation, hospitalisation, passport
                replacement and luggage recovery coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
