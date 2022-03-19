import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 100px 0 0 0;
  font-family: ${props => props.theme.fontFamily};
`;

const Title = styled.div`
  font-size: 46px;
  margin: 0 auto 40px;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.theme.darkerBlack};
  font-weight: 400;
  letter-spacing: 3px;
`;

const ParagraphTitle = styled.span`
  color: ${props => props.theme.darkerBlack};
  font-size: 24px;
  letter-spacing: 1px;
  display: inline-block;
  margin-top: 20px;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.lightBlack};
`;

class PrivacyPolicy extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Title> Privacy Policy </Title>
          <Paragraph>
            Protecting your private information is our priority. This Statement of Privacy applies to www.gro.capital and
            Gro.Capital, LLC and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise
            noted, all references to Gro Capital include www.gro.capital and Gro Capital, LLC. The Gro.Capital website
            is a Small business growth platform site. By using the Gro.Capital website, you consent to the data practices
            described in this statement.
          </Paragraph>

          <ParagraphTitle>Collection of your Personal Information</ParagraphTitle>
          <Paragraph>
            In order to better provide you with products and services offered on our Site, Gro Capital may collect
            personally identifiable information, such as your:
            <br/><br/>
             -	First and Last Name<br/>
             -	Mailing Address<br/>
             -	E-mail Address<br/>
             -	Phone Number<br/>
             -	Employer<br/>
             -	Job Title<br/>
             -	Banking information and financial reports
            <br/><br/>
            If you purchase Gro Capital products and services, we collect billing and credit card information.
            This information is used to complete the purchase transaction.
            <br/><br/>
            We do not collect any personal information about you unless you voluntarily provide it to us. However,
            you may be required to provide certain personal information to us when you elect to use certain products
            or services available on the Site. These may include: (a) registering for an account on our Site;
            (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special
            offers from selected third parties; (d) sending us an email message; (e) submitting your credit card
            or other payment information when ordering and purchasing products and services on our Site. To wit,
            we will use your information for, but not limited to, communicating with you in relation to services
            and/or products you have requested from us. We also may gather additional personal or non-personal
            information in the future.
          </Paragraph>

          <ParagraphTitle>Use of your Personal Information </ParagraphTitle>
          <Paragraph>
            Gro Capital collects and uses your personal information to operate its website(s) and deliver the services
            you have requested.
            <br/><br/>
            Gro Capital may also use your personally identifiable information to inform you of other products or services
            available from Gro Capital and its affiliates.
          </Paragraph>

          <ParagraphTitle>Sharing Information with Third Parties</ParagraphTitle>
          <Paragraph>
            Gro Capital does not sell, rent or lease its customer lists to third parties
            <br/><br/>
            Gro Capital may share data with trusted partners to help perform statistical analysis, send you email or
            postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited
            from using your personal information except to provide these services to Gro Capital, and they are required
            to maintain the confidentiality of your information.
            <br/><br/>
            Gro Capital may disclose your personal information, without notice, if required to do so by law or in the
            good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with
            legal process served on Gro Capital or the site; (b) protect and defend the rights or property of Gro Capital;
            and/or (c) act under exigent circumstances to protect the personal safety of users of Gro Capital, or the public.
          </Paragraph>

          <ParagraphTitle>Automatically Collected Information</ParagraphTitle>
          <Paragraph>
            Information about your computer hardware and software may be automatically collected by Gro Capital.
            This information can include: your IP address, browser type, domain names, access times and referring
            website addresses. This information is used for the operation of the service, to maintain quality of the
            service, and to provide general statistics regarding use of the Gro Capital website.
          </Paragraph>

          <ParagraphTitle>Links</ParagraphTitle>
          <Paragraph>
            This website contains links to other sites. Please be aware that we are not responsible for the content or
            privacy practices of such other sites. We encourage our users to be aware when they leave our site and to
            read the privacy statements of any other site that collects personally identifiable information.
          </Paragraph>

          <ParagraphTitle>Security of your Personal Information</ParagraphTitle>
          <Paragraph>
            Gro Capital secures your personal information from unauthorized access, use, or disclosure. Gro Capital
            uses the following methods for this purpose:
            <br/><br/>
            -	SSL Protocol
            <br/><br/>
            When personal information (such as a credit card number) is transmitted to other websites, it is protected
            through the use of encryption, such as the Secure Sockets Layer (SSL) protocol.
            <br/><br/>
            We strive to take appropriate security measures to protect against unauthorized access to or alteration of
            your personal information. Unfortunately, no data transmission over the Internet or any wireless network can
            be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you
            acknowledge that: (a) there are security and privacy limitations inherent to the Internet which are beyond
            our control; and (b) security, integrity, and privacy of any and all information and data exchanged between
            you and us through this Site cannot be guaranteed.
          </Paragraph>

          <ParagraphTitle>Children Under Thirteen</ParagraphTitle>
          <Paragraph>
            Gro Capital does not knowingly collect personally identifiable information from children under the age of
            thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.
          </Paragraph>

          <ParagraphTitle>E-mail Communications</ParagraphTitle>
          <Paragraph>
            From time to time, Gro Capital may contact you via email for the purpose of providing announcements,
            promotional offers, alerts, confirmations, surveys, and/or other general communication. In order to improve
            our Services, we may receive a notification when you open an email from Gro Capital or click on a link therein.
            <br/><br/>
            If you would like to stop receiving marketing or promotional communications via email from Gro Capital,
            you may opt out of such communications by Selecting the unsubscribe link in emails.
          </Paragraph>

          <ParagraphTitle>External Data Storage Sites</ParagraphTitle>
          <Paragraph>
            We may store your data on servers provided by third party hosting vendors with whom we have contracted.
          </Paragraph>

          <ParagraphTitle>Changes to this Statement</ParagraphTitle>
          <Paragraph>
            Gro Capital reserves the right to change this Privacy Policy from time to time. We will notify you about
            significant changes in the way we treat personal information by sending a notice to the primary email
            address specified in your account, by placing a prominent notice on our site, and/or by updating any privacy
            information on this page. Your continued use of the Site and/or Services available through this Site after
            such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement
            to abide and be bound by that Policy.
          </Paragraph>

          <ParagraphTitle>Contact Information</ParagraphTitle>
          <Paragraph>
            Gro Capital welcomes your questions or comments regarding this Statement of Privacy. If you believe that
            Gro Capital has not adhered to this Statement, please contact Gro Capital at:
            <br/><br/>
            <b>Gro Capital, LLC <br/>20 Nassau Street <br/>Suite 214<br/>Princeton, New Jersey 08542</b>
            <br/><br/><br/>
            Email Address:
            <b>info@gro.capital</b>
            <br/><br/>
            Telephone number:
            <b> 800-555-1212</b>
          </Paragraph>
        </Container>
      </React.Fragment>
    );
  }
}

export default PrivacyPolicy;
