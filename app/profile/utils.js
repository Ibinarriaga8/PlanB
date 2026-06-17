export const getUserProfile = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/profile/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  };

export const changeUserPassword = async (token, oldPassword, newPassword) => {
const response = await fetch("http://127.0.0.1:8000/api/users/change-password/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
    old_password: oldPassword,
    new_password: newPassword,
    }),
});

if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
    errorData.new_password?.[0] ||
    errorData.old_password ||
    "Unknown error changing password"
    );
}

return await response.json();
};


export const getMyWallet = async (token) => {
  const response = await fetch("http://127.0.0.1:8000/api/users/my-wallet", {
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    }
  })
  const data = await response.json();
  if (!response.ok){
    return

  }


  return data;
}

export const withdraw = async (token, amount) => {
  const response = await fetch("http://127.0.0.1:8000/api/users/withdraw/", {
    method: "POST",
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-type": "application/json"
    },
    body:JSON.stringify({amount: amount})
  })

  const data = await response.json();
  if (!response.ok){
    return {error: data.detail}
  }
  return data;
}

export const deposit = async (token, amount) => {
  const response = await fetch("http://127.0.0.1:8000/api/users/deposit/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({amount: amount})
  })

  const data = await response.json();
  if (!response.ok){
    return {error: data.detail}
  }
  return data;
}
