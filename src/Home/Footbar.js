export default function Footbar() {
  return(
    <div style={{backgroundColor:"#20314E"}}>
      {/* <foot className="navbar">
        <span className="navbar-brand mb-0 h1">Footbar</span>
      </foot> */}
      <footer id="footer" class="footer-1">
        <div class="main-footer widgets-dark typo-light">
          <div class="container">
            <div class="row">

              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget subscribe no-box">
                  <h5 class="widget-title">COMPANY NAME<span></span></h5>
                  <p>About the company, little discription will goes here.. </p>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="widget no-box">
                  <h5 class="widget-title">Quick Links<span></span></h5>
                  <ul class="thumbnail-widget">
                    <li>
                      <div class="thumb-content"><a href="#.">Get Started</a></div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-3">

                <div class="widget no-box">
                  <h5 class="widget-title">Contact Us<span></span></h5>

                  <p><a href="mailto:info@domain.com" title="glorythemes">info@domain.com</a></p>
                  <ul class="social-footer2">
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="footer-copyright">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p>Copyright Company Name © 2021. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}