import { AppControlContext } from "../../context/AppControlContext";
import { useContext } from "react";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import { Link } from "react-router-dom";
import LoginPopup from "../../components/Popups/LoginPopup";

const Terms = () => {
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
  const changeLoginPopupState = () => {
    setLoginPopupState(!loginPopupState);
  };
  window.scrollTo(0, 0);
  return (
    <div className="white-page">
      <section className="box">
        <div className="wrap">
          <div className="sub-menu sub-menu--center">
            <ul className="sub-menu__list">
              <li>
                <Link to="/terms" className="active">
                  terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <article className="text">
            <h1>Terms and Conditions</h1>
            <h2>Agreement between User and www.grocap.com</h2>

            <p>
              Welcome to www.grocap.com. The www.grocap.com website (the "Site")
              is comprised of various web pages operated by Gro Capital ("Gro
              Cap"). www.grocap.com is offered to you conditioned on your
              acceptance without modification of the terms, conditions, and
              notices contained herein (the "Terms"). Your use of www.grocap.com
              constitutes your agreement to all such Terms. Please read these
              terms carefully, and keep a copy of them for your reference.
            </p>

            <p>www.grocap.com is an E-Commerce Site.</p>

            <p>
              Gro Capital provides emerging and growth companies opportunities
              to raise capital as debt and/or equity.
            </p>

            <h2>Privacy</h2>
            <p>
              Your use of www.grocap.com is subject to Gro Cap's Privacy Policy.
              Please review our Privacy Policy, which also governs the Site and
              informs users of our data collection practices.
            </p>

            <h2>Electronic Communications</h2>
            <p>
              Visiting www.grocap.com or sending emails to Gro Cap constitutes
              electronic communications. You consent to receive electronic
              communications and you agree that all agreements, notices,
              disclosures and other communications that we provide to you
              electronically, via email and on the Site, satisfy any legal
              requirement that such communications be in writing.
            </p>

            <h2>Your Account</h2>
            <p>
              If you use this site, you are responsible for maintaining the
              confidentiality of your account and password and for restricting
              access to your computer, and you agree to accept responsibility
              for all activities that occur under your account or password. You
              may not assign or otherwise transfer your account to any other
              person or entity. You acknowledge that Gro Cap is not responsible
              for third party access to your account that results from theft or
              misappropriation of your account. Gro Cap and its associates
              reserve the right to refuse or cancel service, terminate accounts,
              or remove or edit content in our sole discretion.
            </p>

            <h2>Children Under Thirteen</h2>
            <p>
              Gro Cap does not knowingly collect, either online or offline,
              personal information from persons under the age of thirteen. If
              you are under 18, you may use www.grocap.com only with permission
              of a parent or guardian.
            </p>

            <h2>Cancellation/Refund Policy</h2>
            <p>
              At any time prior to finalizing a contract for debt or equity, a
              prospective customer may cancel their application.
            </p>

            <h2>Links to Third Party Sites/Third Party Services</h2>
            <p>
              www.grocap.com may contain links to other websites ("Linked
              Sites"). The Linked Sites are not under the control of Gro Cap and
              Gro Cap is not responsible for the contents of any Linked Site,
              including without limitation any link contained in a Linked Site,
              or any changes or updates to a Linked Site. Gro Cap is providing
              these links to you only as a convenience, and the inclusion of any
              link does not imply endorsement by Gro Cap of the site or any
              association with its operators.
            </p>

            <p>
              Certain services made available via www.grocap.com are delivered
              by third party sites and organizations. By using any product,
              service or functionality originating from the www.grocap.com
              domain, you hereby acknowledge and consent that Gro Cap may share
              such information and data with any third party with whom Gro Cap
              has a contractual relationship to provide the requested product,
              service or functionality on behalf of www.grocap.com users and
              customers.
            </p>

            <h2>No Unlawful or Prohibited Use/Intellectual Property</h2>
            <p>
              You are granted a non-exclusive, non-transferable, revocable
              license to access and use www.grocap.com strictly in accordance
              with these terms of use. As a condition of your use of the Site,
              you warrant to Gro Cap that you will not use the Site for any
              purpose that is unlawful or prohibited by these Terms. You may not
              use the Site in any manner which could damage, disable,
              overburden, or impair the Site or interfere with any other party's
              use and enjoyment of the Site. You may not obtain or attempt to
              obtain any materials or information through any means not
              intentionally made available or provided for through the Site.
            </p>

            <p>
              All content included as part of the Service, such as text,
              graphics, logos, images, as well as the compilation thereof, and
              any software used on the Site, is the property of Gro Cap or its
              suppliers and protected by copyright and other laws that protect
              intellectual property and proprietary rights. You agree to observe
              and abide by all copyright and other proprietary notices, legends
              or other restrictions contained in any such content and will not
              make any changes thereto.
            </p>

            <p>
              You will not modify, publish, transmit, reverse engineer,
              participate in the transfer or sale, create derivative works, or
              in any way exploit any of the content, in whole or in part, found
              on the Site. Gro Cap content is not for resale. Your use of the
              Site does not entitle you to make any unauthorized use of any
              protected content, and in particular you will not delete or alter
              any proprietary rights or attribution notices in any content. You
              will use protected content solely for your personal use, and will
              make no other use of the content without the express written
              permission of Gro Cap and the copyright owner. You agree that you
              do not acquire any ownership rights in any protected content. We
              do not grant you any licenses, express or implied, to the
              intellectual property of Gro Cap or our licensors except as
              expressly authorized by these Terms.
            </p>

            <h2>Third Party Accounts</h2>
            <p>
              You will be able to connect your Gro Cap account to third party
              accounts. By connecting your Gro Cap account to your third party
              account, you acknowledge and agree that you are consenting to the
              continuous release of information about you to others (in
              accordance with your privacy settings on those third party sites).
              If you do not want information about you to be shared in this
              manner, do not use this feature.
            </p>

            <h2>International Users</h2>
            <p>
              The Service is controlled, operated and administered by Gro Cap
              from our offices within the USA. If you access the Service from a
              location outside the USA, you are responsible for compliance with
              all local laws. You agree that you will not use the Gro Cap
              Content accessed through www.grocap.com in any country or in any
              manner prohibited by any applicable laws, restrictions or
              regulations.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend and hold harmless Gro Cap, its
              officers, directors, employees, agents and third parties, for any
              losses, costs, liabilities and expenses (including reasonable
              attorney's fees) relating to or arising out of your use of or
              inability to use the Site or services, any user postings made by
              you, your violation of any terms of this Agreement or your
              violation of any rights of a third party, or your violation of any
              applicable laws, rules or regulations. Gro Cap reserves the right,
              at its own cost, to assume the exclusive defense and control of
              any matter otherwise subject to indemnification by you, in which
              event you will fully cooperate with Gro Cap in asserting any
              available defenses.
            </p>

            <h2>Arbitration</h2>
            <p>
              In the event the parties are not able to resolve any dispute
              between them arising out of or concerning these Terms and
              Conditions, or any provisions hereof, whether in contract, tort,
              or otherwise at law or in equity for damages or any other relief,
              then such dispute shall be resolved only by final and binding
              arbitration pursuant to the Federal Arbitration Act, conducted by
              a single neutral arbitrator and administered by the American
              Arbitration Association, or a similar arbitration service selected
              by the parties, in a location mutually agreed upon by the parties.
              The arbitrator's award shall be final, and judgment may be entered
              upon it in any court having jurisdiction. In the event that any
              legal or equitable action, proceeding or arbitration arises out of
              or concerns these Terms and Conditions, the prevailing party shall
              be entitled to recover its costs and reasonable attorney's fees.
              The parties agree to arbitrate all disputes and claims in regards
              to these Terms and Conditions or any disputes arising as a result
              of these Terms and Conditions, whether directly or indirectly,
              including Tort claims that are a result of these Terms and
              Conditions. The parties agree that the Federal Arbitration Act
              governs the interpretation and enforcement of this provision. The
              entire dispute, including the scope and enforceability of this
              arbitration provision shall be determined by the Arbitrator. This
              arbitration provision shall survive the termination of these Terms
              and Conditions.
            </p>

            <h2>className Action Waiver</h2>
            <p>
              Any arbitration under these Terms and Conditions will take place
              on an individual basis; className arbitrations and
              className/representative/collective actions are not permitted. THE
              PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY
              IN EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR className
              MEMBER IN ANY PUTATIVE className, COLLECTIVE AND/ OR
              REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE
              ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both
              you and Gro Cap agree otherwise, the arbitrator may not
              consolidate more than one person's claims, and may not otherwise
              preside over any form of a representative or className proceeding.
            </p>

            <h2>Liability Disclaimer</h2>
            <p>
              THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR
              AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR
              TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE
              INFORMATION HEREIN. GRO CAPITAL AND/OR ITS SUPPLIERS MAY MAKE
              IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
            </p>

            <p>
              GRO CAPITAL AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE
              SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY
              OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED
              GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM
              EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION,
              SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS
              IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. GRO CAPITAL AND/OR
              ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH
              REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND
              RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
              NON-INFRINGEMENT.
            </p>

            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL GRO CAPITAL AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT,
              INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR
              ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR
              LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY
              CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY
              OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF
              OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE,
              PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE,
              OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON
              CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF
              GRO CAPITAL OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE
              POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT
              ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL
              OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
              IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY
              OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
              DISCONTINUE USING THE SITE.
            </p>

            <h2>Termination/Access Restriction</h2>
            <p>
              Gro Cap reserves the right, in its sole discretion, to terminate
              your access to the Site and the related services or any portion
              thereof at any time, without notice. To the maximum extent
              permitted by law, this agreement is governed by the laws of the
              State of Delaware and you hereby consent to the exclusive
              jurisdiction and venue of courts in Delaware in all disputes
              arising out of or relating to the use of the Site. Use of the Site
              is unauthorized in any jurisdiction that does not give effect to
              all provisions of these Terms, including, without limitation, this
              section.
            </p>

            <p>
              You agree that no joint venture, partnership, employment, or
              agency relationship exists between you and Gro Cap as a result of
              this agreement or use of the Site. Gro Cap's performance of this
              agreement is subject to existing laws and legal process, and
              nothing contained in this agreement is in derogation of Gro Cap's
              right to comply with governmental, court and law enforcement
              requests or requirements relating to your use of the Site or
              information provided to or gathered by Gro Cap with respect to
              such use. If any part of this agreement is determined to be
              invalid or unenforceable pursuant to applicable law including, but
              not limited to, the warranty disclaimers and liability limitations
              set forth above, then the invalid or unenforceable provision will
              be deemed superseded by a valid, enforceable provision that most
              closely matches the intent of the original provision and the
              remainder of the agreement shall continue in effect.
            </p>

            <p>
              Unless otherwise specified herein, this agreement constitutes the
              entire agreement between the user and Gro Cap with respect to the
              Site and it supersedes all prior or contemporaneous communications
              and proposals, whether electronic, oral or written, between the
              user and Gro Cap with respect to the Site. A printed version of
              this agreement and of any notice given in electronic form shall be
              admissible in judicial or administrative proceedings based upon or
              relating to this agreement to the same extent and subject to the
              same conditions as other business documents and records originally
              generated and maintained in printed form. It is the express wish
              to the parties that this agreement and all related documents be
              written in English
            </p>

            <h2>Changes to Terms</h2>
            <p>
              Gro Cap reserves the right, in its sole discretion, to change the
              Terms under which www.grocap.com is offered. The most current
              version of the Terms will supersede all previous versions. Gro Cap
              encourages you to periodically review the Terms to stay informed
              of our updates.
            </p>

            <h2>Contact Us</h2>
            <p>
              Gro Cap welcomes your questions or comments regarding the Terms:
            </p>
          </article>
        </div>
      </section>
      <HeroBottom description="Ready to Fuel Up Your Business?" />
      <LoginPopup
        popupState={loginPopupState}
        onClose={changeLoginPopupState}
      />
    </div>
  );
};

export default Terms;
