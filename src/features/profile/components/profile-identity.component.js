import React from "react";
import {
  ProfileCard,
  ProfileInfo,
  ProfileName,
  AddressView,
  AddressItem,
} from "./profile-identity.styles.js";
export const Identity = ({ profile = {} }) => {
  const {
    uid = "c45d9046-7667-45db-8c16-60071821ba25",
    lastName = "Colombo",
    firstName = "Dano",
    residence = {
      stateProv: "GA",
      city: "Columbus",
      street: "2304 Leah Drive",
      postalCode: "31909",
    },
    stateRep = "GA",
    email = "danocolombo@gmail.com",
    phone = "7066042494",
    church = {
      name: "Wynnbrook Church",
      stateProv: "GA",
      city: "Columbus",
    },
  } = profile;

  return (
    <>
      <ProfileCard elevation={5}>
        <ProfileInfo>
          <ProfileName>
            {firstName} {lastName}
          </ProfileName>
          <AddressView>
            <AddressItem>{residence.street}</AddressItem>
            <AddressItem>
              {residence.city}, {residence.stateProv} {residence.postalCode}
            </AddressItem>
          </AddressView>
        </ProfileInfo>
      </ProfileCard>
    </>
  );
};
