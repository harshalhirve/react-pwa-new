import React from "react";

const ErrorMsg = ({ errorMsg }) => (
  <tr>
    <td colSpan="2">
      <table border="0" align="center" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td className="errMsg">{errorMsg}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

export default ErrorMsg;
