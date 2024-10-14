const Footer = () => {
  return (
    <footer className="bg-rose-900 text-white py-10 px-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">AIDAR</h2>
          <p className="mt-4">
            Aidar is on a mission to develop and deliver innovative healthcare
            technologies to improve patients’ quality of life and extend care
            beyond traditional healthcare settings.
          </p>
        </div>
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Address</h3>
          <p className="mt-2">
            8920 State Route 108, STE B<br />
            Columbia, MD 21045<br />
            <a href="https://www.google.com/maps/dir//8920+MD-108,+Columbia,+MD+21045/@39.2283703,-76.8237558,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x89b7e0019796b269:0x3a278b6dd5eb5a81!2m2!1d-76.8215671!2d39.2283703!3e0"
             className="text-rose-300 underline"
             target="_blank"
             rel="noopener noreferrer"
            >
              View on Maps
            </a>
          </p>
          <h3 className="text-lg font-semibold mt-4">Inquiries</h3>
          <p className="mt-2">
            Phone: +1 443-875-6456<br />
            <a href="mailto:contact@aidar.com" className="text-rose-300 underline">
              contact@aidar.com
            </a>
          </p>
        </div>
        <div className="md:w-1/3 flex justify-start md:justify-end space-x-4">
          <a href="https://www.facebook.com/AidarHealth" className="bg-white text-rose-900 p-3 rounded-full hover:bg-rose-700 hover:text-white transform hover:rotate-12 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/AidarHealth" className="bg-white text-rose-900 p-3 rounded-full hover:bg-rose-700 hover:text-white transform hover:rotate-12 transition-transform"
          target="_blank"
          rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/company/aidar/?viewAsMember=true" className="bg-white text-rose-900 p-3 rounded-full hover:bg-rose-700 hover:text-white transform hover:rotate-12 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/aidar.health/" className="bg-white text-rose-900 p-3 rounded-full hover:bg-rose-700 hover:text-white transform hover:rotate-12 transition-transform"
          target="_blank"
          rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="text-center mt-10 text-rose-300">
        © 2023 Aidar Health, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
