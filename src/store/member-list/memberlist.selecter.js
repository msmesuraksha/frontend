export const SelecMemberList = (state) => {
  return state.MemberList?.memberData?.map((item) => {
    const {
      city,
      createdAt,
      companies = [],
      emailId,
      id,
      isActiveAccount,
      name,
      phoneNumber,
      role,
      secPhoneNumber,
      state: memberState,
      updatedAt,
      userName,
      suspensionRemarkByL2,
      suspensionRemarkByL3,
    } = item;

    const companyNames = companies.map(company => company.companyName);

    return {
      city,
      createdAt,
      companies,
      emailId,
      id,
      isActiveAccount,
      name,
      companyNames,
      phoneNumber,
      role,
      secPhoneNumber,
      state: memberState,
      updatedAt,
      userName,
      suspensionRemarkByL2,
      suspensionRemarkByL3,
    };
  }).sort((a, b) => a.name.localeCompare(b.name)).reverse();
}


export const SelectCompanyList = (state) => {
  return state.MemberList?.getAllCompanies?.map((item) => {
    const {
      companyName,
      customerMobile,
      gstin,
      companyPan,
      totalAmount,
      joinedOn,
      city,
      state,
    } = item;



    return {
      companyName,
      customerMobile,
      gstin,
      companyPan,
      totalAmount,
      joinedOn,
      city,
      state,
      createdRole: item.createdBy?.role
    };
  }).sort((a, b) => a.companyName.localeCompare(b.companyName)).reverse();
}