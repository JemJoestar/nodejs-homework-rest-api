const nodemailer = require("nodemailer");

exports.sendVerificationMail = async (email, verifyToken) => {
  const html = `<h1>Verification</h1>
    <p>Your verefication link: /users/verify/${verifyToken}</p>`;
    console.log(`process.env.META_PASS:`, process.env.META_PASS)
    console.log(`process.env.META_MAIL:`, process.env.META_MAIL)
    console.log(html)
  const transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: process.env.META_MAIL,
      pass: process.env.META_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: `Jemil<${process.env.META_MAIL}>`,
    to: email,
    subject: "Mail verification",
    html,
  });

  console.log(info)
};

// const sendMail = async (toMail) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.META_MAIL,
//       pass: process.env.META_PASS,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `Jemil<${process.env.META_MAIL}>`,
//     to: toMail,
//     subject: "hello nah",
//     html,
//   });
//   console.log(info.messageId);
// };

// sendMail("jemapro2@gmail.com").catch((e) => console.log(e));
