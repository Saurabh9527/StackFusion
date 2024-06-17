
const API_END_POINT = import.meta.env.VITE_USER_URL;
const PROFILE_AVTAAR = "https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.webp?b=1&s=170667a&w=0&k=20&c=X-ZNF80_ASKvWpbOICHC8Pf27CFCRyh7Ce9SDVopjZg="

 const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


export{API_END_POINT , calculateAge , PROFILE_AVTAAR}

