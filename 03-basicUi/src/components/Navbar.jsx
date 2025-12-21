import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div>
        <h1>Horizon Courts</h1>
      </div>
      <div className="mid">
        <h3>About Us</h3>
        <h3>Services</h3>
        <h3>Coaches</h3>
        <h3>Events</h3>
        <h3>Contacts</h3>
      </div>
      <div>
        <button>
          Book now<i class="ri-arrow-right-up-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
