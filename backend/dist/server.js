"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var _require = require('mongodb'),
  MongoClient = _require.MongoClient,
  ObjectId = _require.ObjectId;
var path = require('path');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
var mongoURI = 'mongodb+srv://rainbirdwebb05:IgnoreThisBull1@gravitymaincluster.0t7iv.mongodb.net/mainDatabase';
var client = new MongoClient(mongoURI);
var db;
client.connect().then(function () {
  console.log("MongoDB connected");
  db = client.db('mainDatabase');
})["catch"](function (err) {
  return console.error("MongoDB connection error:", err);
});

// API routes
app.get('/api/playlists', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.collection('playlists').find().toArray();
        case 3:
          playlists = _context.sent;
          res.json(playlists);
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching playlists:", _context.t0);
          res.status(500).json({
            message: 'Error fetching playlists'
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/api/playlists/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, playlist;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          if (ObjectId.isValid(id)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid ID format'
          }));
        case 4:
          _context2.next = 6;
          return db.collection('playlists').findOne({
            _id: new ObjectId(id)
          });
        case 6:
          playlist = _context2.sent;
          if (playlist) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 9:
          res.json(playlist); // Send back the playlist
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching playlist:", _context2.t0);
          res.status(500).json({
            message: 'Error fetching playlist'
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/api/users', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return db.collection('users').find({}, {
            projection: {
              password: 0
            }
          }).toArray();
        case 3:
          users = _context3.sent;
          res.json(users);
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching users:", _context3.t0);
          res.status(500).json({
            message: 'Error fetching users'
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get('/api/users/:userId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.params.userId;
          _context4.next = 4;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          }, {
            projection: {
              password: 0
            }
          });
        case 4:
          user = _context4.sent;
          if (user) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          res.json(user);
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching user:', _context4.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.get('/api/songs', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var songs;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return db.collection('songs').find().toArray();
        case 3:
          songs = _context5.sent;
          res.json(songs);
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: 'Error fetching songs'
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.post('/api/login', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body, email, password, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context6.prev = 1;
          _context6.next = 4;
          return db.collection('users').findOne({
            email: email
          });
        case 4:
          user = _context6.sent;
          if (!(!user || user.password !== password)) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            message: 'Invalid email or password'
          }));
        case 7:
          res.status(200).json(user);
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          console.error('Error during login:', _context6.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 10]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.post('/api/signup', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, fullName, email, password, username, surname, profileImage, existingUser, newUser, result, createdUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body2 = req.body, fullName = _req$body2.fullName, email = _req$body2.email, password = _req$body2.password, username = _req$body2.username, surname = _req$body2.surname, profileImage = _req$body2.profileImage;
          _context7.prev = 1;
          _context7.next = 4;
          return db.collection('users').findOne({
            email: email
          });
        case 4:
          existingUser = _context7.sent;
          if (!existingUser) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Email already in use'
          }));
        case 7:
          newUser = {
            admin: "false",
            username: username,
            name: fullName,
            surname: surname,
            email: email,
            password: password,
            profileImage: profileImage,
            playlists: [],
            savedplaylists: [],
            followers: [],
            following: []
          };
          _context7.next = 10;
          return db.collection('users').insertOne(newUser);
        case 10:
          result = _context7.sent;
          _context7.next = 13;
          return db.collection('users').findOne({
            _id: result.insertedId
          });
        case 13:
          createdUser = _context7.sent;
          // Fetch the full user document

          res.status(201).json({
            message: 'User created successfully',
            user: createdUser
          });
          _context7.next = 21;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](1);
          console.error('Error creating user:', _context7.t0);
          res.status(500).json({
            message: 'Error creating user'
          });
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 17]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app.put('/api/playlists/:id/reorder-songs', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, songIds, result, updatedPlaylist;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          songIds = req.body.songIds;
          _context8.prev = 2;
          _context8.next = 5;
          return db.collection('playlists').updateOne({
            _id: new ObjectId(id)
          }, {
            $set: {
              songs: songIds
            }
          });
        case 5:
          result = _context8.sent;
          if (!(result.matchedCount === 0)) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 8:
          _context8.next = 10;
          return db.collection('playlists').findOne({
            _id: new ObjectId(id)
          });
        case 10:
          updatedPlaylist = _context8.sent;
          res.status(200).json(updatedPlaylist);
          _context8.next = 18;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](2);
          console.error("Error updating song order:", _context8.t0);
          res.status(500).json({
            error: 'Error saving new song order'
          });
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 14]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
app["delete"]('/api/songs/:id', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.prev = 1;
          if (ObjectId.isValid(id)) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'Invalid song ID format'
          }));
        case 4:
          _context9.next = 6;
          return db.collection('songs').deleteOne({
            _id: new ObjectId(id)
          });
        case 6:
          result = _context9.sent;
          if (!(result.deletedCount === 0)) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Song not found'
          }));
        case 9:
          res.status(200).json({
            message: 'Song deleted successfully'
          });
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](1);
          console.error('Error deleting song:', _context9.t0);
          res.status(500).json({
            message: 'Error deleting song'
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.post('/api/songs', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body3, title, artist, album, genre, releaseYear, duration, spotifyUrl, newSong, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _req$body3 = req.body, title = _req$body3.title, artist = _req$body3.artist, album = _req$body3.album, genre = _req$body3.genre, releaseYear = _req$body3.releaseYear, duration = _req$body3.duration, spotifyUrl = _req$body3.spotifyUrl;
          _context10.prev = 1;
          newSong = {
            name: title,
            artist: artist,
            album: album,
            genre: genre,
            releaseYear: releaseYear,
            duration: duration,
            spotifyUrl: spotifyUrl
          };
          _context10.next = 5;
          return db.collection('songs').insertOne(newSong);
        case 5:
          result = _context10.sent;
          res.status(201).json(_objectSpread(_objectSpread({}, newSong), {}, {
            _id: result.insertedId
          })); // Return the new song with its ID
          _context10.next = 13;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](1);
          console.error('Error adding new song:', _context10.t0);
          res.status(500).json({
            message: 'Error adding new song'
          });
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 9]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app.put('/api/users/:userId', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var userId, _req$body4, username, profileImage, password, oldPassword, user, updates, isValidUrlOrBase64, updatedUser;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          userId = req.params.userId;
          _req$body4 = req.body, username = _req$body4.username, profileImage = _req$body4.profileImage, password = _req$body4.password, oldPassword = _req$body4.oldPassword;
          _context11.prev = 2;
          _context11.next = 5;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          });
        case 5:
          user = _context11.sent;
          if (user) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          if (!(password && oldPassword !== user.password)) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Old password is incorrect.'
          }));
        case 10:
          updates = {};
          if (username) updates.username = username;
          if (!profileImage) {
            _context11.next = 17;
            break;
          }
          isValidUrlOrBase64 = profileImage.startsWith('http') || profileImage.startsWith('data:image/');
          if (isValidUrlOrBase64) {
            _context11.next = 16;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: 'Profile image must be a valid URL or base64 string.'
          }));
        case 16:
          updates.profileImage = profileImage;
        case 17:
          if (password) updates.password = password;
          _context11.next = 20;
          return db.collection('users').findOneAndUpdate({
            _id: new ObjectId(userId)
          }, {
            $set: updates
          }, {
            returnOriginal: false
          });
        case 20:
          updatedUser = _context11.sent;
          if (updatedUser.value) {
            _context11.next = 23;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            message: 'No changes were made.'
          }));
        case 23:
          res.json(updatedUser.value);
          _context11.next = 30;
          break;
        case 26:
          _context11.prev = 26;
          _context11.t0 = _context11["catch"](2);
          console.error('Error updating user:', _context11.t0);
          res.status(500).json({
            message: 'Error updating user'
          });
        case 30:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 26]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.get('/api/users/:userId/savedPlaylists', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var userId, user, savedPlaylists;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          userId = req.params.userId;
          _context12.prev = 1;
          _context12.next = 4;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          }, {
            projection: {
              savedplaylists: 1
            }
          });
        case 4:
          user = _context12.sent;
          if (user) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          _context12.next = 9;
          return db.collection('playlists').find({
            _id: {
              $in: user.savedplaylists.map(function (id) {
                return new ObjectId(id);
              })
            }
          }).toArray();
        case 9:
          savedPlaylists = _context12.sent;
          res.json(savedPlaylists);
          _context12.next = 17;
          break;
        case 13:
          _context12.prev = 13;
          _context12.t0 = _context12["catch"](1);
          console.error('Error fetching saved playlists:', _context12.t0);
          res.status(500).json({
            message: 'Error fetching saved playlists'
          });
        case 17:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 13]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.post('/api/playlists/:id/save', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var playlistId, userId, playlist, user, savedList;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          playlistId = req.params.id;
          userId = req.body.userId;
          _context13.prev = 2;
          _context13.next = 5;
          return db.collection('playlists').findOne({
            _id: new ObjectId(playlistId)
          });
        case 5:
          playlist = _context13.sent;
          if (playlist) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 8:
          _context13.next = 10;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          });
        case 10:
          user = _context13.sent;
          if (user) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 13:
          _context13.next = 15;
          return db.collection('users.savedplaylists').findOne({
            _id: new ObjectId(playlistId)
          });
        case 15:
          savedList = _context13.sent;
          if (!savedList) {
            _context13.next = 18;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: 'Playlist already added'
          }));
        case 18:
          _context13.next = 20;
          return db.collection('users').updateOne({
            _id: new ObjectId(userId)
          }, {
            $addToSet: {
              savedplaylists: playlistId
            }
          } // Update the user's savedPlaylists in the database
          );
        case 20:
          res.status(200).json({
            message: 'Playlist saved successfully',
            playlist: playlist
          });
          _context13.next = 27;
          break;
        case 23:
          _context13.prev = 23;
          _context13.t0 = _context13["catch"](2);
          console.error(_context13.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 27:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[2, 23]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
app.post('/api/playlists', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$body5, userId, playlistName, description, playlistArt, tags, genre, newPlaylist, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _req$body5 = req.body, userId = _req$body5.userId, playlistName = _req$body5.playlistName, description = _req$body5.description, playlistArt = _req$body5.playlistArt, tags = _req$body5.tags, genre = _req$body5.genre; // Destructure additional fields
          _context14.prev = 1;
          newPlaylist = {
            name: playlistName,
            description: description,
            dateCreated: new Date(),
            createdBy: userId,
            playlistArt: playlistArt || '',
            tags: tags || [],
            genre: genre || [],
            songs: [],
            comments: []
          }; // Insert the new playlist
          _context14.next = 5;
          return db.collection('playlists').insertOne(newPlaylist);
        case 5:
          result = _context14.sent;
          _context14.next = 8;
          return db.collection('users').updateOne({
            _id: new ObjectId(userId)
          }, {
            $addToSet: {
              playlists: result.insertedId
            }
          } // Add the playlist ID to the user's playlists array
          );
        case 8:
          res.status(201).json(result.insertedId);
          _context14.next = 15;
          break;
        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](1);
          console.error('Error creating playlist:', _context14.t0);
          res.status(500).json({
            message: 'Error creating playlist'
          });
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 11]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app.post('/api/users/:userId/removeFriend', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var userId, friendId;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          userId = req.params.userId;
          friendId = req.body.friendId;
          _context15.prev = 2;
          _context15.next = 5;
          return db.collection('users').updateOne({
            _id: new ObjectId(userId)
          }, {
            $pull: {
              friends: friendId
            }
          } // Remove the friendId from the friends array
          );
        case 5:
          _context15.next = 7;
          return db.collection('users').updateOne({
            _id: new ObjectId(friendId)
          }, {
            $pull: {
              friends: userId
            }
          } // Remove the userId from the friend's friends array
          );
        case 7:
          res.status(200).json({
            message: 'Friend removed successfully'
          });
          _context15.next = 14;
          break;
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](2);
          console.error('Error removing friend:', _context15.t0);
          res.status(500).json({
            message: 'Error removing friend'
          });
        case 14:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[2, 10]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
app["delete"]('/api/comments/:commentId', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var commentId, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          commentId = req.params.commentId;
          _context16.prev = 1;
          _context16.next = 4;
          return db.collection('comments').deleteOne({
            _id: new ObjectId(commentId)
          });
        case 4:
          result = _context16.sent;
          if (!(result.deletedCount === 0)) {
            _context16.next = 7;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: 'Comment not found'
          }));
        case 7:
          _context16.next = 9;
          return db.collection('playlists').updateOne({
            comments: new ObjectId(commentId)
          }, {
            $pull: {
              comments: new ObjectId(commentId)
            }
          });
        case 9:
          res.status(200).json({
            message: 'Comment deleted successfully'
          });
          _context16.next = 16;
          break;
        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16["catch"](1);
          console.error('Error deleting comment:', _context16.t0);
          res.status(500).json({
            message: 'Error deleting comment'
          });
        case 16:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[1, 12]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app.post('/api/comments/:id/like', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id = req.params.id;
          if (ObjectId.isValid(id)) {
            _context17.next = 3;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            message: 'Invalid comment ID format'
          }));
        case 3:
          _context17.prev = 3;
          _context17.next = 6;
          return db.collection('comments').updateOne({
            _id: new ObjectId(id)
          }, {
            $inc: {
              likes: 1
            }
          });
        case 6:
          result = _context17.sent;
          if (!(result.modifiedCount === 0)) {
            _context17.next = 9;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Comment not found'
          }));
        case 9:
          res.status(200).json({
            message: 'Comment liked successfully'
          });
          _context17.next = 16;
          break;
        case 12:
          _context17.prev = 12;
          _context17.t0 = _context17["catch"](3);
          console.error('Error liking comment:', _context17.t0);
          res.status(500).json({
            message: 'Error liking comment'
          });
        case 16:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[3, 12]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
app.post('/api/comments/:id/dislike', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          id = req.params.id;
          if (ObjectId.isValid(id)) {
            _context18.next = 3;
            break;
          }
          return _context18.abrupt("return", res.status(400).json({
            message: 'Invalid comment ID format'
          }));
        case 3:
          _context18.prev = 3;
          _context18.next = 6;
          return db.collection('comments').updateOne({
            _id: new ObjectId(id)
          }, {
            $inc: {
              dislikes: 1
            }
          });
        case 6:
          result = _context18.sent;
          if (!(result.modifiedCount === 0)) {
            _context18.next = 9;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Comment not found'
          }));
        case 9:
          res.status(200).json({
            message: 'Comment disliked successfully'
          });
          _context18.next = 16;
          break;
        case 12:
          _context18.prev = 12;
          _context18.t0 = _context18["catch"](3);
          console.error('Error disliking comment:', _context18.t0);
          res.status(500).json({
            message: 'Error disliking comment'
          });
        case 16:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[3, 12]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
app.put('/api/playlists/:id', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var id, _req$body6, name, description, genre, tags, playlistArt, updatedPlaylist, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          id = req.params.id;
          _req$body6 = req.body, name = _req$body6.name, description = _req$body6.description, genre = _req$body6.genre, tags = _req$body6.tags, playlistArt = _req$body6.playlistArt;
          _context19.prev = 2;
          updatedPlaylist = {
            name: name,
            description: description,
            genre: genre,
            tags: tags,
            playlistArt: playlistArt
          };
          _context19.next = 6;
          return db.collection('playlists').updateOne({
            _id: new ObjectId(id)
          }, {
            $set: updatedPlaylist
          });
        case 6:
          result = _context19.sent;
          if (result.modifiedCount > 0) {
            res.status(200).json(updatedPlaylist);
          } else {
            res.status(404).json({
              message: 'Playlist not found'
            });
          }
          _context19.next = 14;
          break;
        case 10:
          _context19.prev = 10;
          _context19.t0 = _context19["catch"](2);
          console.error('Error updating playlist:', _context19.t0);
          res.status(500).json({
            message: 'Error updating playlist'
          });
        case 14:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[2, 10]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app["delete"]('/api/playlists/:id', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          id = req.params.id;
          _context20.prev = 1;
          _context20.next = 4;
          return db.collection('playlists').deleteOne({
            _id: new ObjectId(id)
          });
        case 4:
          result = _context20.sent;
          if (result.deletedCount > 0) {
            res.status(204).send(); // No content to return
          } else {
            res.status(404).json({
              message: 'Playlist not found'
            });
          }
          _context20.next = 12;
          break;
        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          console.error('Error deleting playlist:', _context20.t0);
          res.status(500).json({
            message: 'Error deleting playlist'
          });
        case 12:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[1, 8]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
app.post('/api/logout', function (req, res) {
  res.status(200).json({
    message: 'Logged out successfully'
  });
});
app["delete"]('/api/users/:userId', /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          userId = req.params.userId;
          _context21.prev = 1;
          _context21.next = 4;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          });
        case 4:
          user = _context21.sent;
          if (user) {
            _context21.next = 7;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          _context21.next = 9;
          return db.collection('playlists').deleteMany({
            createdBy: new ObjectId(userId)
          });
        case 9:
          _context21.next = 11;
          return db.collection('users').deleteOne({
            _id: new ObjectId(userId)
          });
        case 11:
          res.json({
            message: 'User and all associated playlists deleted successfully'
          });
          _context21.next = 18;
          break;
        case 14:
          _context21.prev = 14;
          _context21.t0 = _context21["catch"](1);
          console.error('Error deleting user and playlists:', _context21.t0);
          res.status(500).json({
            message: 'Error deleting user and playlists'
          });
        case 18:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[1, 14]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
app.post('/api/friend/:userId', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var userId, currentUserId, updatedUser;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          userId = req.params.userId;
          currentUserId = req.body.currentUserId;
          _context22.prev = 2;
          _context22.next = 5;
          return db.collection('users').updateOne({
            _id: new ObjectId(currentUserId)
          }, {
            $addToSet: {
              following: userId
            }
          } // Add userId to the current user's following list
          );
        case 5:
          _context22.next = 7;
          return db.collection('users').updateOne({
            _id: new ObjectId(userId)
          }, {
            $addToSet: {
              followers: currentUserId
            }
          } // Add currentUserId to the target user's followers list
          );
        case 7:
          _context22.next = 9;
          return db.collection('users').findOne({
            _id: new ObjectId(currentUserId)
          });
        case 9:
          updatedUser = _context22.sent;
          res.status(200).json(updatedUser);
          _context22.next = 17;
          break;
        case 13:
          _context22.prev = 13;
          _context22.t0 = _context22["catch"](2);
          console.error('Error adding friend:', _context22.t0);
          res.status(500).json({
            message: 'Error adding friend'
          });
        case 17:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[2, 13]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
app.post('/api/unfriend/:userId', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var userId, currentUserId, updatedUser;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          userId = req.params.userId;
          currentUserId = req.body.currentUserId;
          _context23.prev = 2;
          _context23.next = 5;
          return db.collection('users').updateOne({
            _id: new ObjectId(currentUserId)
          }, {
            $pull: {
              following: userId
            }
          } // Remove userId from following
          );
        case 5:
          _context23.next = 7;
          return db.collection('users').updateOne({
            _id: new ObjectId(userId)
          }, {
            $pull: {
              followers: currentUserId
            }
          } // Remove currentUserId from followers
          );
        case 7:
          _context23.next = 9;
          return db.collection('users').findOne({
            _id: new ObjectId(currentUserId)
          });
        case 9:
          updatedUser = _context23.sent;
          res.status(200).json(updatedUser);
          _context23.next = 17;
          break;
        case 13:
          _context23.prev = 13;
          _context23.t0 = _context23["catch"](2);
          console.error('Error removing friend:', _context23.t0);
          res.status(500).json({
            message: 'Error removing friend'
          });
        case 17:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[2, 13]]);
  }));
  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());
app.put('/api/playlists/:id/add-song', /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var id, songId, playlist;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          id = req.params.id;
          songId = req.body.songId;
          if (ObjectId.isValid(id)) {
            _context24.next = 4;
            break;
          }
          return _context24.abrupt("return", res.status(400).json({
            message: 'Invalid ID format'
          }));
        case 4:
          _context24.prev = 4;
          _context24.next = 7;
          return db.collection('playlists').findOneAndUpdate({
            _id: new ObjectId(id)
          }, {
            $addToSet: {
              songs: new ObjectId(songId)
            }
          },
          // Add song only if it's not already in the list
          {
            returnOriginal: false
          });
        case 7:
          playlist = _context24.sent;
          if (playlist.value) {
            _context24.next = 10;
            break;
          }
          return _context24.abrupt("return", res.status(200).json({
            message: 'Playlist not found'
          }));
        case 10:
          res.json(playlist.value);
          _context24.next = 17;
          break;
        case 13:
          _context24.prev = 13;
          _context24.t0 = _context24["catch"](4);
          console.error('Error adding song to playlist:', _context24.t0);
          res.status(500).json({
            message: 'Error adding song to playlist'
          });
        case 17:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[4, 13]]);
  }));
  return function (_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}());

// Remove a song from the playlist
app.put('/api/playlists/:id/remove-song', /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var id, songId, playlist;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          id = req.params.id;
          songId = req.body.songId;
          if (ObjectId.isValid(id)) {
            _context25.next = 4;
            break;
          }
          return _context25.abrupt("return", res.status(400).json({
            message: 'Invalid ID format'
          }));
        case 4:
          _context25.prev = 4;
          _context25.next = 7;
          return db.collection('playlists').findOneAndUpdate({
            _id: new ObjectId(id)
          }, {
            $pull: {
              songs: new ObjectId(songId)
            }
          }, {
            returnOriginal: false
          });
        case 7:
          playlist = _context25.sent;
          if (playlist.value) {
            _context25.next = 10;
            break;
          }
          return _context25.abrupt("return", res.status(200).json({
            message: 'Playlist not found'
          }));
        case 10:
          res.json(playlist.value);
          _context25.next = 17;
          break;
        case 13:
          _context25.prev = 13;
          _context25.t0 = _context25["catch"](4);
          console.error('Error removing song from playlist:', _context25.t0);
          res.status(500).json({
            message: 'Error removing song from playlist'
          });
        case 17:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[4, 13]]);
  }));
  return function (_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}());
app.get('/api/playlists/:id/comments', /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
    var id, playlist, comments;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          id = req.params.id;
          if (ObjectId.isValid(id)) {
            _context26.next = 3;
            break;
          }
          return _context26.abrupt("return", res.status(400).json({
            message: 'Invalid ID format'
          }));
        case 3:
          _context26.prev = 3;
          _context26.next = 6;
          return db.collection('playlists').findOne({
            _id: new ObjectId(id)
          });
        case 6:
          playlist = _context26.sent;
          if (playlist) {
            _context26.next = 9;
            break;
          }
          return _context26.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 9:
          _context26.next = 11;
          return db.collection('comments').find({
            _id: {
              $in: playlist.comments
            }
          }).toArray();
        case 11:
          comments = _context26.sent;
          res.json(comments);
          _context26.next = 19;
          break;
        case 15:
          _context26.prev = 15;
          _context26.t0 = _context26["catch"](3);
          console.error('Error fetching comments:', _context26.t0);
          res.status(500).json({
            message: 'Error fetching comments'
          });
        case 19:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[3, 15]]);
  }));
  return function (_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}());
app.post('/api/playlists/:playlistId/comments', /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var playlistId, _req$body7, userId, text, comment, result;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          playlistId = req.params.playlistId;
          _req$body7 = req.body, userId = _req$body7.userId, text = _req$body7.text;
          _context27.prev = 2;
          comment = {
            user: new ObjectId(userId),
            text: text,
            date: new Date(),
            likes: 0,
            // Initialize likes
            dislikes: 0 // Initialize dislikes
          };
          _context27.next = 6;
          return db.collection('comments').insertOne(comment);
        case 6:
          result = _context27.sent;
          _context27.next = 9;
          return db.collection('playlists').updateOne({
            _id: new ObjectId(playlistId)
          }, {
            $push: {
              comments: result.insertedId
            }
          });
        case 9:
          res.status(201).json(comment);
          _context27.next = 16;
          break;
        case 12:
          _context27.prev = 12;
          _context27.t0 = _context27["catch"](2);
          console.error('Error adding comment:', _context27.t0);
          res.status(500).json({
            message: 'Error adding comment'
          });
        case 16:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[2, 12]]);
  }));
  return function (_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}());
app.get('/api/comments/:id', /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var id, comment;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          id = req.params.id;
          if (ObjectId.isValid(id)) {
            _context28.next = 3;
            break;
          }
          return _context28.abrupt("return", res.status(400).json({
            message: 'Invalid ID format'
          }));
        case 3:
          _context28.prev = 3;
          _context28.next = 6;
          return db.collection('comments').findOne({
            _id: new ObjectId(id)
          });
        case 6:
          comment = _context28.sent;
          if (comment) {
            _context28.next = 9;
            break;
          }
          return _context28.abrupt("return", res.status(404).json({
            message: 'Comment not found'
          }));
        case 9:
          res.status(200).json(comment);
          _context28.next = 16;
          break;
        case 12:
          _context28.prev = 12;
          _context28.t0 = _context28["catch"](3);
          console.error('Error fetching comment:', _context28.t0);
          res.status(500).json({
            message: 'Error fetching comment'
          });
        case 16:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[3, 12]]);
  }));
  return function (_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}());
app.get('/api/users/:userId/playlists', /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var userId, user, playlists;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          userId = req.params.userId;
          _context29.prev = 1;
          _context29.next = 4;
          return db.collection('users').findOne({
            _id: new ObjectId(userId)
          });
        case 4:
          user = _context29.sent;
          if (user) {
            _context29.next = 7;
            break;
          }
          return _context29.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          _context29.next = 9;
          return db.collection('playlists').find({
            _id: {
              $in: user.playlists
            }
          }).toArray();
        case 9:
          playlists = _context29.sent;
          res.json(playlists);
          _context29.next = 17;
          break;
        case 13:
          _context29.prev = 13;
          _context29.t0 = _context29["catch"](1);
          console.error("Error fetching user's playlists:", _context29.t0);
          res.status(500).json({
            message: 'Error fetching playlists'
          });
        case 17:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[1, 13]]);
  }));
  return function (_x57, _x58) {
    return _ref29.apply(this, arguments);
  };
}());
app.use(express["static"](path.join(__dirname, '..', '..', '/frontend/dist')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});