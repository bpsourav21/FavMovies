import { Request } from "express";
import passport from 'passport';
import passportJwt from "passport-jwt"
import { UserModel } from '../models/User'
import { Constants } from "./constants";

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt;

// const cookieExtractor = (req: Request) => {
//     var token = null;
//     if (req && req.cookies) {
//         token = req.cookies[Constants.AUTH_KEY];
//     }
//     return token;
// };

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Constants.SECRET_KEY,
    //   algorithms: ['RS256']
};


passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    UserModel.findOne({ where: { id: jwt_payload.id } })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
}))

export default passport;