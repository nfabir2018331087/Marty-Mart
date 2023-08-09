import jwt from "jsonwebtoken";

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1d",
};

export function signJwtAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function verifyJwt(token) {
  try {
    // const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY;
    // const varified = jwt.verify(token, secret_key);
    const decoded = jwt.decode(token);
    const data = decoded._doc
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

