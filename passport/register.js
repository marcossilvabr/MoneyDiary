// var LocalStrategy   = require('passport-local').Strategy
// var bCrypt          = require('bcrypt-nodejs')
//
// module.exports = (passport, User) => {
//
// 	passport.use('signup', new LocalStrategy({
//     passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//
// 		(req, username, password, done) => {
//                 // find a user in Mongo with provided username
//       User.findOne({ 'username' :  username }, (err, user) => {
//         // In case of any error, return using the done method
//         if (err){
//             console.log('Error in SignUp: '+err);
//             return done(err);
//         }
//         // already exists
//         if (user) {
//             console.log('User already exists with username: '+username);
//             return done(null, false, req.flash('message','User Already Exists'));
//         } else {
//           // if there is no user with that email
//           // create the user
//           var newUser = new User();
//
//           // set the user's local credentials
//           newUser.username = username;
// 					newUser.email = req.param('email')
//           newUser.password = bcrypt.hashSync(req.body.password, 10)
//
//           // save the user
//           newUser.save((err) => {
//               if (err){
//                   console.log('Error in Saving user: '+err);
//                   throw err;
//               }
//               console.log('User Registration succesful');
//               return done(null, newUser);
//           })
//         }
//       })
//     })
//   )
//
// }
//
//
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { return done(err); }
//
// 			// already exists
// 			if (user) {
// 					console.log('User already exists with username: '+username);
// 					return done(null, false, req.flash('message','User Already Exists'));
// 			} else {
// 				// if there is no user with that email
// 				// create the user
// 				var newUser = new User();
//
// 				// set the user's local credentials
// 				newUser.username = username;
// 				newUser.email = req.param('email')
// 				newUser.password = bcrypt.hashSync(req.body.password, 10)
//
// 				// save the user
// 				newUser.save((err) => {
// 						if (err){
// 								console.log('Error in Saving user: '+err);
// 								throw err;
// 						}
// 						console.log('User Registration succesful');
// 						return done(null, newUser);
// 				})
// 			}
//
//     })
//   }
// ))
