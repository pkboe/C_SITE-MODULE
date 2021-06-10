const Footer = (props) => {
  return (
    <>
      <div className="footer fixed-bottom ">
        <nav className="navba navbar-light bg-light">
          <div className="d-flex flex-row-reverse justify-content-between">
            <p className="ml-5 m-2 text-muted">
              Copyright (c) MetricGrade 2021
            </p>
            <p className="mr-5 m-2 text-muted ">All Rights Reserved.</p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Footer;
