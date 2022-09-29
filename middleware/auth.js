import jwt from 'jsonwebtoken'

const secret = "test";

// req.body
// req.params
// req.headers
// req.query

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({message: "1234 unauthorized user"})
    }

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    console.log({token})

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id

      // console.log("decodedData", decodedData)
    }
    next()
  } catch (err) {
    console.log(err)
  }
}

export default auth;