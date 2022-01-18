import React from "react";

interface HeaderProps {
  image?: string;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ image, children }) => {
  const email = atob(localStorage.getItem("token") as string);

  return (
    <div className="mb-4.5 flex align-center">
      <img
        className="rounded full"
        src="https://www.google.com/search?q=default+avatar+image&rlz=1C1CHBF_enUS926US926&sxsrf=AOaemvI-Sff6DC0C0H9lHJLiiLSd9-KVEw:1642465494975&tbm=isch&source=iu&ictx=1&vet=1&fir=mFBeEI-GK2RjoM%252CBcplb9fZWTvvRM%252C_%253BIVgx2CC_VChlFM%252CJmTN_lQo3NRiZM%252C_%253ByFECy8Q7jEiD6M%252C6NBL3GZfql9uDM%252C_%253B0dCaKzul6xCaTM%252Crzn-fTjcURU5jM%252C_%253Bq8j7AawGFhjr1M%252C4tJdFMk_s7XETM%252C_%253BoaEWP7vzPjAzXM%252CUwcJMjZIU9M-rM%252C_%253BUBvBTXKKO_DZLM%252CRKgmJBuDnBHkHM%252C_%253BMvUIsKrlYlnz-M%252CST0OFUpXWkVWOM%252C_%253BgbIRoqk1U5FrtM%252C4tUNQ2ON8pZ_jM%252C_%253B5ZWWFA1dv1TAiM%252Crsu_8O-nAYv-FM%252C_%253Bx7HEvqKT8T9RoM%252C4tUNQ2ON8pZ_jM%252C_%253BRdmIr00OaunrkM%252Crzn-fTjcURU5jM%252C_%253Bqi92K1f0Tw7F_M%252CY13JFtdAY3gfcM%252C_%253Bgja5jkJ9NBtM3M%252CLe12gRxfd9Qx5M%252C_%253B9gJhPhI8STvNOM%252CK_ntMWzSsdUazM%252C_%253B_XE28r9pzmS7jM%252CY13JFtdAY3gfcM%252C_&usg=AI4_-kRIZleZOuRJr_4mHBSAUqcWUsZDnA&sa=X&sqi=2&ved=2ahUKEwiDtYjjhLr1AhUugv0HHXH4AWsQ9QF6BAgbEAE#imgrc=IVgx2CC_VChlFM"
        alt="avatar"
      />
      <div>
        <h2>{children}</h2>
        <h5 className="mt=2.5 bg-slate-500">{email}</h5>
      </div>
    </div>
  );
};

export default Header;
