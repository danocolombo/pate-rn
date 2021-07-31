import React from "react";
import {
  ProfileCard,
  ProfileInfo,
  ProfileName,
  AddressView,
  AddressItem,
} from "./profile-identity.styles.js";
export const Identity = ({ user = {}, profile = {} }) => {
  // const {
  //   uid = "c45d9046-7667-45db-8c16-60071821ba25",
  //   lastName = "Colombo",
  //   firstName = "Dano",
  //   residence = {
  //     stateProv: "GA",
  //     city: "Columbus",
  //     street: "2304 Leah Drive",
  //     postalCode: "31909",
  //   },
  //   stateRep = "GA",
  //   email = "danocolombo@gmail.com",
  //   phone = "7066042494",
  //   church = {
  //     name: "Wynnbrook Church",
  //     stateProv: "GA",
  //     city: "Columbus",
  //   },
  // } = profile;
  console.log("[--0020--]user:\n", user);
  console.log("[--0021--]profile:\n", profile);
  return (
    <>
      <ProfileCard elevation={5}>
        <ProfileInfo>
          <ProfileName>
            {profile?.firstName} {profile?.lastName}
          </ProfileName>
          <ProfileName>{"TEST"}</ProfileName>
          <AddressView>
            <AddressItem>{profile?.residence?.street}</AddressItem>
            <AddressItem>
              {profile?.residence?.city}, {profile?.residence?.stateProv}{" "}
              {profile?.residence?.postalCode}
            </AddressItem>
          </AddressView>
        </ProfileInfo>
      </ProfileCard>
    </>
  );
};
