const BASE_URL = process.env.BASE_URL;
const BASE_MAIL = process.env.BASE_MAIL;
const forget_password_mail = (data) => {
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
                             <a href="${data.reset_link}" style="text-decoration: none; color: white;">RESET PASSWORD</a>
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
                            To talk with one of our email marketing experts, call +91123456789 or email us at <a href="${BASE_MAIL}" style="color: red;">${BASE_MAIL}</a>
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
                                <a href="${BASE_URL}/termcondition" style="text-decoration:underline;
                                color: black;font-size:17px;padding:5px;">TERMCONDITION</a>
                            </td>
                            <td>
                                <a href="${BASE_URL}/returnpolicy" style="text-decoration:underline;
                                color: black;font-size:17px;padding:5px;">RETURNPOLICY</a>
                            </td>
                            <td>
                                <a href="${BASE_URL}/supportpolicy" style="text-decoration:underline;
                                color: black;font-size:17px;padding:5px;">SUPPORTPOLICY</a>
                            </td>
                            <td>
                                <a href="${BASE_URL}/privacypolicy" style="text-decoration:underline;
                                color: black;font-size:17px;padding:5px;">PRIVACYPOLICY</a>
                            </td> 
                                </tr>
                            </tbody> 
                        </table> 
                    </td> 
                </tr> 
                <br />
                <div style="color:white; font-size:16px;text-align:center;background-color:red;height:30px">
                All rights are reserved by &copy; <a href="${BASE_URL}" style="color:white;text-decoration:underline;">PCMall</a>
                </div>  
                </tbody>
                </table>
                </body> 
    `;
};

module.exports = forget_password_mail;
