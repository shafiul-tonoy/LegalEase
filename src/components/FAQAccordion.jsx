export default function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {/* Accordion Item 1 */}
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            How does the platform connect clients with lawyers?
          </div>
          <div className="collapse-content">
            <p>
              Our platform allows clients to search for lawyers based on their expertise, location, and availability. Once a match is found, clients can book a consultation or service directly through the platform.
            </p>
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Is the platform secure for sharing legal documents?
          </div>
          <div className="collapse-content">
            <p>
              Yes, we use advanced encryption protocols to ensure the security and confidentiality of all legal documents shared through our platform.
            </p>
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            What is the cost of using the platform?
          </div>
          <div className="collapse-content">
            <p>
              Clients only pay for the legal services they book. There are no additional charges for using the platform itself.
            </p>
          </div>
        </div>

        {/* Accordion Item 4 */}
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Can I reschedule or cancel a service booking?
          </div>
          <div className="collapse-content">
            <p>
              Yes, clients can reschedule or cancel bookings as per the platform&apos;s cancellation policy. However, some bookings may have restrictions based on the lawyer’s policies.
            </p>
          </div>
        </div>

        {/* Accordion Item 5 */}
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Are the lawyers verified on the platform?
          </div>
          <div className="collapse-content">
            <p>
              All lawyers on our platform undergo a thorough verification process to ensure they are licensed and qualified to provide legal services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
