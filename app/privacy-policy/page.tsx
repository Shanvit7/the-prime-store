// COMPONENTS
import Link from "next/link";

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-white">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

    <p className="mb-4">
      Welcome to my personal portfolio project! This Privacy Policy outlines how
      information is collected, used, and protected when you visit or interact
      with this site.
    </p>

    <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
    <p className="mb-4">
      This website does not collect personal data from visitors unless you
      voluntarily provide it through forms or other interactive features. This
      may include, but is not limited to, your name, email address, or other
      contact information.
    </p>

    <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
    <p className="mb-4">
      Any information provided will be used solely for the purpose of improving
      this portfolio project or responding to your inquiries. As this is a
      personal project, data collection is minimal and focused on enhancing the
      user experience.
    </p>

    <h2 className="text-2xl font-semibold mb-4">3. Third-Party Services</h2>
    <p className="mb-4">
      This site may use third-party services like analytics tools or APIs.
      Specifically, this portfolio project consumes data from{" "}
      <Link
        href={process.env.NEXT_PUBLIC_PRODUCT_API_URL as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {process.env.NEXT_PUBLIC_PRODUCT_API_URL}
      </Link>{" "}
      via its API. This service provides dummy data used for demonstrating
      features on this site. The data from this API is not personal and is used
      solely for the purpose of enhancing the functionality and presentation of
      this portfolio project.
    </p>

    <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
    <p className="mb-4">
      This site may use cookies to enhance the user experience. Cookies are
      small text files stored on your device that help the site remember your
      preferences or actions over time. You can control or delete cookies
      through your browser settings.
    </p>

    <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
    <p className="mb-4">
      I take data security seriously and implement reasonable measures to
      protect your information. However, please be aware that no method of data
      transmission over the internet or electronic storage is completely secure.
    </p>

    <h2 className="text-2xl font-semibold mb-4">6. Children’s Privacy</h2>
    <p className="mb-4">
      This site is not intended for use by children under the age of 13. I do
      not knowingly collect personal information from children under 13. If you
      believe that a child has provided personal information without parental
      consent, please contact me, and I will take steps to remove such
      information.
    </p>

    <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
    <p className="mb-4">
      I may update this Privacy Policy from time to time to reflect changes in
      practices or for other operational, legal, or regulatory reasons. Any
      changes will be posted on this page with an updated revision date.
    </p>

    <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
    <p className="mb-4">
      If you have any questions or concerns about this Privacy Policy or the
      practices of this site, please contact me at{" "}
      <span className="font-bold">{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</span>
      .
    </p>

    <p className="mt-8">
      <em>Last updated: {process.env.NEXT_PUBLIC_UPDATED_POLICY_AT}</em>
    </p>

    <div className="mt-8 text-center">
      <Link
        href="/"
        className="inline-block rounded-md px-6 py-3 bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500 transition-colors duration-300"
      >
        Back to Homepage
      </Link>
    </div>
  </div>
);

export default PrivacyPolicy;
