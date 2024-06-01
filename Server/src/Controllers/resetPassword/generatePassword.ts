export const generatePassword = () => {
  // Generate a random password (you can customize the logic)
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newPassword = "";
  for (let i = 0; i < 10; i++) {
    newPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return newPassword;
};
