import React from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
//import PropTypes from 'prop-types';

import "react-accessible-accordion/dist/fancy-example.css";

import PageTitle from "components/PageTitle";
import { themeVars } from "theme";

const Container = styled.div`
  max-width: 980px;
  width: 100%;
  font-family: ${props => props.theme.fontFamily};
  margin: 0 auto;
  min-height: calc(${window.innerHeight}px - 290px);

  .accordion {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .accordion__item {
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      .accordion__title {
        padding: 0;
        &:hover {
          background-color: transparent;
        }

        &:focus {
          outline: none;
        }

        .accordion__arrow {
          margin-right: 10px;

          &::before,
          &::after {
            width: 15px;
            height: 4px;
          }

          &::before {
            left: 9px;
          }

          &::after {
            right: 9px;
          }
        }
      }

      .accordion__body {
        padding: 0 10px;
        margin-bottom: 20px;
      }
    }
  }
`;

const Question = styled.h2`
  font-weight: 500;
  color: ${themeVars.greenColor};
  margin: 0;
  padding: 15px 10px;
`;

const Answer = styled.p`
  font-size: 15px;
  margin-top: 0;
  font-weight: 300;
  color: ${themeVars.lightBlack};
  letter-spacing: 1px;
  line-height: 24px;
`;

const FAQRates = () => {
  return (
    <Container>
      <PageTitle>Frequently Asked Questions</PageTitle>
      <Accordion>
        <AccordionItem>
          <AccordionItemTitle>
            <Question className="u-position-relative">
              What is Gro?
              <div className="accordion__arrow" role="presentation" />
            </Question>
          </AccordionItemTitle>
          <AccordionItemBody>
            <Answer>
              Gro is a brand new way for companies to get access to capital. We
              give a line of credit to companies based on their investability.
              The higher a companies investability, the higher their credit
              ceiling and lower their withdraw rate is. We also help companies
              improve their investability through suggested steps to take, and
              we have a glossary of corporate and investing terms and a mobile
              app that should help new companies get off the ground faster and
              more effectively than ever. Should you company have a high enouch
              investability score, we may even consider investing into your
              copany ourselves for equity.
            </Answer>
          </AccordionItemBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemTitle>
            <Question className="u-position-relative">
              What is “Investability”?
              <div className="accordion__arrow" role="presentation" />
            </Question>
          </AccordionItemTitle>
          <AccordionItemBody>
            <Answer>
              Investability is a score that we give to companies based on
              achievements they’ve completed. Based on our research, we’ve found
              traits in companies that make them more likely to succeed, repay
              loans, and get investment. We list all of these achievements on
              the resources section. Many of these achievements we can detect
              from your companies linked accounts, but some we’ll need proof on,
              such as if you have a prototype in the market or if you have a
              patent. As you follow the suggested steps, your investability
              score will increase, and your access to credit will go up and rate
              for withdrawing cash will go down!
            </Answer>
          </AccordionItemBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemTitle>
            <Question className="u-position-relative">
              How does the line of credit work?
              <div className="accordion__arrow" role="presentation" />
            </Question>
          </AccordionItemTitle>
          <AccordionItemBody>
            <Answer>
              Credit with Gro is incredibly easy. There is no interest at all.
              Instead, we have a rate for a withdraw fee that is associated
              direclty with how investabile your company is. If you have a lower
              investability score, your withdraw rate will be higher and the
              amount of credit you can access will be lower. However, as you
              improve your investability, your withdraw rate will drop and your
              credit ceiling will increase. So let’s say that you have an
              investability score of 30. This would put you at our level 3 rate,
              which would give you access to $45,000 and have a withdraw fee of
              $0.08 per dollar you withdraw. When you go to withdraw $10,000,
              there would be a fee of $800. We subtract the fee from your
              withdrawl, so $9,200 would hit your account in minutes, and you
              would owe back $10,000, so you can pay the fee later. We then set
              up a monthly payment schedule for you to pay back the $10,000.
              Typically it’s a three year payback, so in this example you would
              have 36 payments of $277.78. Again, that’s no interest at all, and
              anytime you make a withdraw or payment, we show you the results of
              your actions up front with a graph and easy to read text and
              numbers so you always know what you can expect to be liquid and
              what you can expect to pay back.
            </Answer>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

FAQRates.propTypes = {};

export default FAQRates;
