// import React from "react";
// import DataTable from "./DashboardPage/DataTable";
// import BoxContent from "./DashboardPage/BoxContent";
// import styled from "styled-components";
// import Box from "./DashboardPage/Box";
// import SmartDataTable from 'react-smart-data-table';
//
// const Container = styled.div`
//   max-width: 980px;
//   width: 100%;
//   font-family: ${props => props.theme.fontFamily};
//   margin: 0 auto;
//   min-height: calc(${window.innerHeight}px - 290px);
//
//   .accordion {
//     border: none;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
//
//     .accordion__item {
//       border-top: 1px solid rgba(0, 0, 0, 0.1);
//
//       .accordion__title {
//         padding: 0;
//         &:hover {
//           background-color: transparent;
//         }
//
//         &:focus {
//           outline: none;
//         }
//
//         .accordion__arrow {
//           margin-right: 10px;
//
//           &::before,
//           &::after {
//             width: 15px;
//             height: 4px;
//           }
//
//           &::before {
//             left: 9px;
//           }
//
//           &::after {
//             right: 9px;
//           }
//         }
//       }
//
//       .accordion__body {
//         padding: 0 10px;
//         margin-bottom: 20px;
//       }
//     }
//   }
// `;
//
// class CompaniesList extends React.Component {
//   state = {
//     companyData: [],
//     numResults: 100
//   };
//
//   createUser = () => {
//     for (let i = 0; i < this.state.numResults; i++) {
//       this.state.companyData.push({
//         _id: i,
//         fullName: "a" + i,
//         email: 'pap@narola.email' + i,
//         phone_number: "90" + i,
//       });
//     }
//   };
//
//
//   render() {
//     return (
//       <div>
//         <Box>
//           <BoxContent>
//             <SmartDataTable
//               data={this.state.companyData}
//               name="test-table"
//               className="ui compact selectable table"
//               loader={true}
//               sortable
//             />
//           </BoxContent>
//         </Box>
//       </div>
//     );
//   }
// }
//
// export default CompaniesList;
//
