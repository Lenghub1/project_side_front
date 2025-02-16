// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { useRecoilState, useRecoilValue } from "recoil";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// import CP from "@/components";
// import BeforeLoginTemplate from "@/components/template/BeforeLogin";
// import Store from "@/store";
// import campusApi from "@/api/campus";
// import { styled } from "styled-components";
// import { accessTokenState, userState } from "@/store/userStore";
// import { testApi } from "@/api/auth";
// import { handleApiRequest } from "@/api";

// const CampusPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [campus, setCampus] = useRecoilState(Store.User.campusState);
//   const [campusList, setCampustList] = useState<any | null>(null);

//   useEffect(() => {
//     getCampusList();
//   }, []);

//   const accessToken = useRecoilValue(accessTokenState);
//   const user = useRecoilValue(userState);
//   console.log("MY ACCESS TOKEN IN APP: ", accessToken);
//   console.log("USER INFORMATION: ", user);

//   const getCampusList = async () => {
//     setLoading(true);
//     try {
//       const campusListResult = await campusApi.getCampusList();
//       setCampustList(campusListResult);
//     } catch (error) {
//       console.log("GET CAMPUS LIST ERROR : ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteCampus = (
//     e: React.MouseEvent,
//     item: { name: string; id: number }
//   ) => {
//     e.stopPropagation();
//     const newCampusList = campusList.filter(
//       (val: { name: string; id: number }) => val.id !== item.id
//     );
//     setCampustList(newCampusList);
//     localStorage.setItem("campusList", JSON.stringify(newCampusList));
//   };

//   const moveToCampusPage = () => {
//     navigate("/campus/set");
//   };

//   if (loading) {
//     return (
//       <CP.Styled.Wrapper
//         padding={"50px 20px 100px 20px"}
//         style={{ textAlign: "center", fontSize: "30px" }}
//       >
//         Loading..
//       </CP.Styled.Wrapper>
//     );
//   }

//   async function onGetGroupClicked() {
//     const [response, error] = await handleApiRequest(() => testApi.getGroup());
//   }

//   return (
//     <BeforeLoginTemplate>
//       <CP.Styled.Wrapper padding={"50px 20px 100px 20px"}>
//         <CP.Styled.Flex
//           direction="column"
//           gap={20}
//           height="100%"
//           justify="flex-start"
//         >
//           <CP.Styled.Flex direction="column" gap={15} flex={1}>
//             <CP.Typography variant="header">Select Campus</CP.Typography>
//             <CP.Typography>Choose a campus to use</CP.Typography>
//             <CP.Styled.Tag
//               width={"20%"}
//               onClick={moveToCampusPage}
//               cursor={"pointer"}
//             >
//               Please add Campus
//             </CP.Styled.Tag>
//           </CP.Styled.Flex>

//           <CP.Styled.Div overflow={"auto"} flex={4}>
//             <CP.Styled.Flex gap={10} direction="column" flex={3}>
//               {campusList ? (
//                 campusList.map((item: any) => {
//                   return (
//                     <CP.Card
//                       key={item.id}
//                       isActive={item.id === campus ? true : false}
//                       onClick={() => setCampus(item)}
//                     >
//                       {`${item.name}`}
//                       <CardDeleteBtn onClick={(e) => deleteCampus(e, item)}>
//                         <HighlightOffIcon />
//                       </CardDeleteBtn>
//                     </CP.Card>
//                   );
//                 })
//               ) : (
//                 <div>No Campus. Please Add Campus.</div>
//               )}
//             </CP.Styled.Flex>
//             <CP.Button onClick={onGetGroupClicked}>Click me</CP.Button>
//           </CP.Styled.Div>
//         </CP.Styled.Flex>
//       </CP.Styled.Wrapper>
//     </BeforeLoginTemplate>
//   );
// };

// const CardDeleteBtn = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: grey;
//   position: absolute;
//   right: 0;
//   margin-right: 10px;
// `;

// export default CampusPage;
