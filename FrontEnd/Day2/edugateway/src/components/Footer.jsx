import React from "react";
import '../assets/css/Footer.css'

const Footer = () => {
  return (
    <>
<footer class="footer-distributed">

			<div class="footer-left">

				<h3 id="fcompany">Edu-GateWay</h3>

				<p class="footer-links">
				Here • There • Everywhere
				</p>

				<p class="footer-company-name">RapidGo © 2023</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>123, ABC Street</span>Kuniamuthur,Coimbatore</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+91 9994977285</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">abc@gmail.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
                    <br></br>
                    Instant Access to Your Dreams: Join Us Online for Effortless Admissions!
				</p>



			</div>

		</footer></>
  );
      }
;

export default Footer;