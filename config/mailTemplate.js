const mailTemplate = (data) => {
  //   return `<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Email-PCMall</title>
  //       <styl>
  //           * {
  //               margin: 0;
  //               padding: 0;
  //               box-sizing: border-box;
  //           }

  //           .mainHead {
  //               text-align: center;
  //               background-color: red;
  //               padding: 18px;
  //               color: white;
  //           }

  //           #Btn {

  //           }

  //           .mainPara {
  //               display: flex;
  //               justify-content: center;
  //               align-items: center;
  //               flex-direction: column;
  //               gap: 15px;
  //           }

  //           .flex {
  //               display: flex;
  //               justify-content: center;
  //               align-items: center;
  //               flex-direction: column;
  //               flex-wrap: wrap;
  //               gap: 10px;
  //           }
  //       </style>
  //   </head>

  //   <body style="width:100vw;">
  //       <div class="flex">
  //           <div class="mainHead">
  //               <h2>PCMall</h2>
  //           </div>
  //           <h3 style="margin: 20px; text-align: left;">
  //               Hello Robin Sabhaya,
  //           </h3>
  //           <div class="mainPara">
  //               <h3 style="font-size: 30px;">
  //                   Welcome to PCMall
  //               </h3>
  //               <p>
  //                   You're all set.Now you can shopping product and accessories for daily uses.
  //               </p>
  //               <button id="Btn">
  //                   <a href="https://pcmall.onrender.com/login" style="text-decoration: none; color: white;">LOGIN</a>
  //               </button>
  //           </div>
  //           <hr style="margin-top: 20px; margin-bottom: 20px; color: red;">
  //           <div class="flex">
  //               <h5 style="font-size: 25px;margin-bottom: 10px;">
  //                   Your new account
  //               </h5>
  //               <p style="font-size: 15px;">
  //                   Email: robinjsabhaya12@gmail.com
  //               </p>
  //               <p style="font-size: 15px;">
  //                   Login: <a href="https://pcmall.onrender.com/login"
  //                       style="color: red;">https://pcmall.onrender.com/login</a>
  //               </p>
  //           </div>
  //           <div class="flex" style="margin: 22px;">
  //               <h3 style="font-size: 30px;margin-bottom: 10px;">
  //                   We're here to help! </h3>
  //               <p style="font-size: 16px;width: 500px; text-align: center;">
  //                   To talk with one of our email marketing experts, call +91123456789 or email us at <a
  //                       href="pcmallinfo@gmail.com" style="color: red;">pcmallinfo@gmail.com</a>
  //               </p>
  //           </div>
  //           <div class="flex mainHead" style="margin-top: 20px;flex-direction: row;color: white; font-size: 15px;">
  // <div>
  //     <a href="https://pcmall.onrender.com/termcondition" style="text-decoration:underline;
  //     color: white;">TERMCONDITION</a>
  // </div>
  // <div>
  //     <a href="https://pcmall.onrender.com/returnpolicy" style="text-decoration:underline;
  //     color: white;">RETURNPOLICY</a>
  // </div>
  // <div>
  //     <a href="https://pcmall.onrender.com/supportpolicy" style="text-decoration:underline;
  //     color: white;">SUPPORTPOLICY</a>
  // </div>
  // <div>
  //     <a href="https://pcmall.onrender.com/privacypolicy" style="text-decoration:underline;
  //     color: white;">PRIVACYPOLICY</a>
  // </div>
  //           </div>
  //           <div>
  //             All Rights are reserved by <a href="https://pcmall.onrender.com">PCMall</a>
  //         </div>
  //       </div>
  //   </body>

  //   </html>`;

  return `
  <body> 
      <table align="center" border="0" cellpadding="0" cellspacing="0"
          width="600" bgcolor="white" style="border:1px solid red"> 
          <tbody> 
              <tr> 
                  <td align="center"> 
                      <table align="center" border="0" cellpadding="0"
                          cellspacing="0" class="col-550" width="550"> 
                          <tbody> 
                              <tr> 
                                  <td align="center" style="background-color: red; 
                                          height: 50px;color:white"> 
                                      <a href="#" style="text-decoration: none;"> 
                                          <p style="color:white; 
                                                  font-weight:bold; font-size:30px;"> 
                                              PCMall
                                          </p> 
                                      </a> 
                                  </td> 
                              </tr> 
                          </tbody> 
                      </table> 
                  </td> 
              </tr> 
              <tr style="height: 200px;"> 
                  <td align="center" style="border: none; 
                          border-bottom: 2px solid red; 
                          padding-right: 20px;padding-left:20px"> 
                      <p style="font-weight: bolder;font-size: 22px; 
                              letter-spacing: 0.025em; 
                              color:black;"> 
                          Hello ${data.name}
                          </p>
                          <br>
                          <p style="font-size:30px;">Welcome to PCMall</p> 
                          <p style="font-size:22px;">You're all set.Now you can shopping product and accessories for daily uses.
                          </p>
                          <br>
                          <p style="              background-color: red;
                          color: white;
                          font-size: 15px;
                          padding: 10px;
                          border: 2px solid white;
                          border-radius: 10px;
                          height: fit-content;
                          width: 150px;">
                           <a href="https://pcmall.onrender.com/login" style="text-decoration: none; color: white;">LOGIN</a>
                          </p>
                  </td> 
              </tr> 
              <tr style="height: 200px;"> 
                  <td align="center" style="border: none; 
                          padding-right: 20px;padding-left:20px"> 
                      <p style="font-weight: bolder;font-size: 42px; 
                              letter-spacing: 0.025em; 
                              color:black;"> 
                              Your new account
                          <br/> 
                          <p style="font-size: 20px;">
                   Email: <a href="${data.email}" style="color: red">${data.email}</a> </p>              
                   <p style="font-size: 20px;">Login: <a href="https://pcmall.onrender.com/login"                      style="color: red;">https://pcmall.onrender.com/login</a>              </p>
                      </p> 
                  </td> 
              </tr> 
              <tr style="height: 100px;"> 
                  <td align="center" style="border: none; 
                          padding-right: 20px;padding-left:20px"> 
                      <p style="font-weight: bolder;font-size: 42px; 
                              letter-spacing: 0.025em; 
                              color:black;"> 
                              We're here to help!
                          <br>              
                          <p style="font-size:20px">
                          To talk with one of our email marketing experts, call +91123456789 or email us at <a href="pcmallinfo@gmail.com" style="color: red;">pcmallinfo@gmail.com</a>
                          </p>
                  </td> 
              </tr> 
              <tr> 
                  <td align="center"> 
                      <table align="center" border="0" cellpadding="0"
                          cellspacing="0" class="col-550" width="550"> 
                          <tbody style="background-color:whitesmoke;height:50px"> 
                              <tr> 
                              <td>
                              <a href="https://pcmall.onrender.com/termcondition" style="text-decoration:underline;
                              color: black;font-size:17px;padding:5px;">TERMCONDITION</a>
                          </td>
                          <td>
                              <a href="https://pcmall.onrender.com/returnpolicy" style="text-decoration:underline;
                              color: black;font-size:17px;padding:5px;">RETURNPOLICY</a>
                          </td>
                          <td>
                              <a href="https://pcmall.onrender.com/supportpolicy" style="text-decoration:underline;
                              color: black;font-size:17px;padding:5px;">SUPPORTPOLICY</a>
                          </td>
                          <td>
                              <a href="https://pcmall.onrender.com/privacypolicy" style="text-decoration:underline;
                              color: black;font-size:17px;padding:5px;">PRIVACYPOLICY</a>
                          </td> 
                              </tr>
                          </tbody> 
                      </table> 
                  </td> 
              </tr> 
              <br />
              <div style="color:white; font-size:16px;text-align:center;background-color:red;height:30px">
              All rights are reserved by &copy; <a href="https://pcmall.onrender.com/" style="color:white;text-decoration:underline;">PCMall</a>
              </div>  
              </tbody>
              </table>
              </body> 
  `;
};

module.exports = mailTemplate;
